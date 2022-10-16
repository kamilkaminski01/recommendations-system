# Recommendations project

This project is aimed at organizations that can leverage it
for recruitment and advertisement. It allows the registered users, as well
as to invite potential customers and candidates for various rewards.

## Resources

User interface mocks are managed on
[Figma](https://www.figma.com/).

Issue tracking is currently handled by
[Jira](https://www.atlassian.com/pl/software/jira).

The code repository is hosted on
[GitHub](https://github.com/Dimateos12/Project-recommendations).

## Code quality standards

The `main` is the stable branch used for releases.

All features should be verified with automated unit tests, including
the expected "happy paths" as well as edge cases that might cause issues
or errors.

Git branches should be named according to the
[Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/) methodology.
Always include the IDs of the associated tasks in the branches and commit
names. For example:

```bash
# Branches:
feature/UR-42/add-candidate-model
fix/UR-52/missing-email-bug

# Commit names:
UR-42 | Add candidate model
```

### Backend

All backend code must be formatted and verified by the `black`, `flake8`,
`mypy` and `isort` tools. Their configurations can be found in the
[.pre-commit-config.yaml](.pre-commit-config.yaml) file.

Custom functions and methods should use **type hints** to improve IDE code
completions, prevent from type errors and extend code documentation.
