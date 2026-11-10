import { command, workflow } from '@dedalus-labs/hollywood';

export const sdkCI = workflow({
  name: 'TypeScript SDK CI',
  on: { push: {}, pull_request: {} },
  permissions: { contents: 'read' },
  jobs: {
    verify: {
      'runs-on': 'ubuntu-24.04',
      'timeout-minutes': 15,
      steps: [
        { uses: 'actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1' },
        {
          uses: 'actions/setup-node@820762786026740c76f36085b0efc47a31fe5020',
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
            args: ['diff', '--exit-code', '--', '.github/workflows'],
          }),
        },
        { name: 'Build SDK', run: command({ file: 'pnpm', args: ['run', 'build'] }) },
        {
          name: 'Test installed SDK',
          run: command({ file: 'pnpm', args: ['run', 'test:package'] }),
        },
        {
          name: 'Check formatting',
          run: command({ file: 'pnpm', args: ['dlx', '@biomejs/biome@2.5.14', 'format', '.'] }),
        },
      ],
    },
  },
});
