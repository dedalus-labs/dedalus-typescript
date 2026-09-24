import { workflow, unsafeShell } from '@dedalus-labs/hollywood';

export const definition = workflow({
  name: 'Release Please',
  on: {
    push: {
      branches: ['main'],
    },
    workflow_dispatch: null,
  },
  permissions: {
    contents: 'write',
    'pull-requests': 'write',
  },
  jobs: {
    'release-please': {
      'runs-on': 'ubuntu-24.04',
      outputs: {
        release_created: '${{ steps.release.outputs.release_created }}',
        tag_name: '${{ steps.release.outputs.tag_name }}',
      },
      steps: [
        {
          uses: 'googleapis/release-please-action@45996ed1f6d02564a971a2fa1b5860e934307cf7',
          id: 'release',
          with: {
            'target-branch': 'main',
            'config-file': 'release-please-config.json',
            'manifest-file': '.release-please-manifest.json',
            'skip-github-pull-request': true,
          },
        },
        {
          uses: 'actions/checkout@34e114876b0b11c390a56381ad16ebd13914f8d5',
          if: "${{ steps.release.outputs.release_created == 'true' }}",
          with: {
            'fetch-depth': 0,
          },
        },
        {
          name: 'Sync release back to scalar-next',
          if: "${{ steps.release.outputs.release_created == 'true' }}",
          run: unsafeShell(
            'git config user.name "github-actions[bot]"\ngit config user.email "41898282+github-actions[bot]@users.noreply.github.com"\ngit fetch origin scalar-next\ngit checkout -B scalar-next origin/scalar-next\ngit merge --no-edit -m "Sync release ${{ steps.release.outputs.tag_name }} back to scalar-next" "${{ steps.release.outputs.sha }}"\ngit push origin scalar-next\n',
          ),
        },
      ],
    },
    publish: {
      needs: 'release-please',
      if: "${{ !cancelled() && needs.release-please.outputs.release_created == 'true' }}",
      'runs-on': 'ubuntu-24.04',
      permissions: {
        actions: 'write',
        contents: 'read',
      },
      steps: [
        {
          name: 'Publish the released tag',
          env: {
            GH_TOKEN: '${{ github.token }}',
            RELEASE_TAG: '${{ needs.release-please.outputs.tag_name }}',
          },
          run: unsafeShell(
            'gh workflow run publish-npm.yml --repo "$GITHUB_REPOSITORY" --ref main -f tag="$RELEASE_TAG"',
          ),
        },
      ],
    },
  },
});
