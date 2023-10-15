# InternetComputer - Rust + Next.js Template

This is a template for creating a Next.js app with a Rust backend that can be deployed to the Internet Computer.

## Getting Started

1. Install the [DFINITY Canister SDK](https://sdk.dfinity.org/docs/quickstart/local-quickstart.html)
2. Install [Node.js](https://nodejs.org/en/download/)
3. Install [Rust](https://www.rust-lang.org/tools/install)

## Running Locally

1. Run `yarn dfx:start` in one terminal
2. Run `yarn deploy` in another terminal
3. Run `yarn dev` in another terminal
4. Open http://localhost:3000 in your browser

## Deploying to the Internet Computer

1. Run `yarn deploy:ic` to deploy the canisters to the Internet Computer

## Notes

- The Rust code is located in the `backend` directory
- The Next.js code is located in the `src` directory
- The canister configuration is located in the `dfx.json` file

## Resources

- [DFINITY Canister SDK](https://sdk.dfinity.org/docs/quickstart/local-quickstart.html)
- [Rust](https://www.rust-lang.org/)
