# Workspaces

Types:

- <code><a href="./src/resources/workspaces.ts">CreateParams</a></code>
- <code><a href="./src/resources/workspaces.ts">LifecycleStatus</a></code>
- <code><a href="./src/resources/workspaces.ts">UpdateParams</a></code>
- <code><a href="./src/resources/workspaces.ts">Workspace</a></code>
- <code><a href="./src/resources/workspaces.ts">WorkspaceList</a></code>

Methods:

- <code title="post /v1/workspaces">client.workspaces.<a href="./src/resources/workspaces.ts">create</a>({ ...params }) -> Workspace</code>
- <code title="get /v1/workspaces/{workspace_id}">client.workspaces.<a href="./src/resources/workspaces.ts">retrieve</a>(workspaceID) -> Workspace</code>
- <code title="patch /v1/workspaces/{workspace_id}">client.workspaces.<a href="./src/resources/workspaces.ts">update</a>(workspaceID, { ...params }) -> Workspace</code>
- <code title="get /v1/workspaces">client.workspaces.<a href="./src/resources/workspaces.ts">list</a>({ ...params }) -> WorkspaceListItemsWorkspaceList</code>
- <code title="delete /v1/workspaces/{workspace_id}">client.workspaces.<a href="./src/resources/workspaces.ts">delete</a>(workspaceID, { ...params }) -> Workspace</code>
