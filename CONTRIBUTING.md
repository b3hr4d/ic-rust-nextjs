# Contributing to IC Rust + Next.js Template

Thank you for your interest in contributing! This document provides guidelines for contributing to this template.

## 🚀 Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Start local development: `npm run dfx:start && dfx deploy && npm run dev`

## 📝 Contribution Guidelines

### Reporting Issues

- Check existing issues before creating a new one
- Use the issue templates when available
- Include reproduction steps for bugs

### Pull Requests

1. Create a feature branch from `main`
2. Make your changes
3. Test locally with `npm run build`
4. Submit a PR with a clear description

### Code Style

- Follow existing code patterns
- Use TypeScript for frontend code
- Use idiomatic Rust for backend code

## 🔗 Template Branches

Each branch serves a specific purpose:

| Branch          | Purpose                  |
| --------------- | ------------------------ |
| `main`          | Rust + Next.js (default) |
| `motoko`        | Motoko backend variant   |
| `motoko_todo`   | Motoko Todo app example  |
| `radix-ui`      | RadixUI integration      |
| `stable_memory` | Stable memory patterns   |

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.
