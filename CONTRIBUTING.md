# Contributing to Snake Game

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourname/snake-game.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the game.

### Code Style

We use Prettier and ESLint to maintain code quality:

```bash
npm run lint        # Check for linting errors
npm run format      # Format code with Prettier
```

Pre-commit hooks will automatically run these checks.

### Project Structure

- `app/components/` - React components
- `app/hooks/` - Custom React hooks
- `app/utils/` - Utility functions
- `app/constants/` - Constants and configurations
- `app/types.ts` - TypeScript type definitions

## Making Changes

1. Make your changes in your feature branch
2. Write clear, concise commit messages
3. Ensure your code follows the existing style
4. Update documentation if needed
5. Push to your fork
6. Create a Pull Request

## Pull Request Guidelines

- Provide a clear description of the changes
- Reference any related issues
- Ensure CI checks pass
- Request review from maintainers

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
-Follow the project's code of conduct

## Questions?

Feel free to open an issue for any questions or concerns!
