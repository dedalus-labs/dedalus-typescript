import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

/** Reads the package identity once so every registry operation uses the same metadata. */
export const readPackageMetadata = () => {
  const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  if (typeof packageJson.name !== 'string' || packageJson.name.length === 0) {
    throw new Error('Missing package name in package.json');
  }
  if (typeof packageJson.version !== 'string' || packageJson.version.length === 0) {
    throw new Error('Missing package version in package.json');
  }
  return { name: packageJson.name, version: packageJson.version };
};

/** Derives an npm dist-tag from a semver prerelease while leaving other npm-handled versions unchanged. */
export const npmDistTagForVersion = (version) => {
  // Calendar versions such as `2026-02-23` use hyphens without denoting a semver prerelease.
  // Only a numeric three-part core followed by `-` is interpreted as a prerelease here; npm
  // remains the source of truth for whether the complete package version is publishable.
  const prerelease = /^\d+\.\d+\.\d+-([^+]+)(?:\+.*)?$/.exec(version)?.[1];
  if (!prerelease) return undefined;
  const candidate = prerelease.split('.')[0];
  return /^[a-z][a-z0-9-]*$/.test(candidate) ? candidate : 'next';
};

/** Runs one npm command with inherited CI credentials and output. */
const runNpm = (args, stdio = 'inherit') => spawnSync('npm', args, { stdio });

/** Publishes the repository package once, applying a derived prerelease dist-tag when needed. */
export const publishNpm = (runner = runNpm, metadata = readPackageMetadata()) => {
  const { name, version } = metadata;
  const packageSpec = `${name}@${version}`;
  if (runner(['view', packageSpec, 'version'], 'ignore').status === 0) {
    console.log(`${packageSpec} already published to npm, skipping`);
    return;
  }

  const tag = npmDistTagForVersion(version);
  const args = ['publish', '--access', 'public', ...(tag ? ['--tag', tag] : [])];
  console.log(
    tag ? `Publishing ${packageSpec} to npm with dist-tag ${tag}` : `Publishing ${packageSpec} to npm`,
  );
  const result = runner(args);
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`npm publish failed with exit code ${result.status ?? 'unknown'}`);
};

/** Runs publication only when Node executes this file directly, keeping its helpers testable. */
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) publishNpm();
