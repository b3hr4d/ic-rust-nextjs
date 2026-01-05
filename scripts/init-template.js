#!/usr/bin/env node

/**
 * IC Rust + Next.js Template Initialization Script
 *
 * This script helps users customize the template after cloning.
 * Run with: node scripts/init-template.js
 *
 * Features:
 * - Renames project in package.json
 * - Updates dfx.json with new canister name
 * - Updates Cargo.toml files
 * - Cleans up git history (optional)
 */

const fs = require("fs")
const path = require("path")
const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = prompt => new Promise(resolve => rl.question(prompt, resolve))

const ROOT_DIR = path.join(__dirname, "..")

async function main() {
  console.log("\n🚀 IC Rust + Next.js Template Initializer\n")
  console.log(
    "This script will help you customize the template for your project.\n"
  )

  // Get project name
  const projectName = await question("📝 Project name (e.g., my-icp-app): ")
  if (!projectName || !/^[a-z][a-z0-9-_]*$/i.test(projectName)) {
    console.error(
      "❌ Invalid project name. Use lowercase letters, numbers, hyphens, and underscores."
    )
    process.exit(1)
  }

  // Get canister name
  const canisterName =
    (await question(
      `📦 Canister name (default: ${projectName.replace(/-/g, "_")}): `
    )) || projectName.replace(/-/g, "_")
  const canisterNameSafe = canisterName.replace(/-/g, "_")

  // Get author info
  const authorName = (await question("👤 Author name (optional): ")) || ""
  const authorEmail = (await question("📧 Author email (optional): ")) || ""
  const author =
    authorName && authorEmail
      ? `${authorName} <${authorEmail}>`
      : authorName || ""

  // Get description
  const description =
    (await question("📄 Project description (optional): ")) ||
    `${projectName} - Internet Computer dApp`

  console.log("\n📋 Summary:")
  console.log(`   Project: ${projectName}`)
  console.log(`   Canister: ${canisterNameSafe}`)
  if (author) console.log(`   Author: ${author}`)
  console.log(`   Description: ${description}`)

  const confirm = await question("\n✅ Proceed with these settings? (y/n): ")
  if (confirm.toLowerCase() !== "y") {
    console.log("❌ Cancelled.")
    process.exit(0)
  }

  console.log("\n🔧 Updating files...\n")

  // Update package.json
  try {
    const packageJsonPath = path.join(ROOT_DIR, "package.json")
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"))

    packageJson.name = projectName
    packageJson.description = description
    if (author) packageJson.author = author

    // Remove template-specific fields if needed
    delete packageJson.repository
    delete packageJson.bugs
    delete packageJson.homepage

    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + "\n"
    )
    console.log("   ✅ Updated package.json")
  } catch (error) {
    console.error("   ❌ Failed to update package.json:", error.message)
  }

  // Update dfx.json
  try {
    const dfxJsonPath = path.join(ROOT_DIR, "dfx.json")
    let dfxContent = fs.readFileSync(dfxJsonPath, "utf-8")

    // Replace canister name
    dfxContent = dfxContent.replace(/"hello"/g, `"${canisterNameSafe}"`)
    dfxContent = dfxContent.replace(
      /backend\/hello/g,
      `backend/${canisterNameSafe}`
    )

    fs.writeFileSync(dfxJsonPath, dfxContent)
    console.log("   ✅ Updated dfx.json")
  } catch (error) {
    console.error("   ❌ Failed to update dfx.json:", error.message)
  }

  // Rename backend folder and update Cargo.toml
  try {
    const oldBackendPath = path.join(ROOT_DIR, "backend", "hello")
    const newBackendPath = path.join(ROOT_DIR, "backend", canisterNameSafe)

    if (fs.existsSync(oldBackendPath) && canisterNameSafe !== "hello") {
      fs.renameSync(oldBackendPath, newBackendPath)
      console.log(`   ✅ Renamed backend/hello to backend/${canisterNameSafe}`)
    }

    // Update Cargo.toml in backend
    const cargoPath = path.join(
      ROOT_DIR,
      "backend",
      canisterNameSafe,
      "Cargo.toml"
    )
    if (fs.existsSync(cargoPath)) {
      let cargoContent = fs.readFileSync(cargoPath, "utf-8")
      cargoContent = cargoContent.replace(
        /name = "hello"/,
        `name = "${canisterNameSafe}"`
      )
      fs.writeFileSync(cargoPath, cargoContent)
      console.log("   ✅ Updated backend Cargo.toml")
    }
  } catch (error) {
    console.error("   ❌ Failed to rename backend:", error.message)
  }

  // Update root Cargo.toml
  try {
    const rootCargoPath = path.join(ROOT_DIR, "Cargo.toml")
    if (fs.existsSync(rootCargoPath)) {
      let cargoContent = fs.readFileSync(rootCargoPath, "utf-8")
      cargoContent = cargoContent.replace(
        /backend\/hello/g,
        `backend/${canisterNameSafe}`
      )
      fs.writeFileSync(rootCargoPath, cargoContent)
      console.log("   ✅ Updated root Cargo.toml")
    }
  } catch (error) {
    console.error("   ❌ Failed to update root Cargo.toml:", error.message)
  }

  // Update reactor.ts
  try {
    const reactorPath = path.join(ROOT_DIR, "src", "lib", "reactor.ts")
    if (fs.existsSync(reactorPath)) {
      let content = fs.readFileSync(reactorPath, "utf-8")
      content = content.replace(/helloReactor/g, `${canisterNameSafe}Reactor`)
      content = content.replace(/hello"/g, `${canisterNameSafe}"`)
      content = content.replace(
        /declarations\/hello/g,
        `declarations/${canisterNameSafe}`
      )
      fs.writeFileSync(reactorPath, content)
      console.log("   ✅ Updated src/lib/reactor.ts")
    }
  } catch (error) {
    console.error("   ❌ Failed to update reactor.ts:", error.message)
  }

  // Update hooks.ts
  try {
    const hooksPath = path.join(ROOT_DIR, "src", "lib", "hooks.ts")
    if (fs.existsSync(hooksPath)) {
      let content = fs.readFileSync(hooksPath, "utf-8")
      content = content.replace(/helloReactor/g, `${canisterNameSafe}Reactor`)
      fs.writeFileSync(hooksPath, content)
      console.log("   ✅ Updated src/lib/hooks.ts")
    }
  } catch (error) {
    console.error("   ❌ Failed to update hooks.ts:", error.message)
  }

  // Rename declarations folder
  try {
    const oldDeclPath = path.join(ROOT_DIR, "src", "declarations", "hello")
    const newDeclPath = path.join(
      ROOT_DIR,
      "src",
      "declarations",
      canisterNameSafe
    )

    if (fs.existsSync(oldDeclPath) && canisterNameSafe !== "hello") {
      if (fs.existsSync(newDeclPath)) {
        fs.rmSync(newDeclPath, { recursive: true })
      }
      fs.renameSync(oldDeclPath, newDeclPath)
      console.log(
        `   ✅ Renamed declarations/hello to declarations/${canisterNameSafe}`
      )
    }
  } catch (error) {
    console.error("   ❌ Failed to rename declarations:", error.message)
  }

  console.log("\n🎉 Template initialized successfully!\n")
  console.log("Next steps:")
  console.log(`   1. Run: npm run dfx:start`)
  console.log(`   2. Run: dfx deploy`)
  console.log(`   3. Run: npm run dev`)
  console.log(`   4. Open: http://localhost:3000\n`)

  rl.close()
}

main().catch(error => {
  console.error("Error:", error)
  rl.close()
  process.exit(1)
})
