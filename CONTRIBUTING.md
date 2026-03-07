# Contributing Guidelines

Thank you for your interest in contributing to the Password Strength Score Generator! This document outlines guidelines for contributing to the project.

## Getting Started

### Prerequisites

- Git installed on your system
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A code editor (VS Code recommended)
- Basic knowledge of HTML, CSS, and JavaScript

### Setting Up Development Environment

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/password-score-generator.git
   cd password-score-generator
   ```

2. **Create a new branch for your feature**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and test thoroughly

4. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** describing your changes

---

## Code Style Guidelines

### JavaScript

- **Naming Convention**: Use camelCase for variables and functions
  ```javascript
  // Good
  const passwordInput = document.getElementById('passwordInput');
  function validatePassword(password) { }
  
  // Avoid
  const PasswordInput = document.getElementById('passwordInput');
  const password_input = document.getElementById('passwordInput');
  ```

- **Comments**: Use clear, descriptive comments
  ```javascript
  // Good: Specific and informative
  // Calculate entropy score using zxcvbn algorithm
  const entropyScore = calculateEntropy(password);
  
  // Avoid: Generic or unclear
  // Score calculation
  const score = calculateScore();
  ```

- **Function Documentation**: Use JSDoc format
  ```javascript
  /**
   * Validates password strength against security criteria
   * @param {string} password - The password to validate
   * @returns {boolean} True if password meets minimum requirements
   */
  function validatePassword(password) {
      // Implementation
  }
  ```

- **Indentation**: Use 4 spaces (no tabs)

- **Semicolons**: Always use semicolons at end of statements

- **Const over Let**: Prefer `const` for variables that don't change

- **Error Handling**: Always use try-catch for error-prone operations
  ```javascript
  try {
      const result = zxcvbn(password);
      // Process result
  } catch (error) {
      console.error('Error analyzing password:', error);
      handleError(error);
  }
  ```

### CSS

- **Naming Convention**: Use kebab-case for class names
  ```css
  /* Good */
  .password-input-wrapper { }
  .strength-meter { }
  
  /* Avoid */
  .passwordInputWrapper { }
  .StrengthMeter { }
  ```

- **Organization**: Group related styles together
  ```css
  /* Button styles */
  .btn {
      padding: 10px 20px;
      border: none;
      cursor: pointer;
  }
  
  .btn-primary {
      background: var(--primary);
      color: white;
  }
  ```

- **CSS Variables**: Use existing variables from `:root`
  ```css
  /* Good */
  color: var(--text-main);
  background: var(--panel-bg);
  
  /* Avoid */
  color: #e0faff;
  background: rgba(10, 14, 25, 0.85);
  ```

### HTML

- **Semantic HTML**: Use semantic tags
  ```html
  <!-- Good -->
  <header class="header">...</header>
  <main class="content">...</main>
  <footer class="footer">...</footer>
  
  <!-- Avoid -->
  <div class="header">...</div>
  <div class="content">...</div>
  <div class="footer">...</div>
  ```

- **Accessibility**: Include proper ARIA attributes
  ```html
  <button aria-label="Show password" title="Toggle password visibility">
      <i class="fa-solid fa-eye"></i>
  </button>
  ```

- **Indentation**: Use 4 spaces

---

## Feature Development Workflow

### 1. Planning

- Discuss feature ideas in issues before starting development
- Get approval for significant changes
- Break large features into smaller tasks

### 2. Implementation

- Create a new branch: `git checkout -b feature/feature-name`
- Follow code style guidelines
- Write clear commit messages:
  ```
  feat: Add password strength history visualization
  - Display past 5 analyzed passwords
  - Add chart showing strength trends
  - Implement localStorage persistence
  ```

### 3. Testing

- Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- Test on different screen sizes (mobile, tablet, desktop)
- Verify accessibility with keyboard navigation
- Test error scenarios and edge cases

### 4. Documentation

- Update README.md if needed
- Update CHANGELOG.md with new features
- Add JSDoc comments to new functions
- Include code examples for complex features

---

## Bug Reporting

When reporting bugs, include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Step-by-step reproduction instructions
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Browser & OS**: Browser version and operating system
6. **Screenshots**: If applicable, include screenshots

**Example Bug Report:**
```
Title: Password visibility toggle not working on Safari

Description: The password visibility toggle button does not work on Safari 15.

Steps to Reproduce:
1. Open application in Safari 15
2. Enter a password
3. Click the eye icon to show password

Expected: Password becomes visible
Actual: Nothing happens, password stays hidden

Browser: Safari 15.6
OS: macOS 12.4
```

---

## Pull Request Process

1. **Create descriptive title and description**
   ```
   Title: Add copy feedback toast notification
   
   Description:
   - Implements toast notification when password is copied
   - Replaces alert dialog with subtle notification
   - Toast appears for 2 seconds and auto-dismisses
   - Includes animation effects
   ```

2. **Reference related issues**
   ```
   Fixes #123
   Related to #456
   ```

3. **Ensure all tests pass** (if applicable)

4. **Request review** from maintainers

5. **Address feedback** and make requested changes

6. **Once approved**, your PR will be merged

---

## Commit Message Standards

Follow these conventions for commit messages:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build, CI, or dependency updates

### Scope

- The part of the codebase affected (e.g., `password-input`, `suggestions`, `generator`)

### Subject

- Use imperative mood ("add" not "added")
- Do not capitalize first letter
- No period at the end
- Maximum 50 characters

### Body

- Explain *what* and *why*, not *how*
- Wrap at 72 characters
- Separate from subject with blank line

### Example

```
feat(suggestions): add XSS protection for user input

Sanitize all text before displaying in suggestions panel
to prevent potential XSS vulnerabilities. Implement
sanitizeText() utility function that escapes HTML
special characters.

Fixes #42
```

---

## Performance Considerations

- Minimize DOM manipulation - batch updates when possible
- Avoid inline styles - use CSS classes
- Debounce frequent events if needed
- Lazy load resources when appropriate
- Profile code for performance bottlenecks

---

## Accessibility Standards

- Ensure color contrast meets WCAG AA standards (4.5:1 for text)
- Provide keyboard navigation support
- Include proper ARIA labels and roles
- Test with screen readers
- Use semantic HTML elements
- Ensure touch targets are at least 44x44px

---

## Security Considerations

- Sanitize user input before display
- Avoid inline JavaScript (`onclick`, etc.)
- Never store passwords or sensitive data
- Use HTTPS for any remote communications
- Keep dependencies updated
- Avoid using `eval()` or `innerHTML` with user input

---

## Questions or Need Help?

- Check existing documentation
- Review past issues and pull requests
- Ask in comments on related issues
- Contact the development team

---

## Code of Conduct

We are committed to providing a welcoming and inspiring community. Please be respectful and constructive in all interactions.

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (Educational use).

---

Thank you for contributing! Your efforts help make this project better for everyone. 🎉

**Project ID: T214 | Group ID: A14**
