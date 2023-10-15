#!/usr/bin/env bash
set -eu

if [[ -z "${1:-}" ]]; then
    echo "Usage: $0 <package>"
    exit 1
fi

package="$1"
app_root="./backend/$package"
did_file="$app_root/$package.did"
target_dir="./target/wasm32-unknown-unknown/release"

echo "Building $package in $app_root"

cargo build --manifest-path="$app_root/Cargo.toml" \
    --target wasm32-unknown-unknown \
    --release \
    --package "$package"

echo "Generating Candid file for $package"

candid-extractor "$target_dir/$package.wasm" 2>/dev/null > "$did_file"

echo "Building $package.wasm"

ic-wasm "$target_dir/$package.wasm" \
    -o "$target_dir/$package.wasm" \
    metadata candid:service -v public -f "$did_file"

echo "Optimizing $package.wasm"

ic-wasm "$target_dir/$package.wasm" \
    -o "$target_dir/$package-opt.wasm" \
    optimize O3

echo "Done building $package-opt.wasm"

dfx generate "$package"

echo "File and Size(KB)"
echo "$did_file: $(du -k "$did_file" | cut -f1) KB"
echo "$target_dir/$package.wasm: $(du -k "$target_dir/$package.wasm" | cut -f1) KB"
echo "$target_dir/$package-opt.wasm: $(du -k "$target_dir/$package-opt.wasm" | cut -f1) KB"
