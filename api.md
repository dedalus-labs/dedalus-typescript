# Workspaces

Types:

- <code><a href="./src/resources/workspaces/workspaces.ts">CreateParams</a></code>
- <code><a href="./src/resources/workspaces/workspaces.ts">LifecycleStatus</a></code>
- <code><a href="./src/resources/workspaces/workspaces.ts">UpdateParams</a></code>
- <code><a href="./src/resources/workspaces/workspaces.ts">Workspace</a></code>
- <code><a href="./src/resources/workspaces/workspaces.ts">WorkspaceList</a></code>

Methods:

- <code title="post /v1/workspaces">client.workspaces.<a href="./src/resources/workspaces/workspaces.ts">create</a>({ ...params }) -> Workspace</code>
- <code title="get /v1/workspaces/{workspace_id}">client.workspaces.<a href="./src/resources/workspaces/workspaces.ts">retrieve</a>(workspaceID) -> Workspace</code>
- <code title="patch /v1/workspaces/{workspace_id}">client.workspaces.<a href="./src/resources/workspaces/workspaces.ts">update</a>(workspaceID, { ...params }) -> Workspace</code>
- <code title="get /v1/workspaces">client.workspaces.<a href="./src/resources/workspaces/workspaces.ts">list</a>({ ...params }) -> WorkspaceListItemsWorkspaceList</code>
- <code title="delete /v1/workspaces/{workspace_id}">client.workspaces.<a href="./src/resources/workspaces/workspaces.ts">delete</a>(workspaceID, { ...params }) -> Workspace</code>

## Artifacts

Types:

- <code><a href="./src/resources/workspaces/artifacts.ts">Artifact</a></code>
- <code><a href="./src/resources/workspaces/artifacts.ts">ArtifactList</a></code>

Methods:

- <code title="get /v1/workspaces/{workspace_id}/artifacts/{artifact_id}">client.workspaces.artifacts.<a href="./src/resources/workspaces/artifacts.ts">retrieve</a>(artifactID, { ...params }) -> Artifact</code>
- <code title="get /v1/workspaces/{workspace_id}/artifacts">client.workspaces.artifacts.<a href="./src/resources/workspaces/artifacts.ts">list</a>(workspaceID, { ...params }) -> ArtifactsArtifactList</code>
- <code title="delete /v1/workspaces/{workspace_id}/artifacts/{artifact_id}">client.workspaces.artifacts.<a href="./src/resources/workspaces/artifacts.ts">delete</a>(artifactID, { ...params }) -> Artifact</code>

## Previews

Types:

- <code><a href="./src/resources/workspaces/previews.ts">Preview</a></code>
- <code><a href="./src/resources/workspaces/previews.ts">PreviewCreateParams</a></code>
- <code><a href="./src/resources/workspaces/previews.ts">PreviewList</a></code>

Methods:

- <code title="post /v1/workspaces/{workspace_id}/previews">client.workspaces.previews.<a href="./src/resources/workspaces/previews.ts">create</a>(workspaceID, { ...params }) -> Preview</code>
- <code title="get /v1/workspaces/{workspace_id}/previews/{preview_id}">client.workspaces.previews.<a href="./src/resources/workspaces/previews.ts">retrieve</a>(previewID, { ...params }) -> Preview</code>
- <code title="get /v1/workspaces/{workspace_id}/previews">client.workspaces.previews.<a href="./src/resources/workspaces/previews.ts">list</a>(workspaceID, { ...params }) -> PreviewsPreviewList</code>
- <code title="delete /v1/workspaces/{workspace_id}/previews/{preview_id}">client.workspaces.previews.<a href="./src/resources/workspaces/previews.ts">delete</a>(previewID, { ...params }) -> Preview</code>

## SSH

Types:

- <code><a href="./src/resources/workspaces/ssh.ts">SSHConnection</a></code>
- <code><a href="./src/resources/workspaces/ssh.ts">SSHHostTrust</a></code>
- <code><a href="./src/resources/workspaces/ssh.ts">SSHSession</a></code>
- <code><a href="./src/resources/workspaces/ssh.ts">SSHSessionCreateParams</a></code>
- <code><a href="./src/resources/workspaces/ssh.ts">SSHSessionList</a></code>

Methods:

- <code title="post /v1/workspaces/{workspace_id}/ssh">client.workspaces.ssh.<a href="./src/resources/workspaces/ssh.ts">create</a>(workspaceID, { ...params }) -> SSHSession</code>
- <code title="get /v1/workspaces/{workspace_id}/ssh/{session_id}">client.workspaces.ssh.<a href="./src/resources/workspaces/ssh.ts">retrieve</a>(sessionID, { ...params }) -> SSHSession</code>
- <code title="get /v1/workspaces/{workspace_id}/ssh">client.workspaces.ssh.<a href="./src/resources/workspaces/ssh.ts">list</a>(workspaceID, { ...params }) -> SSHSessionsSSHSessionList</code>
- <code title="delete /v1/workspaces/{workspace_id}/ssh/{session_id}">client.workspaces.ssh.<a href="./src/resources/workspaces/ssh.ts">delete</a>(sessionID, { ...params }) -> SSHSession</code>

## Executions

Types:

- <code><a href="./src/resources/workspaces/executions.ts">ArtifactRef</a></code>
- <code><a href="./src/resources/workspaces/executions.ts">Execution</a></code>
- <code><a href="./src/resources/workspaces/executions.ts">ExecutionCreateParams</a></code>
- <code><a href="./src/resources/workspaces/executions.ts">ExecutionEvent</a></code>
- <code><a href="./src/resources/workspaces/executions.ts">ExecutionEvents</a></code>
- <code><a href="./src/resources/workspaces/executions.ts">ExecutionList</a></code>
- <code><a href="./src/resources/workspaces/executions.ts">ExecutionOutput</a></code>

Methods:

- <code title="post /v1/workspaces/{workspace_id}/executions">client.workspaces.executions.<a href="./src/resources/workspaces/executions.ts">create</a>(workspaceID, { ...params }) -> Execution</code>
- <code title="get /v1/workspaces/{workspace_id}/executions/{execution_id}">client.workspaces.executions.<a href="./src/resources/workspaces/executions.ts">retrieve</a>(executionID, { ...params }) -> Execution</code>
- <code title="get /v1/workspaces/{workspace_id}/executions">client.workspaces.executions.<a href="./src/resources/workspaces/executions.ts">list</a>(workspaceID, { ...params }) -> ExecutionsExecutionList</code>
- <code title="delete /v1/workspaces/{workspace_id}/executions/{execution_id}">client.workspaces.executions.<a href="./src/resources/workspaces/executions.ts">delete</a>(executionID, { ...params }) -> Execution</code>
- <code title="get /v1/workspaces/{workspace_id}/executions/{execution_id}/events">client.workspaces.executions.<a href="./src/resources/workspaces/executions.ts">events</a>(executionID, { ...params }) -> ExecutionEventsExecutionEvents</code>
- <code title="get /v1/workspaces/{workspace_id}/executions/{execution_id}/output">client.workspaces.executions.<a href="./src/resources/workspaces/executions.ts">output</a>(executionID, { ...params }) -> ExecutionOutput</code>

## Terminals

Types:

- <code><a href="./src/resources/workspaces/terminals.ts">Terminal</a></code>
- <code><a href="./src/resources/workspaces/terminals.ts">TerminalClientEvent</a></code>
- <code><a href="./src/resources/workspaces/terminals.ts">TerminalClosedEvent</a></code>
- <code><a href="./src/resources/workspaces/terminals.ts">TerminalCreateParams</a></code>
- <code><a href="./src/resources/workspaces/terminals.ts">TerminalErrorEvent</a></code>
- <code><a href="./src/resources/workspaces/terminals.ts">TerminalInputEvent</a></code>
- <code><a href="./src/resources/workspaces/terminals.ts">TerminalList</a></code>
- <code><a href="./src/resources/workspaces/terminals.ts">TerminalOutputEvent</a></code>
- <code><a href="./src/resources/workspaces/terminals.ts">TerminalResizeEvent</a></code>
- <code><a href="./src/resources/workspaces/terminals.ts">TerminalServerEvent</a></code>

Methods:

- <code title="post /v1/workspaces/{workspace_id}/terminals">client.workspaces.terminals.<a href="./src/resources/workspaces/terminals.ts">create</a>(workspaceID, { ...params }) -> Terminal</code>
- <code title="get /v1/workspaces/{workspace_id}/terminals/{terminal_id}">client.workspaces.terminals.<a href="./src/resources/workspaces/terminals.ts">retrieve</a>(terminalID, { ...params }) -> Terminal</code>
- <code title="get /v1/workspaces/{workspace_id}/terminals">client.workspaces.terminals.<a href="./src/resources/workspaces/terminals.ts">list</a>(workspaceID, { ...params }) -> TerminalsTerminalList</code>
- <code title="delete /v1/workspaces/{workspace_id}/terminals/{terminal_id}">client.workspaces.terminals.<a href="./src/resources/workspaces/terminals.ts">delete</a>(terminalID, { ...params }) -> Terminal</code>
