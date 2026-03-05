# Publishing Releases

This guide explains the process for manually creating and publishing a new release of the packages in the `rendr-view` monorepo.

## 🚀 Prerequisites

Before you start, ensure you have the following:

1.  **NPM Permissions**: You must have publish access to the `@rendr-view` organization (or the relevant packages) on npm.
2.  **Login**: Ensure you are logged into npm in your terminal:
    ```bash
    npm whoami
    ```
    If not logged in, run:
    ```bash
    npm login
    ```
3.  **Correct Branch**: All releases MUST be done from the `main` branch.

---

## 📋 Step-by-Step Instructions

### Step 1: Sync Your Local Environment

Ensure your local `main` branch is up to date with the remote.

```bash
git checkout main
git pull origin main
pnpm install
```

### Step 2: Verify the Code

Make sure everything builds and tests pass before you even think about versioning.

```bash
pnpm build
pnpm test
```

### Step 3: Add a Changeset (If needed)

If there are new changes that haven't been captured in a changeset yet, create one now. This documents what changed (patch, minor, or major).

```bash
pnpm changeset
```

- Follow the interactive prompts.
- Select the packages that have changed.
- Choose the version bump type.
- Enter a brief summary of the changes.

### Step 4: Version the Packages

This step will consume the changesets, bump the versions in `package.json` files, and update the `CHANGELOG.md` files.

```bash
pnpm version-packages
```

### Step 5: Final Verification

Before publishing, run the verification script to ensure all workspace dependencies are correctly handled and the build is clean.

```bash
pnpm verify-release
```

_If this fails, STOP and fix the issues reported._

### Step 6: Publish to NPM

Now it's time to actually send the packages to npm.

```bash
pnpm release
```

This command will:

1. Re-build everything.
2. Run the verification script again.
3. Publish all changed packages to npm with public access.

### Step 7: Push Changes to GitHub

The version bump created several changes (version updates, changelogs, deleted changeset files). These need to be pushed back to the repository.

```bash
git add .
git commit -m "chore: release packages"
git push origin main --tags
```

---

## 🛠 Troubleshooting

### "Forbidden" or "403" Error during publish

- Ensure you are logged into the correct npm account.
- Check if you have maintainer access to the package.
- If it's a new package, ensure the name is available and you have permission to create it under the scope.

### "Unresolved workspace dependency" error

- This happens if `pnpm` didn't correctly swap `workspace:*` for the actual version during the build/pack process.
- The `pnpm verify-release` script catches this. Usually, a clean build (`pnpm clean && pnpm install && pnpm build`) fixes it.

### Accidental Release

- If you published something by mistake, you can `npm unpublish <package>@<version>` within 72 hours, but this is generally discouraged. It's better to fix the issue and release a new version.
