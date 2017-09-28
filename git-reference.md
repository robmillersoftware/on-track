# CFI Git Workflow Reference

All code changes should be done on a feature branch.

The format for naming a feature branch is
`feature/us1234_you-story-description`, where `us1234` is your story number.

## Create a new feature branch

Always branch from `develop`, so make sure you're on `develop` first and
do a `git pull` on `develop` to make sure you have the latest.

To list local branches, with current branch highlighted:

```bash
git branch
```

Then, to create your feature branch:

```bash
git branch feature/us0000_my-feature-story-name
```

*Note that `0000` should be your user story number.*

Then switch to your branch using:

```bash
git checkout feature/us0000_my-feature-story-name
```

Now you are ready to start working on your story or task.

## Checkout an existing remote branch

You can checkout an existing remote branch using:

```bash
git checkout feature/us0000_remove-branch-name
```

If you’d like to first see a list of all remote branches use,

```bash
git fetch --all

git branch --all
```

## Commit changes locally

You’ve made some changes and want to commit those changes.

If you’d like to first see a list of new or modified files use,

```bash
git status
```

You will typically first use the `add` command before `commit`.

```bash
git add --all
```

You can again use `git status` to see the currently staged files.

Not to commit your changes run the following:

```bash
git commit -m “your commit message here”
```

The commit message should provide a summary description of the changes
you’re committing and should always be provided.

To view recent commits on your current branch you can type,

```bash
git log
```

*(Press `q` to exit out of git log.)*

If you’d rather pull up a GUI interface you can type the following:

```bash
gitk
```

It’s a good idea to commit frequently. Per task or even per subtask.

## Push changes to remote repo

You should also regularly push your commits to the remote repository.
Try not to push code that does not work or does not pass the linter(s) or
unit tests. Also try to push your changes at least once per day.

```bash
git push
```

Or explicitly:

```bash
git push origin feature/us0000_your-remote-feature-branch
```

If plain old `git push` doesn’t work perhaps your `push.default` setting isn’t
set. Try running:

```bash
git config --global push.default simple
```

## Creating a pull request

If you’re done working on your story and would like to submit your changes to
be code reviewed and merged with develop, go to Bitbucket.

1. From within the project repo on Bitbucket, find the **Pull requests**
area near the bottom of the right nav bar and go there.
1. Click the **Create pull request** button.
1. For the **Source** select your feature branch.
1. For the **Destination** select the develop branch.
1. On the next screen the PR title should default to your branch name, which
is fine. The default description should reflect your commit messages.
Leave those but also feel free to add more information here.
1. Add at least two reviewers, but three is recommended.

Additionally, once the PR is created, you can go to the Diff tab and add
comments alongside your changes to help your reviewers.

Only the designated build master can ultimately merge pull requests.
This will happen after at least two reviewed have marked the PR are
“approved”.

## Pre Pull Request Checklist

Here are some things to consider prior to submitting a PR.

1. Does the build complete?
1. Does the app run in the major browsers without defects or console errors?
1. Does the JS linter pass without errors or warnings?
1. Does the Sass linter pass without errors or warnings?
1. Do the unit tests all pass?
1. Does your code have appropriate unit test coverage? (If applicable)
1. Does your code take into account accessibility guidelines? (If applicable)
    1. Use the pattern library/angular material
    1. Use the Axe Chrome Extension
    1. Zoom to 200% and check for overlapping/cut-off text
    1. Navigate to everything using the keyboard- check the tab order and that there is visible focus on the active field
