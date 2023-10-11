#!/usr/bin/env bash
set -e

package="$1"

app_root="./backend/$package"
did_file="$app_root/$package.did"

echo "Building $package in $app_root"

# This script generates the did file, build the project (passed as $1) and then run the ic-wasm to shrink and attach metadata.
cargo build --manifest-path="$app_root/Cargo.toml" \
    --target wasm32-unknown-unknown \
    --release \
    --package "$package"

echo "Generating $did_file"

candid-extractor "./target/wasm32-unknown-unknown/release/$package.wasm" 2>/dev/null > $did_file

echo "Building $package.wasm"

ic-wasm "./target/wasm32-unknown-unknown/release/$package.wasm" \
    -o "./target/wasm32-unknown-unknown/release/$package.wasm" \
    metadata candid:service -v public -f $did_file

echo "Optimizing $package.wasm"

ic-wasm "./target/wasm32-unknown-unknown/release/$package.wasm" \
    -o "./target/wasm32-unknown-unknown/release/$package-opt.wasm" \
    shrink

echo "Done building $package-opt.wasm"
