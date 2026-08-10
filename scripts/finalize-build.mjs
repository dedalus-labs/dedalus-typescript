import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const RELATIVE_SPECIFIER_RE = /(from\s+["']|import\(\s*["'])(\.{1,2}\/[^"']+)(["'])/g;
// tsc's declaration emitter collapses a `/** @ts-ignore */` JSDoc onto the same line as
// the declaration it documents. `@ts-ignore` only suppresses the next line, so the
// collapsed form leaves the speculative parent-node_modules import ladders in
// internal/types.d.ts unsuppressed and consumers with `skipLibCheck: false` fail with
// TS2307. The trailing space keeps this from matching comments already on their own line.
const INLINE_TS_IGNORE_RE = /\/\*\* @ts-ignore\b[^*]*\*\/ /g;

await Promise.all([
  finalizeCompiledOutput(resolve(root, 'dist/esm'), { addJsExtensions: true }),
  finalizeCompiledOutput(resolve(root, 'dist/cjs'), { addJsExtensions: false }),
  markCommonJsOutput(resolve(root, 'dist/cjs')),
]);

/**
 * Applies post-`tsc` fixups to one compiled output directory: extensionless relative
 * specifiers get a `.js` suffix in the ESM output, and declaration files get collapsed
 * inline `@ts-ignore` JSDoc rewritten to a line comment so the suppression still works.
 */
async function finalizeCompiledOutput(dir, { addJsExtensions }) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error && error.code === 'ENOENT') return;
    throw error;
  }

  await Promise.all(
    entries.map(async (entry) => {
      const path = resolve(dir, entry.name);
      if (entry.isDirectory()) {
        await finalizeCompiledOutput(path, { addJsExtensions });
        return;
      }
      if (!path.endsWith('.js') && !path.endsWith('.d.ts')) return;
      const source = await readFile(path, 'utf8');
      let transformed = source;
      if (addJsExtensions) transformed = transformed.replace(RELATIVE_SPECIFIER_RE, addJsExtension);
      if (path.endsWith('.d.ts')) transformed = transformed.replace(INLINE_TS_IGNORE_RE, '// @ts-ignore\n');
      if (transformed !== source) await writeFile(path, transformed, 'utf8');
    }),
  );
}

async function markCommonJsOutput(dir) {
  try {
    await readdir(dir);
    await writeFile(resolve(dir, 'package.json'), '{\n  "type": "commonjs"\n}\n', 'utf8');
  } catch (error) {
    if (error && error.code === 'ENOENT') return;
    throw error;
  }
}

function addJsExtension(match, prefix, specifier, suffix) {
  if (extname(specifier)) return match;
  return `${prefix}${specifier}.js${suffix}`;
}
