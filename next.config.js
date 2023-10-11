// load env from ../.env file
const envList = require("dotenv").config().parsed
// get version from package.json
const { version } = require("./package.json")

envList.NEXT_PUBLIC_IC_HOST =
  envList.DFX_NETWORK === "ic" ? "https://ic0.app" : "http://localhost:8080"

console.log("network", envList.DFX_NETWORK)

envList.NEXT_PUBLIC_VERSION = version

/** @type {import('next').NextConfig} */
module.exports = {
  env: envList,
  output: "export",
  staticPageGenerationTimeout: 10000
}
