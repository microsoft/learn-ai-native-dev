# Contributing to AI-Native Development Tutorial

Thank you for your interest in contributing! This project teaches AI-Native development techniques through an interactive web tutorial.

## Contributor License Agreement (CLA)

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit [https://cla.opensource.microsoft.com](https://cla.opensource.microsoft.com).

When you submit a pull request, a CLA bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Licensing of Contributions

By contributing, you agree that your contributions will be licensed under the project's dual-license model:

- **Code contributions** are licensed under the [MIT License](../LICENSE).
- **Documentation and tutorial content contributions** (including changes under `src/content/` and other Markdown content) are licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](../LICENSE-DOCS).

Please ensure that any source files you add include the standard Microsoft MIT header:

```
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
```

## Reporting Security Issues

Do **not** report security vulnerabilities through public GitHub issues. See [SECURITY.md](../SECURITY.md) for the proper disclosure process.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Start the dev server: `npm run dev`

## Development Workflow

1. Create a feature branch from `develop`
2. Make your changes
3. Test locally with `npm run build`
4. Submit a pull request

## Code Standards

- **TypeScript** - All new code should be written in TypeScript
- **React** - Follow existing component patterns
- **Tailwind CSS** - Use utility classes for styling
- **shadcn/ui** - Use existing UI components when available

## Content Updates

Tutorial content lives in `src/content/tutorial/`. Each part is a separate markdown file.

## AI Agent Guidelines

See [AGENTS.md](../AGENTS.md) for AI-specific instructions and context about this project.

## Questions?

Open an issue for questions or discussion.
