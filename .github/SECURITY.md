# Security Policy

## Reporting Security Issues

If you believe you have found a security vulnerability in this repository, please report it through coordinated disclosure.

**Please do not report security vulnerabilities through public GitHub issues, discussions, or pull requests.**

Instead, please send an email to the repository maintainers or use GitHub's private vulnerability reporting feature.

### Information to Include

Please include as much of the following information as possible:

- The type of issue (e.g., XSS, injection, or authentication bypass)
- Full paths of source file(s) related to the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

This information will help us triage your report more quickly.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Security Best Practices for Contributors

When contributing to this project:

1. **Never commit secrets** - API keys, tokens, or credentials should never be committed
2. **Validate inputs** - Always sanitize user inputs on both client and server
3. **Keep dependencies updated** - Regularly update npm packages to patch vulnerabilities
4. **Use HTTPS** - Ensure all external resources are loaded over HTTPS
5. **Content Security Policy** - Be mindful of CSP when adding external scripts or styles
