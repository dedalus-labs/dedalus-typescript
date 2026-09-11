import { command, workflow } from '@dedalus-labs/hollywood';

export const sdkCI = workflow({
  name: 'TypeScript SDK CI',
  on: { push: {}, pull_request: {} },
  permissions: { contents: 'read' },
  jobs: {
    verify: {
      'runs-on': 'blacksmith-4vcpu-ubuntu-2404',
      'timeout-minutes': 15,
      steps: [
        { uses: 'actions/checkout@34e114876b0b11c390a56381ad16ebd13914f8d5' },
        {
          uses: 'actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020',
          with: { 'node-version': '24' },
        },
        {
          uses: 'pnpm/action-setup@a15d269cd4658e1107c09f1fabf4cbd7bd1f308a',
          with: { version: '10.20.0' },
        },
        {
          name: 'Install dependencies',
          run: command({
            file: 'pnpm',
            args: ['install', '--frozen-lockfile', '--ignore-scripts'],
          }),
        },
        {
          name: 'Generate workflows',
          run: command({ file: 'pnpm', args: ['run', 'ci:generate'] }),
        },
        {
          name: 'Check generated workflows',
          run: command({
            file: 'git',
            args: ['diff', '--exit-code', '--', '.github/workflows/sdk-ci.yml'],
          }),
        },
        { name: 'Build SDK', run: command({ file: 'pnpm', args: ['run', 'build'] }) },
        {
          name: 'Test installed SDK',
          run: command({ file: 'pnpm', args: ['run', 'test:package'] }),
        },
        {
          name: 'Check formatting',
          run: command({ file: 'pnpm', args: ['dlx', '@biomejs/biome@2.5.7', 'format', '.'] }),
        },
      ],
    },
  },
});
