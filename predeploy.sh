#!/usr/bin/env bash
set -eu

backend_dir="./backend"
target_dir="./target/wasm32-unknown-unknown/release"

for app_root in "$backend_dir"/*; do
    package=$(basename "$app_root")
    did_file="$app_root/$package.did"

    echo "Building $package in $app_root"

    cargo build --manifest-path="$app_root/Cargo.toml" \
        --target wasm32-unknown-unknown \
        --release \
        --package "$package"

    echo "Generating Candid file for $package"

    candid-extractor "$target_dir/$package.wasm" 2>/dev/null > "$did_file"

    dfx generate "$package"

done
