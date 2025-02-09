# Contributing Guidelines

When contributing to this repository, please first discuss the change you wish
to make via issue, email, or any other method with the owners of this repository
before making a change.

## Table of Contents

- [1. Pull Request Process](#1-pull-request-process)
- [2. Rules](#2-rules)
- [3. Writing a Commit Message](#3-writing-a-commit-message)
- [4. Bug Reports](#4-bug-reports)
- [5. Releases](#5-releases)
- [6. Any questions?](#6-any-questions)
- [7. Changes to this arrangement](#7-changes-to-this-arrangement)
- [8. Heritage](#8-heritage)

## 1. Pull Request Process

- Ensure any install or build dependencies are removed before the end of the
layer when doing a build.
- Update the documentation with details of changes to the interface.
- Do not change any version numbers, new releases will be managed by the owners
of the repository.
- Repository owners will have control over merging pull requests.

### 1.1. Reviewing pull requests

When reviewing a pull request, the end-goal is to suggest useful changes to
the author. Reviews should finish with approval unless there are issues that
would result in:

- Buggy behavior.
- Undue maintenance burden.
- Breaking with house coding style.
- Pessimization (i.e. reduction of speed).
- Feature reduction (i.e. it removes some aspect of functionality that a
significant minority of users rely on).
- Uselessness (i.e. it does not strictly add a feature or fix a known issue).

### 1.2. Reviews may not be used as an effective veto for a PR because

- There exists a somewhat cleaner/better/faster way of accomplishing the
same feature/fix.
- It does not fit well with some other contributors' longer-term vision
for the project.

## 2. Rules

There are a few basic ground-rules for contributors:

- __No `--force` pushes__ or modifying the Git history in any way.
- __Non-master branches__ ought to be used for ongoing work.
- __External API changes and significant modifications__ ought to be subject to
an __internal pull-request__ to solicit feedback from other contributors.
- Internal pull-requests to solicit feedback are _encouraged_ for any other
non-trivial contribution but left to the discretion of the contributor.
- Contributors should attempt to adhere to the prevailing code-style.

## 3. Writing a Commit Message

If this is your first time committing to a repo, you could look through this
neat tutorial: _["How to Write a Git Commit Message"](https://chris.beams.io/posts/git-commit/)_

Commit messages are most useful when formatted like so: `action_acronym([concept], [platform], [package]): title`.

### 3.1. Examples

- `fix(typo, documentation): fix misspelling in the introduction file`
- `docs(GDPR): add extra example for GDPR flow`
- `feat(video, functions): add support for videos`
- `feat(video, app): add support for videos`
- `tests(video, app): add extra tests for videos`
- `refactor(profile, app): clean JSX and logic of the screen`
- `opt(profile, app): reduce renders of the header component`
- `seo(keywords, website): replace SEO keywords`
- `seo(optimization, website): add nofollow URLs`
- `chore(home, android, app): update styles for Android`
- `security(expo server, functions): add extra security layer for push notifications`

## 4. Bug Reports

Bugs are a reality for any software project. We can't fix what we don't know
about!

If you believe a bug report presents a security risk, please follow
[responsible disclosure](https://en.wikipedia.org/wiki/Responsible_disclosure)
and report it directly to [victoriomolinabermejo@gmail.com](mailto:victoriomolinabermejo@gmail.com)
instead of filing public issue or posting it to a public forum.

Otherwise, please, first search between [existing issues in our repository](https://github.com/VictorioMolina/imugi/issues)
and if the issue is not reported yet, [file a new one](https://github.com/VictorioMolina/imugi/issues/new).

## 5. Releases

Declaring formal releases remains the prerogative of the project maintainer(s).

## 6. Any questions?

Do you need any environment variable? Do you have doubts about the code style?
Anything else?

- Please, contact the [author](mailto:victoriomolinabermejo@gmail.com) or any other
maintainer of the repo.

## 7. Changes to this arrangement

This is an experiment and feedback is welcome! This document may also be subject
to pull-requests or changes by contributors where you believe you have something
valuable to add or change.

## 8. Heritage

These contributing guidelines are modified from the "OPEN Open Source Project"
guidelines for the Level project:
<https://github.com/Level/community/blob/master/CONTRIBUTING.md>
