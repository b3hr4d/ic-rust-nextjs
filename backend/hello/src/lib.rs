#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

// Always include this at the end of your file
ic_cdk::export_candid!();
