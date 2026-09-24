// Verify runtime imports from an installed tarball, outside the source dependency tree.
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const root = process.cwd();
const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const directory = mkdtempSync(join(tmpdir(), 'dedalus-sdk-install-'));
const run = (file, args, cwd) => execFileSync(file, args, { cwd, encoding: 'utf8', stdio: 'pipe' });
try {
  run('pnpm', ['pack', '--pack-destination', directory], root);
  const consumer = join(directory, 'consumer');
  mkdirSync(consumer);
  writeFileSync(join(consumer, 'package.json'), '{"private":true}\n');
  const archive = join(directory, `${manifest.name}-${manifest.version}.tgz`);
  run('pnpm', ['add', '--ignore-scripts', archive], consumer);
  const probe = `
    const client = new SDK({apiKey:'installation-test', baseURL:'https://dcs.dedaluslabs.ai'});
    if (client.baseURL !== 'https://dcs.dedaluslabs.ai') throw new Error('wrong API destination');
  `;
  run(process.execPath, ['--input-type=module', '-e', `import SDK from 'dedalus'; ${probe}`], consumer);
  run(process.execPath, ['-e', `const SDK = require('dedalus').default; ${probe}`], consumer);
  writeFileSync(
    join(consumer, 'consumer.mts'),
    `
    import Dedalus from 'dedalus';
    const client = new Dedalus({ apiKey: 'fixture' });
    const machine = await client.machines.create({ vcpu: 1, memory_mib: 4096 });
    await client.machines.executions.create({ machine_id: machine.machine_id, command: ['echo', 'hello'] });
    await client.organization.autoresizing.retrieve();
  `,
  );
  run(
    process.execPath,
    [
      join(root, 'node_modules/typescript/bin/tsc'),
      '--noEmit',
      '--strict',
      '--module',
      'NodeNext',
      '--moduleResolution',
      'NodeNext',
      '--target',
      'ES2023',
      'consumer.mts',
    ],
    consumer,
  );
  execFileSync(
    process.execPath,
    ['--test', 'tests/feedback-retry-keys.test.mjs', 'tests/api-contract.test.mjs'],
    {
      cwd: root,
      stdio: 'inherit',
      env: { ...process.env, FEEDBACK_PACKAGE_ROOT: join(consumer, 'node_modules/dedalus') },
    },
  );
  process.stdout.write('Installed SDK imports passed: ESM and CommonJS.\n');
} finally {
  rmSync(directory, { recursive: true, force: true });
}
