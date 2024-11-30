# Contribution Guidelines

Welcome to the project! Please follow these rules to ensure smooth collaboration.

## Styling

- Project should be writtern in CSS without tailwind.
- each component/page should have its css file that will be using classes and ID's in a way that other css files arent affected.
  for example: on log in page I will give id or class to parent element of jsx : "logInPage", then in css file i will use this prefix before using any other elemnet or class. so if i want to apply styles to some button for example I will write .logInPage button{styles...}
- in global css colors are defined inside root and dont change them without consulting with other contibutors.
  you can use those colors as variables. for example background-color: var(--text-color);
- Px usage is very little mostly for borders and border radius; other than that, use rems!
- One rem is 10px, do not change its value!
- paddings margins and other spacing related measures are already defined inside global.css root also and can be used as variables.
- font family will be roboto

## initial cloning

- to start working on project contributors must clone master branch( we dont use dev branch cause there is no reason for it, as we dont have current project deployed already.)

## Jira / Branching Strategy

- each contributor will have their tasks inside Jira
- they should assing themselves to their tasks
- depending on Jira task, you should create github branch named accordingly to jira task and then when done on working on that branch merge it with master

## Commit Messages

- Use descriptive commit messages:

  - ✅ `Add login feature`
  - ❌ `Fixed stuff`
    feat: A new feature for the user.
  - use relevant prefixes

    Example: feat(auth): add login functionality
    When to use: When you add a new feature, like a new page, new functionality, or an improvement.
    fix: A bug fix.

    Example: fix(auth): fix login issue with empty fields
    When to use: When you fix a bug or issue in the code.
    chore: Routine tasks or maintenance that doesn’t affect the functionality.

    Example: chore: update dependencies
    When to use: For tasks like updating libraries, changing configuration files, or minor internal code cleanups.
    docs: Documentation changes.

    Example: docs(readme): update setup instructions
    When to use: For changes to the documentation, like README files or comments.
    style: Code style changes (e.g., formatting, indentation) that do not affect functionality.

    Example: style(header): fix indentation
    When to use: For changes that don’t affect functionality but improve code style or readability.
    refactor: Refactoring existing code without changing its functionality.

    Example: refactor(auth): improve validation logic
    When to use: For code refactoring that improves the structure or performance of the code without changing its behavior.
    test: Adding or updating tests.

    Example: test(auth): add unit tests for login
    When to use: When you add or update tests, or modify test-related code.
    perf: Performance improvements.

    Example: perf(api): optimize query performance
    When to use: For changes that improve the performance of the application.
    build: Changes to the build system or external dependencies.

    Example: build: add webpack config for production
    When to use: For changes related to the build process, packaging, or deployment.
    ci: Continuous integration-related changes.

    Example: ci: update GitHub Actions workflow
    When to use: For changes that affect your CI/CD pipeline or automated build tools.
    breaking change: If a commit introduces a change that breaks backward compatibility.

    Example: feat(auth): remove support for old authentication methods (breaking change)
    When to use: If the commit introduces a breaking change that requires changes in the way users interact with your code or API.

## Pull Request Process

1. Create a pull request to the `master` branch.
2. make a review for pull request.
3. Request at least one team member for a code review.
4. Team reviews the PR and merges it into dev.
5. When the task is complete, close the Jira issue.

## Communication

- Use Teams for exta communication.
- Add detailed comments in your code if implementing complex logic.

Thank you for contributing!
