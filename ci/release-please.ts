import { workflow, unsafeShell } from '@dedalus-labs/hollywood';

export const definition = workflow({
  name: 'Release Please',
  on: {
    push: {
      branches: ['main'],
      'paths-ignore': ['.github/workflows/**'],
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
          uses: 'actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1',
          if: "${{ steps.release.outputs.release_created == 'true' }}",
          with: {
            'fetch-depth': 0,
          },
        },
        {
          name: 'Sync release back to scalar-next',
          if: "${{ steps.release.outputs.release_created == 'true' }}",
          env: {
            RELEASE_SHA: '${{ steps.release.outputs.sha }}',
            RELEASE_TAG: '${{ steps.release.outputs.tag_name }}',
          },
          run: unsafeShell(
            'git config user.name "github-actions[bot]"\ngit config user.email "41898282+github-actions[bot]@users.noreply.github.com"\nsync_release() {\n  git fetch origin scalar-next || return 1\n  if git merge-base --is-ancestor "$RELEASE_SHA" origin/scalar-next; then\n    echo "$RELEASE_TAG is already on scalar-next."\n    return 0\n  fi\n  git checkout -B scalar-next origin/scalar-next || return 1\n  if ! git merge --no-edit -m "Sync release $RELEASE_TAG back to scalar-next" "$RELEASE_SHA"; then\n    git merge --abort\n    return 1\n  fi\n  git push origin scalar-next\n}\nfor attempt in 1 2 3; do\n  if sync_release; then exit 0; fi\n  echo "Attempt $attempt of 3 to sync $RELEASE_TAG back to scalar-next failed."\n  if [ "$attempt" -lt 3 ]; then sleep $((attempt * 5)); fi\ndone\necho "::error::Could not sync $RELEASE_TAG back to scalar-next after 3 attempts."\nexit 1\n',
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
