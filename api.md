# Machines

Types:

- <code><a href="./src/resources/machines/machines.ts">CreateParams</a></code>
- <code><a href="./src/resources/machines/machines.ts">LifecycleStatus</a></code>
- <code><a href="./src/resources/machines/machines.ts">Machine</a></code>
- <code><a href="./src/resources/machines/machines.ts">MachineList</a></code>
- <code><a href="./src/resources/machines/machines.ts">MachineListItem</a></code>
- <code><a href="./src/resources/machines/machines.ts">UpdateParams</a></code>

Methods:

- <code title="post /v1/machines">client.machines.<a href="./src/resources/machines/machines.ts">create</a>({ ...params }) -> Machine</code>
- <code title="get /v1/machines/{machine_id}">client.machines.<a href="./src/resources/machines/machines.ts">retrieve</a>({ ...params }) -> Machine</code>
- <code title="patch /v1/machines/{machine_id}">client.machines.<a href="./src/resources/machines/machines.ts">update</a>({ ...params }) -> Machine</code>
- <code title="get /v1/machines">client.machines.<a href="./src/resources/machines/machines.ts">list</a>({ ...params }) -> MachineListItemsCursorPage</code>
- <code title="delete /v1/machines/{machine_id}">client.machines.<a href="./src/resources/machines/machines.ts">delete</a>({ ...params }) -> Machine</code>
- <code title="post /v1/machines/{machine_id}/sleep">client.machines.<a href="./src/resources/machines/machines.ts">sleep</a>({ ...params }) -> Machine</code>
- <code title="post /v1/machines/{machine_id}/wake">client.machines.<a href="./src/resources/machines/machines.ts">wake</a>({ ...params }) -> Machine</code>
- <code title="get /v1/machines/{machine_id}/status/stream">client.machines.<a href="./src/resources/machines/machines.ts">watch</a>({ ...params }) -> Machine</code>

## Artifacts

Types:

- <code><a href="./src/resources/machines/artifacts.ts">Artifact</a></code>
- <code><a href="./src/resources/machines/artifacts.ts">ArtifactList</a></code>

Methods:

- <code title="get /v1/machines/{machine_id}/artifacts/{artifact_id}">client.machines.artifacts.<a href="./src/resources/machines/artifacts.ts">retrieve</a>({ ...params }) -> Artifact</code>
- <code title="get /v1/machines/{machine_id}/artifacts">client.machines.artifacts.<a href="./src/resources/machines/artifacts.ts">list</a>({ ...params }) -> ArtifactsCursorPage</code>
- <code title="delete /v1/machines/{machine_id}/artifacts/{artifact_id}">client.machines.artifacts.<a href="./src/resources/machines/artifacts.ts">delete</a>({ ...params }) -> Artifact</code>

## Previews

Types:

- <code><a href="./src/resources/machines/previews.ts">Preview</a></code>
- <code><a href="./src/resources/machines/previews.ts">PreviewCreateParams</a></code>
- <code><a href="./src/resources/machines/previews.ts">PreviewList</a></code>

Methods:

- <code title="post /v1/machines/{machine_id}/previews">client.machines.previews.<a href="./src/resources/machines/previews.ts">create</a>({ ...params }) -> Preview</code>
- <code title="get /v1/machines/{machine_id}/previews/{preview_id}">client.machines.previews.<a href="./src/resources/machines/previews.ts">retrieve</a>({ ...params }) -> Preview</code>
- <code title="get /v1/machines/{machine_id}/previews">client.machines.previews.<a href="./src/resources/machines/previews.ts">list</a>({ ...params }) -> PreviewsCursorPage</code>
- <code title="delete /v1/machines/{machine_id}/previews/{preview_id}">client.machines.previews.<a href="./src/resources/machines/previews.ts">delete</a>({ ...params }) -> Preview</code>

## SSH

Types:

- <code><a href="./src/resources/machines/ssh.ts">SSHConnection</a></code>
- <code><a href="./src/resources/machines/ssh.ts">SSHHostTrust</a></code>
- <code><a href="./src/resources/machines/ssh.ts">SSHSession</a></code>
- <code><a href="./src/resources/machines/ssh.ts">SSHSessionCreateParams</a></code>
- <code><a href="./src/resources/machines/ssh.ts">SSHSessionList</a></code>

Methods:

- <code title="post /v1/machines/{machine_id}/ssh">client.machines.ssh.<a href="./src/resources/machines/ssh.ts">create</a>({ ...params }) -> SSHSession</code>
- <code title="get /v1/machines/{machine_id}/ssh/{session_id}">client.machines.ssh.<a href="./src/resources/machines/ssh.ts">retrieve</a>({ ...params }) -> SSHSession</code>
- <code title="get /v1/machines/{machine_id}/ssh">client.machines.ssh.<a href="./src/resources/machines/ssh.ts">list</a>({ ...params }) -> SSHSessionsCursorPage</code>
- <code title="delete /v1/machines/{machine_id}/ssh/{session_id}">client.machines.ssh.<a href="./src/resources/machines/ssh.ts">delete</a>({ ...params }) -> SSHSession</code>

## Executions

Types:

- <code><a href="./src/resources/machines/executions.ts">ArtifactRef</a></code>
- <code><a href="./src/resources/machines/executions.ts">Execution</a></code>
- <code><a href="./src/resources/machines/executions.ts">ExecutionCreateParams</a></code>
- <code><a href="./src/resources/machines/executions.ts">ExecutionEvent</a></code>
- <code><a href="./src/resources/machines/executions.ts">ExecutionEvents</a></code>
- <code><a href="./src/resources/machines/executions.ts">ExecutionList</a></code>
- <code><a href="./src/resources/machines/executions.ts">ExecutionOutput</a></code>

Methods:

- <code title="post /v1/machines/{machine_id}/executions">client.machines.executions.<a href="./src/resources/machines/executions.ts">create</a>({ ...params }) -> Execution</code>
- <code title="get /v1/machines/{machine_id}/executions/{execution_id}">client.machines.executions.<a href="./src/resources/machines/executions.ts">retrieve</a>({ ...params }) -> Execution</code>
- <code title="get /v1/machines/{machine_id}/executions">client.machines.executions.<a href="./src/resources/machines/executions.ts">list</a>({ ...params }) -> ExecutionsCursorPage</code>
- <code title="delete /v1/machines/{machine_id}/executions/{execution_id}">client.machines.executions.<a href="./src/resources/machines/executions.ts">delete</a>({ ...params }) -> Execution</code>
- <code title="get /v1/machines/{machine_id}/executions/{execution_id}/events">client.machines.executions.<a href="./src/resources/machines/executions.ts">events</a>({ ...params }) -> ExecutionEventsCursorPage</code>
- <code title="get /v1/machines/{machine_id}/executions/{execution_id}/output">client.machines.executions.<a href="./src/resources/machines/executions.ts">output</a>({ ...params }) -> ExecutionOutput</code>

## Terminals

Types:

- <code><a href="./src/resources/machines/terminals.ts">Terminal</a></code>
- <code><a href="./src/resources/machines/terminals.ts">TerminalClientEvent</a></code>
- <code><a href="./src/resources/machines/terminals.ts">TerminalClosedEvent</a></code>
- <code><a href="./src/resources/machines/terminals.ts">TerminalCreateParams</a></code>
- <code><a href="./src/resources/machines/terminals.ts">TerminalErrorEvent</a></code>
- <code><a href="./src/resources/machines/terminals.ts">TerminalInputEvent</a></code>
- <code><a href="./src/resources/machines/terminals.ts">TerminalList</a></code>
- <code><a href="./src/resources/machines/terminals.ts">TerminalOutputEvent</a></code>
- <code><a href="./src/resources/machines/terminals.ts">TerminalResizeEvent</a></code>
- <code><a href="./src/resources/machines/terminals.ts">TerminalServerEvent</a></code>

Methods:

- <code title="post /v1/machines/{machine_id}/terminals">client.machines.terminals.<a href="./src/resources/machines/terminals.ts">create</a>({ ...params }) -> Terminal</code>
- <code title="get /v1/machines/{machine_id}/terminals/{terminal_id}">client.machines.terminals.<a href="./src/resources/machines/terminals.ts">retrieve</a>({ ...params }) -> Terminal</code>
- <code title="get /v1/machines/{machine_id}/terminals">client.machines.terminals.<a href="./src/resources/machines/terminals.ts">list</a>({ ...params }) -> TerminalsCursorPage</code>
- <code title="delete /v1/machines/{machine_id}/terminals/{terminal_id}">client.machines.terminals.<a href="./src/resources/machines/terminals.ts">delete</a>({ ...params }) -> Terminal</code>
