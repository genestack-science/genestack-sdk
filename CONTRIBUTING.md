# GENESTACK SDK Contributing Guidelines

## 1. Welcome to the Project!

Thank you for contributing to the GENESTACK SDK! This document provides guidelines to help you contribute effectively to our functional genomics and biological signal processing platform.

We welcome pull requests, bug fixes, features, optimizations, and scientific updates to our existing mapping models and pathway definitions.

---

## 2. Our Development Principles

When contributing code, please follow these core development principles:

1. **Deterministic Biometrics**: Use precise, biological terminology in your code and documentation. Avoid clinical diagnostics or alarming language.
2. **Strict Type Safety**: All source code must be written in TypeScript with complete types. Avoid using the `any` type whenever possible.
3. **Optimized Execution**: Biometric streams and raw genomic file parsing must be optimized to prevent memory leaks or high CPU usage.
4. **Privacy-First (HIPAA)**: Ensure that no personally identifiable data leaks into the processing layers or console logs.
5. **Evidence-Based Logic**: Any modification to biomarker thresholds or pathway mapping must be backed by a cited peer-reviewed research paper.

---

## 3. Scientific Pathway Contributions

We actively encourage the scientific community to contribute new biological pathway models. When adding a new pathway (e.g., PER3, TNF, etc.), please ensure:
- The `src/core/mapper.ts` logic reflects the established biological research.
- Threshold definitions are configurable via the `src/types/signals.ts` module.
- You provide a brief summary of the scientific rationale in the Pull Request description.

---

## 3. Getting Started with Local Development

Ensure you have Node.js 18.x or above installed.

```bash
# Clone the repository
git clone https://github.com/genestack-science/genestack-sdk.git
cd genestack-sdk

# Install dependencies
npm install

# Run all test suites locally
npm test
```

### Git Branching Conventions
We use the following naming conventions for our git feature branches:
- **`feature/`**: Adding new modules or major updates to existing engines.
- **`bugfix/`**: Correcting errors or unexpected processing bugs.
- **`docs/`**: Modifying or expanding the repository's documentation files.
- **`refactor/`**: Improving code quality without modifying behavior.

---

## 4. Coding Standards

To ensure high maintainability and prevent common type errors, please adhere to these coding standards.

### 4.1 Strict Linting and Formatting
- Always format files using the configured Prettier rule set (`npm run format`) before making a pull request.
- Run the ESLint engine via `npm run lint` to catch unused variables or unhandled imports.

### 4.2 TSDoc Annotations
- All exported functions, methods, and types must include comprehensive TSDoc comments explaining their parameters, returns, and expected edge case behavior.

---

## 5. Submitting a Pull Request

Please follow the checklist below to submit your pull request:

1. Create a new branch matching our git conventions (`git checkout -b feature/dynamic-threshold-engine`).
2. Implement your changes following our coding standards.
3. Add tests to fully verify your changes.
4. Ensure all tests pass (`npm test`) and that the project builds cleanly (`npm run build`).
5. Run the code formatters (`npm run format`).
6. Commit your changes using descriptive commit messages and push to the remote repository.
7. Open a Pull Request on GitHub against our `main` branch.
