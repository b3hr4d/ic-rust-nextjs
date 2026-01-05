# 📦 Template Repository Setup

This document explains how to configure this repository as a GitHub Template and how users can use it.

## 🔧 Enabling GitHub Template Feature

To enable the "Use this template" button on GitHub:

1. Go to your repository on GitHub
2. Click on **Settings** (gear icon)
3. Under **General**, scroll down to **Template repository**
4. Check the box **Template repository**

Now users will see a green **"Use this template"** button at the top of your repository.

## 🚀 How Users Can Use This Template

### Method 1: GitHub Template (Recommended)

1. Click the **"Use this template"** button
2. Choose **"Create a new repository"**
3. Name your repository and set visibility
4. Clone your new repository
5. Run `npm install` and `npm run template:init`

### Method 2: Using degit

```bash
npx degit b3hr4d/ic-rust-nextjs my-icp-app
cd my-icp-app
npm install
npm run template:init
```

### Method 3: Clone and Reset

```bash
git clone https://github.com/b3hr4d/ic-rust-nextjs.git my-icp-app
cd my-icp-app
rm -rf .git
git init
npm install
npm run template:init
```

## 🎨 Template Customization Script

The `npm run template:init` command runs an interactive script that:

- ✅ Renames the project in `package.json`
- ✅ Updates canister names in `dfx.json`
- ✅ Renames the backend directory
- ✅ Updates `Cargo.toml` files
- ✅ Updates the reactor and hooks files
- ✅ Renames the declarations directory

## 📂 Files Excluded from Template

The `.gitignore` excludes:

- `node_modules/` - Dependencies (installed via npm)
- `.dfx/` - Local DFX data
- `.next/` - Next.js build cache
- `target/` - Rust build artifacts
- `Cargo.lock` - Rust lockfile (regenerated)
- `.env.local` - Local environment variables

## 🔗 Branch Variants

Users can clone specific branches using degit:

```bash
# Motoko variant
npx degit b3hr4d/ic-rust-nextjs#motoko my-app

# RadixUI variant
npx degit b3hr4d/ic-rust-nextjs#radix-ui my-app

# Stable Memory variant
npx degit b3hr4d/ic-rust-nextjs#stable_memory my-app
```

## 📝 Maintaining the Template

When updating the template:

1. Keep the default project names as `ic-rust-nextjs` and `hello`
2. Update dependencies regularly
3. Test the template with `npm run template:init`
4. Keep documentation up to date

## 🏷️ Release Tags

Consider creating release tags for stable versions:

```bash
git tag -a v2.0.0 -m "Release v2.0.0 with IC Reactor v3"
git push origin v2.0.0
```

Users can then clone specific versions:

```bash
npx degit b3hr4d/ic-rust-nextjs#v2.0.0 my-app
```
