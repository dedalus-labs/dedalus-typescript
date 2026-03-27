// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'create',
    endpoint: '/v1/workspaces',
    httpMethod: 'post',
    summary: 'Create workspace',
    description: 'Create workspace',
    stainlessPath: '(resource) workspaces > (method) create',
    qualified: 'client.workspaces.create',
    params: ['memory_mib: number;', 'storage_gib: number;', 'vcpu: number;'],
    response:
      "{ desired_state: 'running' | 'sleeping' | 'destroyed'; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; workspace_id: string; }",
    markdown:
      "## create\n\n`client.workspaces.create(memory_mib: number, storage_gib: number, vcpu: number): { desired_state: 'running' | 'sleeping' | 'destroyed'; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; workspace_id: string; }`\n\n**post** `/v1/workspaces`\n\nCreate workspace\n\n### Parameters\n\n- `memory_mib: number`\n  Memory in MiB.\n\n- `storage_gib: number`\n  Storage in GiB.\n\n- `vcpu: number`\n  CPU in vCPUs.\n\n### Returns\n\n- `{ desired_state: 'running' | 'sleeping' | 'destroyed'; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; workspace_id: string; }`\n\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n  - `workspace_id: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst workspace = await client.workspaces.create({\n  memory_mib: 0,\n  storage_gib: 0,\n  vcpu: 0,\n});\n\nconsole.log(workspace);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/workspaces/{workspace_id}',
    httpMethod: 'get',
    summary: 'Get workspace',
    description: 'Get workspace',
    stainlessPath: '(resource) workspaces > (method) retrieve',
    qualified: 'client.workspaces.retrieve',
    params: ['workspace_id: string;'],
    response:
      "{ desired_state: 'running' | 'sleeping' | 'destroyed'; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; workspace_id: string; }",
    markdown:
      "## retrieve\n\n`client.workspaces.retrieve(workspace_id: string): { desired_state: 'running' | 'sleeping' | 'destroyed'; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; workspace_id: string; }`\n\n**get** `/v1/workspaces/{workspace_id}`\n\nGet workspace\n\n### Parameters\n\n- `workspace_id: string`\n\n### Returns\n\n- `{ desired_state: 'running' | 'sleeping' | 'destroyed'; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; workspace_id: string; }`\n\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n  - `workspace_id: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst workspace = await client.workspaces.retrieve('workspace_id');\n\nconsole.log(workspace);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/workspaces/{workspace_id}',
    httpMethod: 'patch',
    summary: 'Update workspace',
    description: 'Update workspace',
    stainlessPath: '(resource) workspaces > (method) update',
    qualified: 'client.workspaces.update',
    params: [
      'workspace_id: string;',
      'If-Match: string;',
      'memory_mib?: number;',
      'storage_gib?: number;',
      'vcpu?: number;',
    ],
    response:
      "{ desired_state: 'running' | 'sleeping' | 'destroyed'; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; workspace_id: string; }",
    markdown:
      "## update\n\n`client.workspaces.update(workspace_id: string, If-Match: string, memory_mib?: number, storage_gib?: number, vcpu?: number): { desired_state: 'running' | 'sleeping' | 'destroyed'; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; workspace_id: string; }`\n\n**patch** `/v1/workspaces/{workspace_id}`\n\nUpdate workspace\n\n### Parameters\n\n- `workspace_id: string`\n\n- `If-Match: string`\n\n- `memory_mib?: number`\n  Memory in MiB.\n\n- `storage_gib?: number`\n  Storage in GiB.\n\n- `vcpu?: number`\n  CPU in vCPUs.\n\n### Returns\n\n- `{ desired_state: 'running' | 'sleeping' | 'destroyed'; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; workspace_id: string; }`\n\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n  - `workspace_id: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst workspace = await client.workspaces.update('workspace_id', { 'If-Match': 'If-Match' });\n\nconsole.log(workspace);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/workspaces',
    httpMethod: 'get',
    summary: 'List workspaces',
    description: 'List workspaces',
    stainlessPath: '(resource) workspaces > (method) list',
    qualified: 'client.workspaces.list',
    params: ['cursor?: string;', 'limit?: number;'],
    response:
      "{ created_at: string; desired_state: 'running' | 'sleeping' | 'destroyed'; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; workspace_id: string; }",
    markdown:
      "## list\n\n`client.workspaces.list(cursor?: string, limit?: number): { created_at: string; desired_state: 'running' | 'sleeping' | 'destroyed'; memory_mib: number; status: object; storage_gib: number; vcpu: number; workspace_id: string; }`\n\n**get** `/v1/workspaces`\n\nList workspaces\n\n### Parameters\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ created_at: string; desired_state: 'running' | 'sleeping' | 'destroyed'; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; workspace_id: string; }`\n\n  - `created_at: string`\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n  - `workspace_id: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const workspace of client.workspaces.list()) {\n  console.log(workspace);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/workspaces/{workspace_id}',
    httpMethod: 'delete',
    summary: 'Destroy workspace',
    description: 'Destroy workspace',
    stainlessPath: '(resource) workspaces > (method) delete',
    qualified: 'client.workspaces.delete',
    params: ['workspace_id: string;', 'If-Match: string;'],
    response:
      "{ desired_state: 'running' | 'sleeping' | 'destroyed'; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; workspace_id: string; }",
    markdown:
      "## delete\n\n`client.workspaces.delete(workspace_id: string, If-Match: string): { desired_state: 'running' | 'sleeping' | 'destroyed'; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; workspace_id: string; }`\n\n**delete** `/v1/workspaces/{workspace_id}`\n\nDestroy workspace\n\n### Parameters\n\n- `workspace_id: string`\n\n- `If-Match: string`\n\n### Returns\n\n- `{ desired_state: 'running' | 'sleeping' | 'destroyed'; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; workspace_id: string; }`\n\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n  - `workspace_id: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst workspace = await client.workspaces.delete('workspace_id', { 'If-Match': 'If-Match' });\n\nconsole.log(workspace);\n```",
  },
  {
    name: 'watch',
    endpoint: '/v1/workspaces/{workspace_id}/status/stream',
    httpMethod: 'get',
    summary: 'Watch workspace lifecycle status',
    description:
      'Streams workspace lifecycle updates over Server-Sent Events. Each `status` event contains a full `LifecycleResponse` payload. The stream closes after the workspace reaches its current desired state.',
    stainlessPath: '(resource) workspaces > (method) watch',
    qualified: 'client.workspaces.watch',
    params: ['workspace_id: string;', 'Last-Event-ID?: string;'],
    response:
      "{ desired_state: 'running' | 'sleeping' | 'destroyed'; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; workspace_id: string; }",
    markdown:
      "## watch\n\n`client.workspaces.watch(workspace_id: string, Last-Event-ID?: string): { desired_state: 'running' | 'sleeping' | 'destroyed'; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; workspace_id: string; }`\n\n**get** `/v1/workspaces/{workspace_id}/status/stream`\n\nStreams workspace lifecycle updates over Server-Sent Events. Each `status` event contains a full `LifecycleResponse` payload. The stream closes after the workspace reaches its current desired state.\n\n### Parameters\n\n- `workspace_id: string`\n\n- `Last-Event-ID?: string`\n\n### Returns\n\n- `{ desired_state: 'running' | 'sleeping' | 'destroyed'; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; workspace_id: string; }`\n\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n  - `workspace_id: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst stream = await client.workspaces.watch('workspace_id');\nfor await (const workspace of stream) {\n  console.log(workspace);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/workspaces/{workspace_id}/artifacts/{artifact_id}',
    httpMethod: 'get',
    summary: 'Get artifact',
    description: 'Get artifact',
    stainlessPath: '(resource) workspaces.artifacts > (method) retrieve',
    qualified: 'client.workspaces.artifacts.retrieve',
    params: ['workspace_id: string;', 'artifact_id: string;'],
    response:
      '{ artifact_id: string; created_at: string; name: string; size_bytes: number; workspace_id: string; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }',
    markdown:
      "## retrieve\n\n`client.workspaces.artifacts.retrieve(workspace_id: string, artifact_id: string): { artifact_id: string; created_at: string; name: string; size_bytes: number; workspace_id: string; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }`\n\n**get** `/v1/workspaces/{workspace_id}/artifacts/{artifact_id}`\n\nGet artifact\n\n### Parameters\n\n- `workspace_id: string`\n\n- `artifact_id: string`\n\n### Returns\n\n- `{ artifact_id: string; created_at: string; name: string; size_bytes: number; workspace_id: string; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }`\n\n  - `artifact_id: string`\n  - `created_at: string`\n  - `name: string`\n  - `size_bytes: number`\n  - `workspace_id: string`\n  - `download_url?: string`\n  - `execution_id?: string`\n  - `expires_at?: string`\n  - `mime_type?: string`\n  - `sha256?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst artifact = await client.workspaces.artifacts.retrieve('artifact_id', { workspace_id: 'workspace_id' });\n\nconsole.log(artifact);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/workspaces/{workspace_id}/artifacts',
    httpMethod: 'get',
    summary: 'List artifacts',
    description: 'List artifacts',
    stainlessPath: '(resource) workspaces.artifacts > (method) list',
    qualified: 'client.workspaces.artifacts.list',
    params: ['workspace_id: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      '{ artifact_id: string; created_at: string; name: string; size_bytes: number; workspace_id: string; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }',
    markdown:
      "## list\n\n`client.workspaces.artifacts.list(workspace_id: string, cursor?: string, limit?: number): { artifact_id: string; created_at: string; name: string; size_bytes: number; workspace_id: string; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }`\n\n**get** `/v1/workspaces/{workspace_id}/artifacts`\n\nList artifacts\n\n### Parameters\n\n- `workspace_id: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ artifact_id: string; created_at: string; name: string; size_bytes: number; workspace_id: string; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }`\n\n  - `artifact_id: string`\n  - `created_at: string`\n  - `name: string`\n  - `size_bytes: number`\n  - `workspace_id: string`\n  - `download_url?: string`\n  - `execution_id?: string`\n  - `expires_at?: string`\n  - `mime_type?: string`\n  - `sha256?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const artifact of client.workspaces.artifacts.list('workspace_id')) {\n  console.log(artifact);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/workspaces/{workspace_id}/artifacts/{artifact_id}',
    httpMethod: 'delete',
    summary: 'Delete artifact',
    description: 'Delete artifact',
    stainlessPath: '(resource) workspaces.artifacts > (method) delete',
    qualified: 'client.workspaces.artifacts.delete',
    params: ['workspace_id: string;', 'artifact_id: string;'],
    response:
      '{ artifact_id: string; created_at: string; name: string; size_bytes: number; workspace_id: string; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }',
    markdown:
      "## delete\n\n`client.workspaces.artifacts.delete(workspace_id: string, artifact_id: string): { artifact_id: string; created_at: string; name: string; size_bytes: number; workspace_id: string; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }`\n\n**delete** `/v1/workspaces/{workspace_id}/artifacts/{artifact_id}`\n\nDelete artifact\n\n### Parameters\n\n- `workspace_id: string`\n\n- `artifact_id: string`\n\n### Returns\n\n- `{ artifact_id: string; created_at: string; name: string; size_bytes: number; workspace_id: string; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }`\n\n  - `artifact_id: string`\n  - `created_at: string`\n  - `name: string`\n  - `size_bytes: number`\n  - `workspace_id: string`\n  - `download_url?: string`\n  - `execution_id?: string`\n  - `expires_at?: string`\n  - `mime_type?: string`\n  - `sha256?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst artifact = await client.workspaces.artifacts.delete('artifact_id', { workspace_id: 'workspace_id' });\n\nconsole.log(artifact);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/workspaces/{workspace_id}/previews',
    httpMethod: 'post',
    summary: 'Create preview',
    description: 'Create preview',
    stainlessPath: '(resource) workspaces.previews > (method) create',
    qualified: 'client.workspaces.previews.create',
    params: ['workspace_id: string;', 'port: number;', "protocol?: 'http' | 'https';"],
    response:
      "{ created_at: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }",
    markdown:
      "## create\n\n`client.workspaces.previews.create(workspace_id: string, port: number, protocol?: 'http' | 'https'): { created_at: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n**post** `/v1/workspaces/{workspace_id}/previews`\n\nCreate preview\n\n### Parameters\n\n- `workspace_id: string`\n\n- `port: number`\n\n- `protocol?: 'http' | 'https'`\n\n### Returns\n\n- `{ created_at: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n  - `created_at: string`\n  - `port: number`\n  - `preview_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `workspace_id: string`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'http' | 'https'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst preview = await client.workspaces.previews.create('workspace_id', { port: 0 });\n\nconsole.log(preview);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/workspaces/{workspace_id}/previews/{preview_id}',
    httpMethod: 'get',
    summary: 'Get preview',
    description: 'Get preview',
    stainlessPath: '(resource) workspaces.previews > (method) retrieve',
    qualified: 'client.workspaces.previews.retrieve',
    params: ['workspace_id: string;', 'preview_id: string;'],
    response:
      "{ created_at: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }",
    markdown:
      "## retrieve\n\n`client.workspaces.previews.retrieve(workspace_id: string, preview_id: string): { created_at: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n**get** `/v1/workspaces/{workspace_id}/previews/{preview_id}`\n\nGet preview\n\n### Parameters\n\n- `workspace_id: string`\n\n- `preview_id: string`\n\n### Returns\n\n- `{ created_at: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n  - `created_at: string`\n  - `port: number`\n  - `preview_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `workspace_id: string`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'http' | 'https'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst preview = await client.workspaces.previews.retrieve('preview_id', { workspace_id: 'workspace_id' });\n\nconsole.log(preview);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/workspaces/{workspace_id}/previews',
    httpMethod: 'get',
    summary: 'List previews',
    description: 'List previews',
    stainlessPath: '(resource) workspaces.previews > (method) list',
    qualified: 'client.workspaces.previews.list',
    params: ['workspace_id: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      "{ created_at: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }",
    markdown:
      "## list\n\n`client.workspaces.previews.list(workspace_id: string, cursor?: string, limit?: number): { created_at: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n**get** `/v1/workspaces/{workspace_id}/previews`\n\nList previews\n\n### Parameters\n\n- `workspace_id: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ created_at: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n  - `created_at: string`\n  - `port: number`\n  - `preview_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `workspace_id: string`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'http' | 'https'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const preview of client.workspaces.previews.list('workspace_id')) {\n  console.log(preview);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/workspaces/{workspace_id}/previews/{preview_id}',
    httpMethod: 'delete',
    summary: 'Delete preview',
    description: 'Delete preview',
    stainlessPath: '(resource) workspaces.previews > (method) delete',
    qualified: 'client.workspaces.previews.delete',
    params: ['workspace_id: string;', 'preview_id: string;'],
    response:
      "{ created_at: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }",
    markdown:
      "## delete\n\n`client.workspaces.previews.delete(workspace_id: string, preview_id: string): { created_at: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n**delete** `/v1/workspaces/{workspace_id}/previews/{preview_id}`\n\nDelete preview\n\n### Parameters\n\n- `workspace_id: string`\n\n- `preview_id: string`\n\n### Returns\n\n- `{ created_at: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n  - `created_at: string`\n  - `port: number`\n  - `preview_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `workspace_id: string`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'http' | 'https'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst preview = await client.workspaces.previews.delete('preview_id', { workspace_id: 'workspace_id' });\n\nconsole.log(preview);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/workspaces/{workspace_id}/ssh',
    httpMethod: 'post',
    summary: 'Create SSH session',
    description: 'Create SSH session',
    stainlessPath: '(resource) workspaces.ssh > (method) create',
    qualified: 'client.workspaces.ssh.create',
    params: ['workspace_id: string;', 'public_key: string;'],
    response:
      "{ created_at: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }",
    markdown:
      "## create\n\n`client.workspaces.ssh.create(workspace_id: string, public_key: string): { created_at: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; connection?: ssh_connection; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n**post** `/v1/workspaces/{workspace_id}/ssh`\n\nCreate SSH session\n\n### Parameters\n\n- `workspace_id: string`\n\n- `public_key: string`\n\n### Returns\n\n- `{ created_at: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n  - `created_at: string`\n  - `session_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `workspace_id: string`\n  - `connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: { host_pattern: string; kind: 'cert_authority'; public_key: string; }; user_certificate?: string; }`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst sshSession = await client.workspaces.ssh.create('workspace_id', { public_key: 'public_key' });\n\nconsole.log(sshSession);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/workspaces/{workspace_id}/ssh/{session_id}',
    httpMethod: 'get',
    summary: 'Get SSH session',
    description: 'Get SSH session',
    stainlessPath: '(resource) workspaces.ssh > (method) retrieve',
    qualified: 'client.workspaces.ssh.retrieve',
    params: ['workspace_id: string;', 'session_id: string;'],
    response:
      "{ created_at: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }",
    markdown:
      "## retrieve\n\n`client.workspaces.ssh.retrieve(workspace_id: string, session_id: string): { created_at: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; connection?: ssh_connection; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n**get** `/v1/workspaces/{workspace_id}/ssh/{session_id}`\n\nGet SSH session\n\n### Parameters\n\n- `workspace_id: string`\n\n- `session_id: string`\n\n### Returns\n\n- `{ created_at: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n  - `created_at: string`\n  - `session_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `workspace_id: string`\n  - `connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: { host_pattern: string; kind: 'cert_authority'; public_key: string; }; user_certificate?: string; }`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst sshSession = await client.workspaces.ssh.retrieve('session_id', { workspace_id: 'workspace_id' });\n\nconsole.log(sshSession);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/workspaces/{workspace_id}/ssh',
    httpMethod: 'get',
    summary: 'List SSH sessions',
    description: 'List SSH sessions',
    stainlessPath: '(resource) workspaces.ssh > (method) list',
    qualified: 'client.workspaces.ssh.list',
    params: ['workspace_id: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      "{ created_at: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }",
    markdown:
      "## list\n\n`client.workspaces.ssh.list(workspace_id: string, cursor?: string, limit?: number): { created_at: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; connection?: ssh_connection; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n**get** `/v1/workspaces/{workspace_id}/ssh`\n\nList SSH sessions\n\n### Parameters\n\n- `workspace_id: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ created_at: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n  - `created_at: string`\n  - `session_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `workspace_id: string`\n  - `connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: { host_pattern: string; kind: 'cert_authority'; public_key: string; }; user_certificate?: string; }`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const sshSession of client.workspaces.ssh.list('workspace_id')) {\n  console.log(sshSession);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/workspaces/{workspace_id}/ssh/{session_id}',
    httpMethod: 'delete',
    summary: 'Delete SSH session',
    description: 'Delete SSH session',
    stainlessPath: '(resource) workspaces.ssh > (method) delete',
    qualified: 'client.workspaces.ssh.delete',
    params: ['workspace_id: string;', 'session_id: string;'],
    response:
      "{ created_at: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }",
    markdown:
      "## delete\n\n`client.workspaces.ssh.delete(workspace_id: string, session_id: string): { created_at: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; connection?: ssh_connection; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n**delete** `/v1/workspaces/{workspace_id}/ssh/{session_id}`\n\nDelete SSH session\n\n### Parameters\n\n- `workspace_id: string`\n\n- `session_id: string`\n\n### Returns\n\n- `{ created_at: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; workspace_id: string; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n  - `created_at: string`\n  - `session_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `workspace_id: string`\n  - `connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: { host_pattern: string; kind: 'cert_authority'; public_key: string; }; user_certificate?: string; }`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst sshSession = await client.workspaces.ssh.delete('session_id', { workspace_id: 'workspace_id' });\n\nconsole.log(sshSession);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/workspaces/{workspace_id}/executions',
    httpMethod: 'post',
    summary: 'Create execution',
    description: 'Create execution',
    stainlessPath: '(resource) workspaces.executions > (method) create',
    qualified: 'client.workspaces.executions.create',
    params: [
      'workspace_id: string;',
      'command: string[];',
      'cwd?: string;',
      'env?: object;',
      'stdin?: string;',
      'timeout_ms?: number;',
    ],
    response:
      "{ command: string[]; created_at: string; execution_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; workspace_id: string; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }",
    markdown:
      "## create\n\n`client.workspaces.executions.create(workspace_id: string, command: string[], cwd?: string, env?: object, stdin?: string, timeout_ms?: number): { command: string[]; created_at: string; execution_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; workspace_id: string; artifacts?: artifact_ref[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n**post** `/v1/workspaces/{workspace_id}/executions`\n\nCreate execution\n\n### Parameters\n\n- `workspace_id: string`\n\n- `command: string[]`\n\n- `cwd?: string`\n\n- `env?: object`\n\n- `stdin?: string`\n\n- `timeout_ms?: number`\n\n### Returns\n\n- `{ command: string[]; created_at: string; execution_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; workspace_id: string; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n  - `command: string[]`\n  - `created_at: string`\n  - `execution_id: string`\n  - `status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'`\n  - `workspace_id: string`\n  - `artifacts?: { artifact_id: string; name: string; }[]`\n  - `completed_at?: string`\n  - `cwd?: string`\n  - `env_keys?: string[]`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `exit_code?: number`\n  - `expires_at?: string`\n  - `retry_after_ms?: number`\n  - `signal?: number`\n  - `started_at?: string`\n  - `stderr_bytes?: number`\n  - `stderr_truncated?: boolean`\n  - `stdout_bytes?: number`\n  - `stdout_truncated?: boolean`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst execution = await client.workspaces.executions.create('workspace_id', { command: ['string'] });\n\nconsole.log(execution);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/workspaces/{workspace_id}/executions/{execution_id}',
    httpMethod: 'get',
    summary: 'Get execution',
    description: 'Get execution',
    stainlessPath: '(resource) workspaces.executions > (method) retrieve',
    qualified: 'client.workspaces.executions.retrieve',
    params: ['workspace_id: string;', 'execution_id: string;'],
    response:
      "{ command: string[]; created_at: string; execution_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; workspace_id: string; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }",
    markdown:
      "## retrieve\n\n`client.workspaces.executions.retrieve(workspace_id: string, execution_id: string): { command: string[]; created_at: string; execution_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; workspace_id: string; artifacts?: artifact_ref[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n**get** `/v1/workspaces/{workspace_id}/executions/{execution_id}`\n\nGet execution\n\n### Parameters\n\n- `workspace_id: string`\n\n- `execution_id: string`\n\n### Returns\n\n- `{ command: string[]; created_at: string; execution_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; workspace_id: string; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n  - `command: string[]`\n  - `created_at: string`\n  - `execution_id: string`\n  - `status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'`\n  - `workspace_id: string`\n  - `artifacts?: { artifact_id: string; name: string; }[]`\n  - `completed_at?: string`\n  - `cwd?: string`\n  - `env_keys?: string[]`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `exit_code?: number`\n  - `expires_at?: string`\n  - `retry_after_ms?: number`\n  - `signal?: number`\n  - `started_at?: string`\n  - `stderr_bytes?: number`\n  - `stderr_truncated?: boolean`\n  - `stdout_bytes?: number`\n  - `stdout_truncated?: boolean`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst execution = await client.workspaces.executions.retrieve('execution_id', { workspace_id: 'workspace_id' });\n\nconsole.log(execution);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/workspaces/{workspace_id}/executions',
    httpMethod: 'get',
    summary: 'List executions',
    description: 'List executions',
    stainlessPath: '(resource) workspaces.executions > (method) list',
    qualified: 'client.workspaces.executions.list',
    params: ['workspace_id: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      "{ command: string[]; created_at: string; execution_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; workspace_id: string; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }",
    markdown:
      "## list\n\n`client.workspaces.executions.list(workspace_id: string, cursor?: string, limit?: number): { command: string[]; created_at: string; execution_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; workspace_id: string; artifacts?: artifact_ref[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n**get** `/v1/workspaces/{workspace_id}/executions`\n\nList executions\n\n### Parameters\n\n- `workspace_id: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ command: string[]; created_at: string; execution_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; workspace_id: string; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n  - `command: string[]`\n  - `created_at: string`\n  - `execution_id: string`\n  - `status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'`\n  - `workspace_id: string`\n  - `artifacts?: { artifact_id: string; name: string; }[]`\n  - `completed_at?: string`\n  - `cwd?: string`\n  - `env_keys?: string[]`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `exit_code?: number`\n  - `expires_at?: string`\n  - `retry_after_ms?: number`\n  - `signal?: number`\n  - `started_at?: string`\n  - `stderr_bytes?: number`\n  - `stderr_truncated?: boolean`\n  - `stdout_bytes?: number`\n  - `stdout_truncated?: boolean`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const execution of client.workspaces.executions.list('workspace_id')) {\n  console.log(execution);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/workspaces/{workspace_id}/executions/{execution_id}',
    httpMethod: 'delete',
    summary: 'Delete execution',
    description: 'Delete execution',
    stainlessPath: '(resource) workspaces.executions > (method) delete',
    qualified: 'client.workspaces.executions.delete',
    params: ['workspace_id: string;', 'execution_id: string;'],
    response:
      "{ command: string[]; created_at: string; execution_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; workspace_id: string; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }",
    markdown:
      "## delete\n\n`client.workspaces.executions.delete(workspace_id: string, execution_id: string): { command: string[]; created_at: string; execution_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; workspace_id: string; artifacts?: artifact_ref[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n**delete** `/v1/workspaces/{workspace_id}/executions/{execution_id}`\n\nDelete execution\n\n### Parameters\n\n- `workspace_id: string`\n\n- `execution_id: string`\n\n### Returns\n\n- `{ command: string[]; created_at: string; execution_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; workspace_id: string; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n  - `command: string[]`\n  - `created_at: string`\n  - `execution_id: string`\n  - `status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'`\n  - `workspace_id: string`\n  - `artifacts?: { artifact_id: string; name: string; }[]`\n  - `completed_at?: string`\n  - `cwd?: string`\n  - `env_keys?: string[]`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `exit_code?: number`\n  - `expires_at?: string`\n  - `retry_after_ms?: number`\n  - `signal?: number`\n  - `started_at?: string`\n  - `stderr_bytes?: number`\n  - `stderr_truncated?: boolean`\n  - `stdout_bytes?: number`\n  - `stdout_truncated?: boolean`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst execution = await client.workspaces.executions.delete('execution_id', { workspace_id: 'workspace_id' });\n\nconsole.log(execution);\n```",
  },
  {
    name: 'events',
    endpoint: '/v1/workspaces/{workspace_id}/executions/{execution_id}/events',
    httpMethod: 'get',
    summary: 'List execution events',
    description: 'List execution events',
    stainlessPath: '(resource) workspaces.executions > (method) events',
    qualified: 'client.workspaces.executions.events',
    params: ['workspace_id: string;', 'execution_id: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      "{ at: string; sequence: number; type: 'lifecycle' | 'stdout' | 'stderr'; chunk?: string; error_code?: string; error_message?: string; exit_code?: number; signal?: number; status?: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; }",
    markdown:
      "## events\n\n`client.workspaces.executions.events(workspace_id: string, execution_id: string, cursor?: string, limit?: number): { at: string; sequence: number; type: 'lifecycle' | 'stdout' | 'stderr'; chunk?: string; error_code?: string; error_message?: string; exit_code?: number; signal?: number; status?: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; }`\n\n**get** `/v1/workspaces/{workspace_id}/executions/{execution_id}/events`\n\nList execution events\n\n### Parameters\n\n- `workspace_id: string`\n\n- `execution_id: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ at: string; sequence: number; type: 'lifecycle' | 'stdout' | 'stderr'; chunk?: string; error_code?: string; error_message?: string; exit_code?: number; signal?: number; status?: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; }`\n\n  - `at: string`\n  - `sequence: number`\n  - `type: 'lifecycle' | 'stdout' | 'stderr'`\n  - `chunk?: string`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `exit_code?: number`\n  - `signal?: number`\n  - `status?: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const executionEvent of client.workspaces.executions.events('execution_id', { workspace_id: 'workspace_id' })) {\n  console.log(executionEvent);\n}\n```",
  },
  {
    name: 'output',
    endpoint: '/v1/workspaces/{workspace_id}/executions/{execution_id}/output',
    httpMethod: 'get',
    summary: 'Get execution output',
    description: 'Get execution output',
    stainlessPath: '(resource) workspaces.executions > (method) output',
    qualified: 'client.workspaces.executions.output',
    params: ['workspace_id: string;', 'execution_id: string;'],
    response:
      '{ execution_id: string; stderr?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout?: string; stdout_bytes?: number; stdout_truncated?: boolean; }',
    markdown:
      "## output\n\n`client.workspaces.executions.output(workspace_id: string, execution_id: string): { execution_id: string; stderr?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout?: string; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n**get** `/v1/workspaces/{workspace_id}/executions/{execution_id}/output`\n\nGet execution output\n\n### Parameters\n\n- `workspace_id: string`\n\n- `execution_id: string`\n\n### Returns\n\n- `{ execution_id: string; stderr?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout?: string; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n  - `execution_id: string`\n  - `stderr?: string`\n  - `stderr_bytes?: number`\n  - `stderr_truncated?: boolean`\n  - `stdout?: string`\n  - `stdout_bytes?: number`\n  - `stdout_truncated?: boolean`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst executionOutput = await client.workspaces.executions.output('execution_id', { workspace_id: 'workspace_id' });\n\nconsole.log(executionOutput);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/workspaces/{workspace_id}/terminals',
    httpMethod: 'post',
    summary: 'Create terminal',
    description: 'Create terminal',
    stainlessPath: '(resource) workspaces.terminals > (method) create',
    qualified: 'client.workspaces.terminals.create',
    params: [
      'workspace_id: string;',
      'height: number;',
      'width: number;',
      'cwd?: string;',
      'env?: object;',
      'shell?: string;',
    ],
    response:
      "{ created_at: string; height: number; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }",
    markdown:
      "## create\n\n`client.workspaces.terminals.create(workspace_id: string, height: number, width: number, cwd?: string, env?: object, shell?: string): { created_at: string; height: number; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n**post** `/v1/workspaces/{workspace_id}/terminals`\n\nCreate terminal\n\n### Parameters\n\n- `workspace_id: string`\n\n- `height: number`\n\n- `width: number`\n\n- `cwd?: string`\n\n- `env?: object`\n\n- `shell?: string`\n\n### Returns\n\n- `{ created_at: string; height: number; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n  - `created_at: string`\n  - `height: number`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `terminal_id: string`\n  - `width: number`\n  - `workspace_id: string`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'websocket'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `stream_url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst terminal = await client.workspaces.terminals.create('workspace_id', { height: 0, width: 0 });\n\nconsole.log(terminal);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/workspaces/{workspace_id}/terminals/{terminal_id}',
    httpMethod: 'get',
    summary: 'Get terminal',
    description: 'Get terminal',
    stainlessPath: '(resource) workspaces.terminals > (method) retrieve',
    qualified: 'client.workspaces.terminals.retrieve',
    params: ['workspace_id: string;', 'terminal_id: string;'],
    response:
      "{ created_at: string; height: number; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }",
    markdown:
      "## retrieve\n\n`client.workspaces.terminals.retrieve(workspace_id: string, terminal_id: string): { created_at: string; height: number; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n**get** `/v1/workspaces/{workspace_id}/terminals/{terminal_id}`\n\nGet terminal\n\n### Parameters\n\n- `workspace_id: string`\n\n- `terminal_id: string`\n\n### Returns\n\n- `{ created_at: string; height: number; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n  - `created_at: string`\n  - `height: number`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `terminal_id: string`\n  - `width: number`\n  - `workspace_id: string`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'websocket'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `stream_url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst terminal = await client.workspaces.terminals.retrieve('terminal_id', { workspace_id: 'workspace_id' });\n\nconsole.log(terminal);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/workspaces/{workspace_id}/terminals',
    httpMethod: 'get',
    summary: 'List terminals',
    description: 'List terminals',
    stainlessPath: '(resource) workspaces.terminals > (method) list',
    qualified: 'client.workspaces.terminals.list',
    params: ['workspace_id: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      "{ created_at: string; height: number; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }",
    markdown:
      "## list\n\n`client.workspaces.terminals.list(workspace_id: string, cursor?: string, limit?: number): { created_at: string; height: number; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n**get** `/v1/workspaces/{workspace_id}/terminals`\n\nList terminals\n\n### Parameters\n\n- `workspace_id: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ created_at: string; height: number; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n  - `created_at: string`\n  - `height: number`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `terminal_id: string`\n  - `width: number`\n  - `workspace_id: string`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'websocket'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `stream_url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const terminal of client.workspaces.terminals.list('workspace_id')) {\n  console.log(terminal);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/workspaces/{workspace_id}/terminals/{terminal_id}',
    httpMethod: 'delete',
    summary: 'Delete terminal',
    description: 'Delete terminal',
    stainlessPath: '(resource) workspaces.terminals > (method) delete',
    qualified: 'client.workspaces.terminals.delete',
    params: ['workspace_id: string;', 'terminal_id: string;'],
    response:
      "{ created_at: string; height: number; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }",
    markdown:
      "## delete\n\n`client.workspaces.terminals.delete(workspace_id: string, terminal_id: string): { created_at: string; height: number; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n**delete** `/v1/workspaces/{workspace_id}/terminals/{terminal_id}`\n\nDelete terminal\n\n### Parameters\n\n- `workspace_id: string`\n\n- `terminal_id: string`\n\n### Returns\n\n- `{ created_at: string; height: number; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; workspace_id: string; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n  - `created_at: string`\n  - `height: number`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `terminal_id: string`\n  - `width: number`\n  - `workspace_id: string`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'websocket'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `stream_url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst terminal = await client.workspaces.terminals.delete('terminal_id', { workspace_id: 'workspace_id' });\n\nconsole.log(terminal);\n```",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
    boost: {
      name: 3,
      endpoint: 2,
      summary: 2,
      qualified: 2,
      content: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  // Note: Language is accepted for interface consistency with remote search, but currently has no
  // effect since this local search only supports TypeScript docs.
  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex.search(query).map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          fullResults.push({
            method: m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          this.indexProse(content, file.name);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}
