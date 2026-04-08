// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

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
  perLanguage?: Record<string, PerLanguageData>;
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
    name: 'list',
    endpoint: '/v1/machines',
    httpMethod: 'get',
    summary: 'List machines',
    description: 'List machines',
    stainlessPath: '(resource) machines > (method) list',
    qualified: 'client.machines.list',
    params: ['cursor?: string;', 'limit?: number;'],
    response:
      "{ created_at: string; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }",
    markdown:
      "## list\n\n`client.machines.list(cursor?: string, limit?: number): { created_at: string; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; }`\n\n**get** `/v1/machines`\n\nList machines\n\n### Parameters\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ created_at: string; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }`\n\n  - `created_at: string`\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `machine_id: string`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const machineListItem of client.machines.list()) {\n  console.log(machineListItem);\n}\n```",
    perLanguage: {
      cli: {
        method: 'machines list',
        example: "dedalus machines list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Machines.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Machines.List(context.TODO(), dedalus.MachineListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.list',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.machines.list()\npage = page.items[0]\nprint(page.machine_id)',
      },
      typescript: {
        method: 'client.machines.list',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const machineListItem of client.machines.list()) {\n  console.log(machineListItem.machine_id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/machines',
    httpMethod: 'post',
    summary: 'Create machine',
    description: 'Create machine',
    stainlessPath: '(resource) machines > (method) create',
    qualified: 'client.machines.create',
    params: ['memory_mib: number;', 'storage_gib: number;', 'vcpu: number;'],
    response:
      "{ desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }",
    markdown:
      "## create\n\n`client.machines.create(memory_mib: number, storage_gib: number, vcpu: number): { desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; }`\n\n**post** `/v1/machines`\n\nCreate machine\n\n### Parameters\n\n- `memory_mib: number`\n  Memory in MiB.\n\n- `storage_gib: number`\n  Storage in GiB.\n\n- `vcpu: number`\n  CPU in vCPUs.\n\n### Returns\n\n- `{ desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }`\n\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `machine_id: string`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst machine = await client.machines.create({\n  memory_mib: 0,\n  storage_gib: 0,\n  vcpu: 0,\n});\n\nconsole.log(machine);\n```",
    perLanguage: {
      cli: {
        method: 'machines create',
        example:
          "dedalus machines create \\\n  --api-key 'My API Key' \\\n  --memory-mib 0 \\\n  --storage-gib 0 \\\n  --vcpu 0",
      },
      go: {
        method: 'client.Machines.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmachine, err := client.Machines.New(context.TODO(), dedalus.MachineNewParams{\n\t\tCreateParams: dedalus.CreateParams{\n\t\t\tMemoryMiB:  0,\n\t\t\tStorageGiB: 0,\n\t\t\tVCPU:       0,\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", machine.MachineID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY" \\\n    -d \'{\n          "memory_mib": 0,\n          "storage_gib": 0,\n          "vcpu": 0\n        }\'',
      },
      python: {
        method: 'machines.create',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nmachine = client.machines.create(\n    memory_mib=0,\n    storage_gib=0,\n    vcpu=0,\n)\nprint(machine.machine_id)',
      },
      typescript: {
        method: 'client.machines.create',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst machine = await client.machines.create({\n  memory_mib: 0,\n  storage_gib: 0,\n  vcpu: 0,\n});\n\nconsole.log(machine.machine_id);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/machines/{machine_id}',
    httpMethod: 'get',
    summary: 'Get machine',
    description: 'Get machine',
    stainlessPath: '(resource) machines > (method) retrieve',
    qualified: 'client.machines.retrieve',
    params: ['machine_id: string;'],
    response:
      "{ desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }",
    markdown:
      "## retrieve\n\n`client.machines.retrieve(machine_id: string): { desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; }`\n\n**get** `/v1/machines/{machine_id}`\n\nGet machine\n\n### Parameters\n\n- `machine_id: string`\n\n### Returns\n\n- `{ desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }`\n\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `machine_id: string`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst machine = await client.machines.retrieve({ machine_id: 'machine_id' });\n\nconsole.log(machine);\n```",
    perLanguage: {
      cli: {
        method: 'machines retrieve',
        example: "dedalus machines retrieve \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id",
      },
      go: {
        method: 'client.Machines.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmachine, err := client.Machines.Get(context.TODO(), dedalus.MachineGetParams{\n\t\tMachineID: "machine_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", machine.MachineID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.retrieve',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nmachine = client.machines.retrieve(\n    machine_id="machine_id",\n)\nprint(machine.machine_id)',
      },
      typescript: {
        method: 'client.machines.retrieve',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst machine = await client.machines.retrieve({ machine_id: 'machine_id' });\n\nconsole.log(machine.machine_id);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/machines/{machine_id}',
    httpMethod: 'patch',
    summary: 'Update machine',
    description: 'Update machine',
    stainlessPath: '(resource) machines > (method) update',
    qualified: 'client.machines.update',
    params: [
      'machine_id: string;',
      'If-Match: string;',
      'memory_mib?: number;',
      'storage_gib?: number;',
      'vcpu?: number;',
    ],
    response:
      "{ desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }",
    markdown:
      "## update\n\n`client.machines.update(machine_id: string, If-Match: string, memory_mib?: number, storage_gib?: number, vcpu?: number): { desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; }`\n\n**patch** `/v1/machines/{machine_id}`\n\nUpdate machine\n\n### Parameters\n\n- `machine_id: string`\n\n- `If-Match: string`\n\n- `memory_mib?: number`\n  Memory in MiB.\n\n- `storage_gib?: number`\n  Storage in GiB.\n\n- `vcpu?: number`\n  CPU in vCPUs.\n\n### Returns\n\n- `{ desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }`\n\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `machine_id: string`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst machine = await client.machines.update({ machine_id: 'machine_id', 'If-Match': 'If-Match' });\n\nconsole.log(machine);\n```",
    perLanguage: {
      cli: {
        method: 'machines update',
        example:
          "dedalus machines update \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --if-match If-Match",
      },
      go: {
        method: 'client.Machines.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmachine, err := client.Machines.Update(context.TODO(), dedalus.MachineUpdateParams{\n\t\tMachineID:    "machine_id",\n\t\tUpdateParams: dedalus.UpdateParams{},\n\t\tIfMatch:      "If-Match",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", machine.MachineID)\n}\n',
      },
      http: {
        example:
          "curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $DEDALUS_API_KEY\" \\\n    -d '{}'",
      },
      python: {
        method: 'machines.update',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nmachine = client.machines.update(\n    machine_id="machine_id",\n    if_match="If-Match",\n)\nprint(machine.machine_id)',
      },
      typescript: {
        method: 'client.machines.update',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst machine = await client.machines.update({ machine_id: 'machine_id', 'If-Match': 'If-Match' });\n\nconsole.log(machine.machine_id);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/machines/{machine_id}',
    httpMethod: 'delete',
    summary: 'Destroy machine',
    description: 'Destroy machine',
    stainlessPath: '(resource) machines > (method) delete',
    qualified: 'client.machines.delete',
    params: ['machine_id: string;', 'If-Match: string;'],
    response:
      "{ desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }",
    markdown:
      "## delete\n\n`client.machines.delete(machine_id: string, If-Match: string): { desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; }`\n\n**delete** `/v1/machines/{machine_id}`\n\nDestroy machine\n\n### Parameters\n\n- `machine_id: string`\n\n- `If-Match: string`\n\n### Returns\n\n- `{ desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }`\n\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `machine_id: string`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst machine = await client.machines.delete({ machine_id: 'machine_id', 'If-Match': 'If-Match' });\n\nconsole.log(machine);\n```",
    perLanguage: {
      cli: {
        method: 'machines delete',
        example:
          "dedalus machines delete \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --if-match If-Match",
      },
      go: {
        method: 'client.Machines.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmachine, err := client.Machines.Delete(context.TODO(), dedalus.MachineDeleteParams{\n\t\tMachineID: "machine_id",\n\t\tIfMatch:   "If-Match",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", machine.MachineID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.delete',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nmachine = client.machines.delete(\n    machine_id="machine_id",\n    if_match="If-Match",\n)\nprint(machine.machine_id)',
      },
      typescript: {
        method: 'client.machines.delete',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst machine = await client.machines.delete({ machine_id: 'machine_id', 'If-Match': 'If-Match' });\n\nconsole.log(machine.machine_id);",
      },
    },
  },
  {
    name: 'watch',
    endpoint: '/v1/machines/{machine_id}/status/stream',
    httpMethod: 'get',
    summary: 'Watch machine lifecycle status',
    description:
      'Streams machine lifecycle updates over Server-Sent Events. Each `status` event contains a full `LifecycleResponse` payload. The stream closes after the machine reaches its current desired state.',
    stainlessPath: '(resource) machines > (method) watch',
    qualified: 'client.machines.watch',
    params: ['machine_id: string;', 'Last-Event-ID?: string;'],
    response:
      "{ desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }",
    markdown:
      "## watch\n\n`client.machines.watch(machine_id: string, Last-Event-ID?: string): { desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; }`\n\n**get** `/v1/machines/{machine_id}/status/stream`\n\nStreams machine lifecycle updates over Server-Sent Events. Each `status` event contains a full `LifecycleResponse` payload. The stream closes after the machine reaches its current desired state.\n\n### Parameters\n\n- `machine_id: string`\n\n- `Last-Event-ID?: string`\n\n### Returns\n\n- `{ desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }`\n\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `machine_id: string`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst stream = await client.machines.watch({ machine_id: 'machine_id' });\nfor await (const machine of stream) {\n  console.log(machine);\n}\n```",
    perLanguage: {
      cli: {
        method: 'machines watch',
        example: "dedalus machines watch \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id",
      },
      go: {
        method: 'client.Machines.Watch',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tstream := client.Machines.WatchStreaming(context.TODO(), dedalus.MachineWatchParams{\n\t\tMachineID: "machine_id",\n\t})\n\tfor stream.Next() {\n\t\tfmt.Printf("%+v\\n", stream.Current())\n\t}\n\terr := stream.Err()\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/status/stream \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.watch',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nfor machine in client.machines.watch(\n    machine_id="machine_id",\n):\n  print(machine)',
      },
      typescript: {
        method: 'client.machines.watch',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst machine = await client.machines.watch({ machine_id: 'machine_id' });\n\nconsole.log(machine.machine_id);",
      },
    },
  },
  {
    name: 'sleep',
    endpoint: '/v1/machines/{machine_id}/sleep',
    httpMethod: 'post',
    summary: 'Sleep a running machine',
    description: 'Sleep a running machine',
    stainlessPath: '(resource) machines > (method) sleep',
    qualified: 'client.machines.sleep',
    params: ['machine_id: string;', 'If-Match: string;'],
    response:
      "{ desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }",
    markdown:
      "## sleep\n\n`client.machines.sleep(machine_id: string, If-Match: string): { desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; }`\n\n**post** `/v1/machines/{machine_id}/sleep`\n\nSleep a running machine\n\n### Parameters\n\n- `machine_id: string`\n\n- `If-Match: string`\n\n### Returns\n\n- `{ desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }`\n\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `machine_id: string`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst machine = await client.machines.sleep({ machine_id: 'machine_id', 'If-Match': 'If-Match' });\n\nconsole.log(machine);\n```",
    perLanguage: {
      cli: {
        method: 'machines sleep',
        example:
          "dedalus machines sleep \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --if-match If-Match",
      },
      go: {
        method: 'client.Machines.Sleep',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmachine, err := client.Machines.Sleep(context.TODO(), dedalus.MachineSleepParams{\n\t\tMachineID: "machine_id",\n\t\tIfMatch:   "If-Match",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", machine.MachineID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/sleep \\\n    -X POST \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.sleep',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nmachine = client.machines.sleep(\n    machine_id="machine_id",\n    if_match="If-Match",\n)\nprint(machine.machine_id)',
      },
      typescript: {
        method: 'client.machines.sleep',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst machine = await client.machines.sleep({ machine_id: 'machine_id', 'If-Match': 'If-Match' });\n\nconsole.log(machine.machine_id);",
      },
    },
  },
  {
    name: 'wake',
    endpoint: '/v1/machines/{machine_id}/wake',
    httpMethod: 'post',
    summary: 'Wake a sleeping machine',
    description: 'Wake a sleeping machine',
    stainlessPath: '(resource) machines > (method) wake',
    qualified: 'client.machines.wake',
    params: ['machine_id: string;', 'If-Match: string;'],
    response:
      "{ desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }",
    markdown:
      "## wake\n\n`client.machines.wake(machine_id: string, If-Match: string): { desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; }`\n\n**post** `/v1/machines/{machine_id}/wake`\n\nWake a sleeping machine\n\n### Parameters\n\n- `machine_id: string`\n\n- `If-Match: string`\n\n### Returns\n\n- `{ desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }`\n\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `machine_id: string`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst machine = await client.machines.wake({ machine_id: 'machine_id', 'If-Match': 'If-Match' });\n\nconsole.log(machine);\n```",
    perLanguage: {
      cli: {
        method: 'machines wake',
        example:
          "dedalus machines wake \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --if-match If-Match",
      },
      go: {
        method: 'client.Machines.Wake',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmachine, err := client.Machines.Wake(context.TODO(), dedalus.MachineWakeParams{\n\t\tMachineID: "machine_id",\n\t\tIfMatch:   "If-Match",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", machine.MachineID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/wake \\\n    -X POST \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.wake',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nmachine = client.machines.wake(\n    machine_id="machine_id",\n    if_match="If-Match",\n)\nprint(machine.machine_id)',
      },
      typescript: {
        method: 'client.machines.wake',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst machine = await client.machines.wake({ machine_id: 'machine_id', 'If-Match': 'If-Match' });\n\nconsole.log(machine.machine_id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/machines/{machine_id}/artifacts',
    httpMethod: 'get',
    summary: 'List artifacts',
    description: 'List artifacts',
    stainlessPath: '(resource) machines.artifacts > (method) list',
    qualified: 'client.machines.artifacts.list',
    params: ['machine_id: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      '{ artifact_id: string; created_at: string; machine_id: string; name: string; size_bytes: number; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }',
    markdown:
      "## list\n\n`client.machines.artifacts.list(machine_id: string, cursor?: string, limit?: number): { artifact_id: string; created_at: string; machine_id: string; name: string; size_bytes: number; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }`\n\n**get** `/v1/machines/{machine_id}/artifacts`\n\nList artifacts\n\n### Parameters\n\n- `machine_id: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ artifact_id: string; created_at: string; machine_id: string; name: string; size_bytes: number; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }`\n\n  - `artifact_id: string`\n  - `created_at: string`\n  - `machine_id: string`\n  - `name: string`\n  - `size_bytes: number`\n  - `download_url?: string`\n  - `execution_id?: string`\n  - `expires_at?: string`\n  - `mime_type?: string`\n  - `sha256?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const artifact of client.machines.artifacts.list({ machine_id: 'machine_id' })) {\n  console.log(artifact);\n}\n```",
    perLanguage: {
      cli: {
        method: 'artifacts list',
        example: "dedalus machines:artifacts list \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id",
      },
      go: {
        method: 'client.Machines.Artifacts.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Machines.Artifacts.List(context.TODO(), dedalus.MachineArtifactListParams{\n\t\tMachineID: "machine_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/artifacts \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.artifacts.list',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.machines.artifacts.list(\n    machine_id="machine_id",\n)\npage = page.items[0]\nprint(page.artifact_id)',
      },
      typescript: {
        method: 'client.machines.artifacts.list',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const artifact of client.machines.artifacts.list({ machine_id: 'machine_id' })) {\n  console.log(artifact.artifact_id);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/machines/{machine_id}/artifacts/{artifact_id}',
    httpMethod: 'get',
    summary: 'Get artifact',
    description: 'Get artifact',
    stainlessPath: '(resource) machines.artifacts > (method) retrieve',
    qualified: 'client.machines.artifacts.retrieve',
    params: ['machine_id: string;', 'artifact_id: string;'],
    response:
      '{ artifact_id: string; created_at: string; machine_id: string; name: string; size_bytes: number; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }',
    markdown:
      "## retrieve\n\n`client.machines.artifacts.retrieve(machine_id: string, artifact_id: string): { artifact_id: string; created_at: string; machine_id: string; name: string; size_bytes: number; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }`\n\n**get** `/v1/machines/{machine_id}/artifacts/{artifact_id}`\n\nGet artifact\n\n### Parameters\n\n- `machine_id: string`\n\n- `artifact_id: string`\n\n### Returns\n\n- `{ artifact_id: string; created_at: string; machine_id: string; name: string; size_bytes: number; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }`\n\n  - `artifact_id: string`\n  - `created_at: string`\n  - `machine_id: string`\n  - `name: string`\n  - `size_bytes: number`\n  - `download_url?: string`\n  - `execution_id?: string`\n  - `expires_at?: string`\n  - `mime_type?: string`\n  - `sha256?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst artifact = await client.machines.artifacts.retrieve({ machine_id: 'machine_id', artifact_id: 'artifact_id' });\n\nconsole.log(artifact);\n```",
    perLanguage: {
      cli: {
        method: 'artifacts retrieve',
        example:
          "dedalus machines:artifacts retrieve \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --artifact-id artifact_id",
      },
      go: {
        method: 'client.Machines.Artifacts.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tartifact, err := client.Machines.Artifacts.Get(context.TODO(), dedalus.MachineArtifactGetParams{\n\t\tMachineID:  "machine_id",\n\t\tArtifactID: "artifact_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", artifact.ArtifactID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/artifacts/$ARTIFACT_ID \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.artifacts.retrieve',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nartifact = client.machines.artifacts.retrieve(\n    machine_id="machine_id",\n    artifact_id="artifact_id",\n)\nprint(artifact.artifact_id)',
      },
      typescript: {
        method: 'client.machines.artifacts.retrieve',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst artifact = await client.machines.artifacts.retrieve({\n  machine_id: 'machine_id',\n  artifact_id: 'artifact_id',\n});\n\nconsole.log(artifact.artifact_id);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/machines/{machine_id}/artifacts/{artifact_id}',
    httpMethod: 'delete',
    summary: 'Delete artifact',
    description: 'Delete artifact',
    stainlessPath: '(resource) machines.artifacts > (method) delete',
    qualified: 'client.machines.artifacts.delete',
    params: ['machine_id: string;', 'artifact_id: string;'],
    response:
      '{ artifact_id: string; created_at: string; machine_id: string; name: string; size_bytes: number; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }',
    markdown:
      "## delete\n\n`client.machines.artifacts.delete(machine_id: string, artifact_id: string): { artifact_id: string; created_at: string; machine_id: string; name: string; size_bytes: number; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }`\n\n**delete** `/v1/machines/{machine_id}/artifacts/{artifact_id}`\n\nDelete artifact\n\n### Parameters\n\n- `machine_id: string`\n\n- `artifact_id: string`\n\n### Returns\n\n- `{ artifact_id: string; created_at: string; machine_id: string; name: string; size_bytes: number; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }`\n\n  - `artifact_id: string`\n  - `created_at: string`\n  - `machine_id: string`\n  - `name: string`\n  - `size_bytes: number`\n  - `download_url?: string`\n  - `execution_id?: string`\n  - `expires_at?: string`\n  - `mime_type?: string`\n  - `sha256?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst artifact = await client.machines.artifacts.delete({ machine_id: 'machine_id', artifact_id: 'artifact_id' });\n\nconsole.log(artifact);\n```",
    perLanguage: {
      cli: {
        method: 'artifacts delete',
        example:
          "dedalus machines:artifacts delete \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --artifact-id artifact_id",
      },
      go: {
        method: 'client.Machines.Artifacts.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tartifact, err := client.Machines.Artifacts.Delete(context.TODO(), dedalus.MachineArtifactDeleteParams{\n\t\tMachineID:  "machine_id",\n\t\tArtifactID: "artifact_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", artifact.ArtifactID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/artifacts/$ARTIFACT_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.artifacts.delete',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nartifact = client.machines.artifacts.delete(\n    machine_id="machine_id",\n    artifact_id="artifact_id",\n)\nprint(artifact.artifact_id)',
      },
      typescript: {
        method: 'client.machines.artifacts.delete',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst artifact = await client.machines.artifacts.delete({\n  machine_id: 'machine_id',\n  artifact_id: 'artifact_id',\n});\n\nconsole.log(artifact.artifact_id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/machines/{machine_id}/previews',
    httpMethod: 'get',
    summary: 'List previews',
    description: 'List previews',
    stainlessPath: '(resource) machines.previews > (method) list',
    qualified: 'client.machines.previews.list',
    params: ['machine_id: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      "{ created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }",
    markdown:
      "## list\n\n`client.machines.previews.list(machine_id: string, cursor?: string, limit?: number): { created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n**get** `/v1/machines/{machine_id}/previews`\n\nList previews\n\n### Parameters\n\n- `machine_id: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n  - `created_at: string`\n  - `machine_id: string`\n  - `port: number`\n  - `preview_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `visibility: 'public' | 'private' | 'org'`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'http' | 'https'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const preview of client.machines.previews.list({ machine_id: 'machine_id' })) {\n  console.log(preview);\n}\n```",
    perLanguage: {
      cli: {
        method: 'previews list',
        example: "dedalus machines:previews list \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id",
      },
      go: {
        method: 'client.Machines.Previews.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Machines.Previews.List(context.TODO(), dedalus.MachinePreviewListParams{\n\t\tMachineID: "machine_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/previews \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.previews.list',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.machines.previews.list(\n    machine_id="machine_id",\n)\npage = page.items[0]\nprint(page.machine_id)',
      },
      typescript: {
        method: 'client.machines.previews.list',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const preview of client.machines.previews.list({ machine_id: 'machine_id' })) {\n  console.log(preview.machine_id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/machines/{machine_id}/previews',
    httpMethod: 'post',
    summary: 'Create preview',
    description: 'Create preview',
    stainlessPath: '(resource) machines.previews > (method) create',
    qualified: 'client.machines.previews.create',
    params: [
      'machine_id: string;',
      'port: number;',
      "protocol?: 'http' | 'https';",
      "visibility?: 'public' | 'private' | 'org';",
    ],
    response:
      "{ created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }",
    markdown:
      "## create\n\n`client.machines.previews.create(machine_id: string, port: number, protocol?: 'http' | 'https', visibility?: 'public' | 'private' | 'org'): { created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n**post** `/v1/machines/{machine_id}/previews`\n\nCreate preview\n\n### Parameters\n\n- `machine_id: string`\n\n- `port: number`\n\n- `protocol?: 'http' | 'https'`\n\n- `visibility?: 'public' | 'private' | 'org'`\n\n### Returns\n\n- `{ created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n  - `created_at: string`\n  - `machine_id: string`\n  - `port: number`\n  - `preview_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `visibility: 'public' | 'private' | 'org'`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'http' | 'https'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst preview = await client.machines.previews.create({ machine_id: 'machine_id', port: 0 });\n\nconsole.log(preview);\n```",
    perLanguage: {
      cli: {
        method: 'previews create',
        example:
          "dedalus machines:previews create \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --port 0",
      },
      go: {
        method: 'client.Machines.Previews.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpreview, err := client.Machines.Previews.New(context.TODO(), dedalus.MachinePreviewNewParams{\n\t\tMachineID: "machine_id",\n\t\tPreviewCreateParams: dedalus.PreviewCreateParams{\n\t\t\tPort: 0,\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", preview.PreviewID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/previews \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY" \\\n    -d \'{\n          "port": 0\n        }\'',
      },
      python: {
        method: 'machines.previews.create',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npreview = client.machines.previews.create(\n    machine_id="machine_id",\n    port=0,\n)\nprint(preview.preview_id)',
      },
      typescript: {
        method: 'client.machines.previews.create',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst preview = await client.machines.previews.create({ machine_id: 'machine_id', port: 0 });\n\nconsole.log(preview.preview_id);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/machines/{machine_id}/previews/{preview_id}',
    httpMethod: 'get',
    summary: 'Get preview',
    description: 'Get preview',
    stainlessPath: '(resource) machines.previews > (method) retrieve',
    qualified: 'client.machines.previews.retrieve',
    params: ['machine_id: string;', 'preview_id: string;'],
    response:
      "{ created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }",
    markdown:
      "## retrieve\n\n`client.machines.previews.retrieve(machine_id: string, preview_id: string): { created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n**get** `/v1/machines/{machine_id}/previews/{preview_id}`\n\nGet preview\n\n### Parameters\n\n- `machine_id: string`\n\n- `preview_id: string`\n\n### Returns\n\n- `{ created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n  - `created_at: string`\n  - `machine_id: string`\n  - `port: number`\n  - `preview_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `visibility: 'public' | 'private' | 'org'`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'http' | 'https'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst preview = await client.machines.previews.retrieve({ machine_id: 'machine_id', preview_id: 'preview_id' });\n\nconsole.log(preview);\n```",
    perLanguage: {
      cli: {
        method: 'previews retrieve',
        example:
          "dedalus machines:previews retrieve \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --preview-id preview_id",
      },
      go: {
        method: 'client.Machines.Previews.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpreview, err := client.Machines.Previews.Get(context.TODO(), dedalus.MachinePreviewGetParams{\n\t\tMachineID: "machine_id",\n\t\tPreviewID: "preview_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", preview.PreviewID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/previews/$PREVIEW_ID \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.previews.retrieve',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npreview = client.machines.previews.retrieve(\n    machine_id="machine_id",\n    preview_id="preview_id",\n)\nprint(preview.preview_id)',
      },
      typescript: {
        method: 'client.machines.previews.retrieve',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst preview = await client.machines.previews.retrieve({\n  machine_id: 'machine_id',\n  preview_id: 'preview_id',\n});\n\nconsole.log(preview.preview_id);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/machines/{machine_id}/previews/{preview_id}',
    httpMethod: 'delete',
    summary: 'Delete preview',
    description: 'Delete preview',
    stainlessPath: '(resource) machines.previews > (method) delete',
    qualified: 'client.machines.previews.delete',
    params: ['machine_id: string;', 'preview_id: string;'],
    response:
      "{ created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }",
    markdown:
      "## delete\n\n`client.machines.previews.delete(machine_id: string, preview_id: string): { created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n**delete** `/v1/machines/{machine_id}/previews/{preview_id}`\n\nDelete preview\n\n### Parameters\n\n- `machine_id: string`\n\n- `preview_id: string`\n\n### Returns\n\n- `{ created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n  - `created_at: string`\n  - `machine_id: string`\n  - `port: number`\n  - `preview_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `visibility: 'public' | 'private' | 'org'`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'http' | 'https'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst preview = await client.machines.previews.delete({ machine_id: 'machine_id', preview_id: 'preview_id' });\n\nconsole.log(preview);\n```",
    perLanguage: {
      cli: {
        method: 'previews delete',
        example:
          "dedalus machines:previews delete \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --preview-id preview_id",
      },
      go: {
        method: 'client.Machines.Previews.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpreview, err := client.Machines.Previews.Delete(context.TODO(), dedalus.MachinePreviewDeleteParams{\n\t\tMachineID: "machine_id",\n\t\tPreviewID: "preview_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", preview.PreviewID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/previews/$PREVIEW_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.previews.delete',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npreview = client.machines.previews.delete(\n    machine_id="machine_id",\n    preview_id="preview_id",\n)\nprint(preview.preview_id)',
      },
      typescript: {
        method: 'client.machines.previews.delete',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst preview = await client.machines.previews.delete({\n  machine_id: 'machine_id',\n  preview_id: 'preview_id',\n});\n\nconsole.log(preview.preview_id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/machines/{machine_id}/ssh',
    httpMethod: 'get',
    summary: 'List SSH sessions',
    description: 'List SSH sessions',
    stainlessPath: '(resource) machines.ssh > (method) list',
    qualified: 'client.machines.ssh.list',
    params: ['machine_id: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      "{ created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }",
    markdown:
      "## list\n\n`client.machines.ssh.list(machine_id: string, cursor?: string, limit?: number): { created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: ssh_connection; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n**get** `/v1/machines/{machine_id}/ssh`\n\nList SSH sessions\n\n### Parameters\n\n- `machine_id: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n  - `created_at: string`\n  - `machine_id: string`\n  - `session_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: { host_pattern: string; kind: 'cert_authority'; public_key: string; }; user_certificate?: string; }`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const sshSession of client.machines.ssh.list({ machine_id: 'machine_id' })) {\n  console.log(sshSession);\n}\n```",
    perLanguage: {
      cli: {
        method: 'ssh list',
        example: "dedalus machines:ssh list \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id",
      },
      go: {
        method: 'client.Machines.SSH.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Machines.SSH.List(context.TODO(), dedalus.MachineSSHListParams{\n\t\tMachineID: "machine_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/ssh \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.ssh.list',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.machines.ssh.list(\n    machine_id="machine_id",\n)\npage = page.items[0]\nprint(page.machine_id)',
      },
      typescript: {
        method: 'client.machines.ssh.list',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const sshSession of client.machines.ssh.list({ machine_id: 'machine_id' })) {\n  console.log(sshSession.machine_id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/machines/{machine_id}/ssh',
    httpMethod: 'post',
    summary: 'Create SSH session',
    description: 'Create SSH session',
    stainlessPath: '(resource) machines.ssh > (method) create',
    qualified: 'client.machines.ssh.create',
    params: ['machine_id: string;', 'public_key: string;'],
    response:
      "{ created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }",
    markdown:
      "## create\n\n`client.machines.ssh.create(machine_id: string, public_key: string): { created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: ssh_connection; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n**post** `/v1/machines/{machine_id}/ssh`\n\nCreate SSH session\n\n### Parameters\n\n- `machine_id: string`\n\n- `public_key: string`\n\n### Returns\n\n- `{ created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n  - `created_at: string`\n  - `machine_id: string`\n  - `session_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: { host_pattern: string; kind: 'cert_authority'; public_key: string; }; user_certificate?: string; }`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst sshSession = await client.machines.ssh.create({ machine_id: 'machine_id', public_key: 'public_key' });\n\nconsole.log(sshSession);\n```",
    perLanguage: {
      cli: {
        method: 'ssh create',
        example:
          "dedalus machines:ssh create \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --public-key public_key",
      },
      go: {
        method: 'client.Machines.SSH.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsshSession, err := client.Machines.SSH.New(context.TODO(), dedalus.MachineSSHNewParams{\n\t\tMachineID: "machine_id",\n\t\tSSHSessionCreateParams: dedalus.SSHSessionCreateParams{\n\t\t\tPublicKey: "public_key",\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", sshSession.SessionID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/ssh \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY" \\\n    -d \'{\n          "public_key": "public_key"\n        }\'',
      },
      python: {
        method: 'machines.ssh.create',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nssh_session = client.machines.ssh.create(\n    machine_id="machine_id",\n    public_key="public_key",\n)\nprint(ssh_session.session_id)',
      },
      typescript: {
        method: 'client.machines.ssh.create',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst sshSession = await client.machines.ssh.create({\n  machine_id: 'machine_id',\n  public_key: 'public_key',\n});\n\nconsole.log(sshSession.session_id);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/machines/{machine_id}/ssh/{session_id}',
    httpMethod: 'get',
    summary: 'Get SSH session',
    description: 'Get SSH session',
    stainlessPath: '(resource) machines.ssh > (method) retrieve',
    qualified: 'client.machines.ssh.retrieve',
    params: ['machine_id: string;', 'session_id: string;'],
    response:
      "{ created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }",
    markdown:
      "## retrieve\n\n`client.machines.ssh.retrieve(machine_id: string, session_id: string): { created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: ssh_connection; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n**get** `/v1/machines/{machine_id}/ssh/{session_id}`\n\nGet SSH session\n\n### Parameters\n\n- `machine_id: string`\n\n- `session_id: string`\n\n### Returns\n\n- `{ created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n  - `created_at: string`\n  - `machine_id: string`\n  - `session_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: { host_pattern: string; kind: 'cert_authority'; public_key: string; }; user_certificate?: string; }`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst sshSession = await client.machines.ssh.retrieve({ machine_id: 'machine_id', session_id: 'session_id' });\n\nconsole.log(sshSession);\n```",
    perLanguage: {
      cli: {
        method: 'ssh retrieve',
        example:
          "dedalus machines:ssh retrieve \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --session-id session_id",
      },
      go: {
        method: 'client.Machines.SSH.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsshSession, err := client.Machines.SSH.Get(context.TODO(), dedalus.MachineSSHGetParams{\n\t\tMachineID: "machine_id",\n\t\tSessionID: "session_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", sshSession.SessionID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/ssh/$SESSION_ID \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.ssh.retrieve',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nssh_session = client.machines.ssh.retrieve(\n    machine_id="machine_id",\n    session_id="session_id",\n)\nprint(ssh_session.session_id)',
      },
      typescript: {
        method: 'client.machines.ssh.retrieve',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst sshSession = await client.machines.ssh.retrieve({\n  machine_id: 'machine_id',\n  session_id: 'session_id',\n});\n\nconsole.log(sshSession.session_id);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/machines/{machine_id}/ssh/{session_id}',
    httpMethod: 'delete',
    summary: 'Delete SSH session',
    description: 'Delete SSH session',
    stainlessPath: '(resource) machines.ssh > (method) delete',
    qualified: 'client.machines.ssh.delete',
    params: ['machine_id: string;', 'session_id: string;'],
    response:
      "{ created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }",
    markdown:
      "## delete\n\n`client.machines.ssh.delete(machine_id: string, session_id: string): { created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: ssh_connection; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n**delete** `/v1/machines/{machine_id}/ssh/{session_id}`\n\nDelete SSH session\n\n### Parameters\n\n- `machine_id: string`\n\n- `session_id: string`\n\n### Returns\n\n- `{ created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n  - `created_at: string`\n  - `machine_id: string`\n  - `session_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: { host_pattern: string; kind: 'cert_authority'; public_key: string; }; user_certificate?: string; }`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst sshSession = await client.machines.ssh.delete({ machine_id: 'machine_id', session_id: 'session_id' });\n\nconsole.log(sshSession);\n```",
    perLanguage: {
      cli: {
        method: 'ssh delete',
        example:
          "dedalus machines:ssh delete \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --session-id session_id",
      },
      go: {
        method: 'client.Machines.SSH.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsshSession, err := client.Machines.SSH.Delete(context.TODO(), dedalus.MachineSSHDeleteParams{\n\t\tMachineID: "machine_id",\n\t\tSessionID: "session_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", sshSession.SessionID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/ssh/$SESSION_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.ssh.delete',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nssh_session = client.machines.ssh.delete(\n    machine_id="machine_id",\n    session_id="session_id",\n)\nprint(ssh_session.session_id)',
      },
      typescript: {
        method: 'client.machines.ssh.delete',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst sshSession = await client.machines.ssh.delete({\n  machine_id: 'machine_id',\n  session_id: 'session_id',\n});\n\nconsole.log(sshSession.session_id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/machines/{machine_id}/executions',
    httpMethod: 'get',
    summary: 'List executions',
    description: 'List executions',
    stainlessPath: '(resource) machines.executions > (method) list',
    qualified: 'client.machines.executions.list',
    params: ['machine_id: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      "{ command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }",
    markdown:
      "## list\n\n`client.machines.executions.list(machine_id: string, cursor?: string, limit?: number): { command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: artifact_ref[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n**get** `/v1/machines/{machine_id}/executions`\n\nList executions\n\n### Parameters\n\n- `machine_id: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n  - `command: string[]`\n  - `created_at: string`\n  - `execution_id: string`\n  - `machine_id: string`\n  - `status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'`\n  - `artifacts?: { artifact_id: string; name: string; }[]`\n  - `completed_at?: string`\n  - `cwd?: string`\n  - `env_keys?: string[]`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `exit_code?: number`\n  - `expires_at?: string`\n  - `retry_after_ms?: number`\n  - `signal?: number`\n  - `started_at?: string`\n  - `stderr_bytes?: number`\n  - `stderr_truncated?: boolean`\n  - `stdout_bytes?: number`\n  - `stdout_truncated?: boolean`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const execution of client.machines.executions.list({ machine_id: 'machine_id' })) {\n  console.log(execution);\n}\n```",
    perLanguage: {
      cli: {
        method: 'executions list',
        example:
          "dedalus machines:executions list \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id",
      },
      go: {
        method: 'client.Machines.Executions.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Machines.Executions.List(context.TODO(), dedalus.MachineExecutionListParams{\n\t\tMachineID: "machine_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/executions \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.executions.list',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.machines.executions.list(\n    machine_id="machine_id",\n)\npage = page.items[0]\nprint(page.execution_id)',
      },
      typescript: {
        method: 'client.machines.executions.list',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const execution of client.machines.executions.list({ machine_id: 'machine_id' })) {\n  console.log(execution.execution_id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/machines/{machine_id}/executions',
    httpMethod: 'post',
    summary: 'Create execution',
    description: 'Create execution',
    stainlessPath: '(resource) machines.executions > (method) create',
    qualified: 'client.machines.executions.create',
    params: [
      'machine_id: string;',
      'command: string[];',
      'cwd?: string;',
      'env?: object;',
      'stdin?: string;',
      'timeout_ms?: number;',
    ],
    response:
      "{ command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }",
    markdown:
      "## create\n\n`client.machines.executions.create(machine_id: string, command: string[], cwd?: string, env?: object, stdin?: string, timeout_ms?: number): { command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: artifact_ref[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n**post** `/v1/machines/{machine_id}/executions`\n\nCreate execution\n\n### Parameters\n\n- `machine_id: string`\n\n- `command: string[]`\n\n- `cwd?: string`\n\n- `env?: object`\n\n- `stdin?: string`\n\n- `timeout_ms?: number`\n\n### Returns\n\n- `{ command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n  - `command: string[]`\n  - `created_at: string`\n  - `execution_id: string`\n  - `machine_id: string`\n  - `status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'`\n  - `artifacts?: { artifact_id: string; name: string; }[]`\n  - `completed_at?: string`\n  - `cwd?: string`\n  - `env_keys?: string[]`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `exit_code?: number`\n  - `expires_at?: string`\n  - `retry_after_ms?: number`\n  - `signal?: number`\n  - `started_at?: string`\n  - `stderr_bytes?: number`\n  - `stderr_truncated?: boolean`\n  - `stdout_bytes?: number`\n  - `stdout_truncated?: boolean`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst execution = await client.machines.executions.create({ machine_id: 'machine_id', command: ['string'] });\n\nconsole.log(execution);\n```",
    perLanguage: {
      cli: {
        method: 'executions create',
        example:
          "dedalus machines:executions create \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --command string",
      },
      go: {
        method: 'client.Machines.Executions.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\texecution, err := client.Machines.Executions.New(context.TODO(), dedalus.MachineExecutionNewParams{\n\t\tMachineID: "machine_id",\n\t\tExecutionCreateParams: dedalus.ExecutionCreateParams{\n\t\t\tCommand: []string{"string"},\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", execution.ExecutionID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/executions \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY" \\\n    -d \'{\n          "command": [\n            "string"\n          ]\n        }\'',
      },
      python: {
        method: 'machines.executions.create',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nexecution = client.machines.executions.create(\n    machine_id="machine_id",\n    command=["string"],\n)\nprint(execution.execution_id)',
      },
      typescript: {
        method: 'client.machines.executions.create',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst execution = await client.machines.executions.create({\n  machine_id: 'machine_id',\n  command: ['string'],\n});\n\nconsole.log(execution.execution_id);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/machines/{machine_id}/executions/{execution_id}',
    httpMethod: 'get',
    summary: 'Get execution',
    description: 'Get execution',
    stainlessPath: '(resource) machines.executions > (method) retrieve',
    qualified: 'client.machines.executions.retrieve',
    params: ['machine_id: string;', 'execution_id: string;'],
    response:
      "{ command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }",
    markdown:
      "## retrieve\n\n`client.machines.executions.retrieve(machine_id: string, execution_id: string): { command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: artifact_ref[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n**get** `/v1/machines/{machine_id}/executions/{execution_id}`\n\nGet execution\n\n### Parameters\n\n- `machine_id: string`\n\n- `execution_id: string`\n\n### Returns\n\n- `{ command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n  - `command: string[]`\n  - `created_at: string`\n  - `execution_id: string`\n  - `machine_id: string`\n  - `status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'`\n  - `artifacts?: { artifact_id: string; name: string; }[]`\n  - `completed_at?: string`\n  - `cwd?: string`\n  - `env_keys?: string[]`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `exit_code?: number`\n  - `expires_at?: string`\n  - `retry_after_ms?: number`\n  - `signal?: number`\n  - `started_at?: string`\n  - `stderr_bytes?: number`\n  - `stderr_truncated?: boolean`\n  - `stdout_bytes?: number`\n  - `stdout_truncated?: boolean`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst execution = await client.machines.executions.retrieve({ machine_id: 'machine_id', execution_id: 'execution_id' });\n\nconsole.log(execution);\n```",
    perLanguage: {
      cli: {
        method: 'executions retrieve',
        example:
          "dedalus machines:executions retrieve \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --execution-id execution_id",
      },
      go: {
        method: 'client.Machines.Executions.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\texecution, err := client.Machines.Executions.Get(context.TODO(), dedalus.MachineExecutionGetParams{\n\t\tMachineID:   "machine_id",\n\t\tExecutionID: "execution_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", execution.ExecutionID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/executions/$EXECUTION_ID \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.executions.retrieve',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nexecution = client.machines.executions.retrieve(\n    machine_id="machine_id",\n    execution_id="execution_id",\n)\nprint(execution.execution_id)',
      },
      typescript: {
        method: 'client.machines.executions.retrieve',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst execution = await client.machines.executions.retrieve({\n  machine_id: 'machine_id',\n  execution_id: 'execution_id',\n});\n\nconsole.log(execution.execution_id);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/machines/{machine_id}/executions/{execution_id}',
    httpMethod: 'delete',
    summary: 'Delete execution',
    description: 'Delete execution',
    stainlessPath: '(resource) machines.executions > (method) delete',
    qualified: 'client.machines.executions.delete',
    params: ['machine_id: string;', 'execution_id: string;'],
    response:
      "{ command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }",
    markdown:
      "## delete\n\n`client.machines.executions.delete(machine_id: string, execution_id: string): { command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: artifact_ref[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n**delete** `/v1/machines/{machine_id}/executions/{execution_id}`\n\nDelete execution\n\n### Parameters\n\n- `machine_id: string`\n\n- `execution_id: string`\n\n### Returns\n\n- `{ command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n  - `command: string[]`\n  - `created_at: string`\n  - `execution_id: string`\n  - `machine_id: string`\n  - `status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'`\n  - `artifacts?: { artifact_id: string; name: string; }[]`\n  - `completed_at?: string`\n  - `cwd?: string`\n  - `env_keys?: string[]`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `exit_code?: number`\n  - `expires_at?: string`\n  - `retry_after_ms?: number`\n  - `signal?: number`\n  - `started_at?: string`\n  - `stderr_bytes?: number`\n  - `stderr_truncated?: boolean`\n  - `stdout_bytes?: number`\n  - `stdout_truncated?: boolean`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst execution = await client.machines.executions.delete({ machine_id: 'machine_id', execution_id: 'execution_id' });\n\nconsole.log(execution);\n```",
    perLanguage: {
      cli: {
        method: 'executions delete',
        example:
          "dedalus machines:executions delete \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --execution-id execution_id",
      },
      go: {
        method: 'client.Machines.Executions.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\texecution, err := client.Machines.Executions.Delete(context.TODO(), dedalus.MachineExecutionDeleteParams{\n\t\tMachineID:   "machine_id",\n\t\tExecutionID: "execution_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", execution.ExecutionID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/executions/$EXECUTION_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.executions.delete',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nexecution = client.machines.executions.delete(\n    machine_id="machine_id",\n    execution_id="execution_id",\n)\nprint(execution.execution_id)',
      },
      typescript: {
        method: 'client.machines.executions.delete',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst execution = await client.machines.executions.delete({\n  machine_id: 'machine_id',\n  execution_id: 'execution_id',\n});\n\nconsole.log(execution.execution_id);",
      },
    },
  },
  {
    name: 'output',
    endpoint: '/v1/machines/{machine_id}/executions/{execution_id}/output',
    httpMethod: 'get',
    summary: 'Get execution output',
    description: 'Get execution output',
    stainlessPath: '(resource) machines.executions > (method) output',
    qualified: 'client.machines.executions.output',
    params: ['machine_id: string;', 'execution_id: string;'],
    response:
      '{ execution_id: string; stderr?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout?: string; stdout_bytes?: number; stdout_truncated?: boolean; }',
    markdown:
      "## output\n\n`client.machines.executions.output(machine_id: string, execution_id: string): { execution_id: string; stderr?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout?: string; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n**get** `/v1/machines/{machine_id}/executions/{execution_id}/output`\n\nGet execution output\n\n### Parameters\n\n- `machine_id: string`\n\n- `execution_id: string`\n\n### Returns\n\n- `{ execution_id: string; stderr?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout?: string; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n  - `execution_id: string`\n  - `stderr?: string`\n  - `stderr_bytes?: number`\n  - `stderr_truncated?: boolean`\n  - `stdout?: string`\n  - `stdout_bytes?: number`\n  - `stdout_truncated?: boolean`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst executionOutput = await client.machines.executions.output({ machine_id: 'machine_id', execution_id: 'execution_id' });\n\nconsole.log(executionOutput);\n```",
    perLanguage: {
      cli: {
        method: 'executions output',
        example:
          "dedalus machines:executions output \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --execution-id execution_id",
      },
      go: {
        method: 'client.Machines.Executions.Output',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\texecutionOutput, err := client.Machines.Executions.Output(context.TODO(), dedalus.MachineExecutionOutputParams{\n\t\tMachineID:   "machine_id",\n\t\tExecutionID: "execution_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", executionOutput.ExecutionID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/executions/$EXECUTION_ID/output \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.executions.output',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nexecution_output = client.machines.executions.output(\n    machine_id="machine_id",\n    execution_id="execution_id",\n)\nprint(execution_output.execution_id)',
      },
      typescript: {
        method: 'client.machines.executions.output',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst executionOutput = await client.machines.executions.output({\n  machine_id: 'machine_id',\n  execution_id: 'execution_id',\n});\n\nconsole.log(executionOutput.execution_id);",
      },
    },
  },
  {
    name: 'events',
    endpoint: '/v1/machines/{machine_id}/executions/{execution_id}/events',
    httpMethod: 'get',
    summary: 'List execution events',
    description: 'List execution events',
    stainlessPath: '(resource) machines.executions > (method) events',
    qualified: 'client.machines.executions.events',
    params: ['machine_id: string;', 'execution_id: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      "{ at: string; sequence: number; type: 'lifecycle' | 'stdout' | 'stderr'; chunk?: string; error_code?: string; error_message?: string; exit_code?: number; signal?: number; status?: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; }",
    markdown:
      "## events\n\n`client.machines.executions.events(machine_id: string, execution_id: string, cursor?: string, limit?: number): { at: string; sequence: number; type: 'lifecycle' | 'stdout' | 'stderr'; chunk?: string; error_code?: string; error_message?: string; exit_code?: number; signal?: number; status?: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; }`\n\n**get** `/v1/machines/{machine_id}/executions/{execution_id}/events`\n\nList execution events\n\n### Parameters\n\n- `machine_id: string`\n\n- `execution_id: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ at: string; sequence: number; type: 'lifecycle' | 'stdout' | 'stderr'; chunk?: string; error_code?: string; error_message?: string; exit_code?: number; signal?: number; status?: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; }`\n\n  - `at: string`\n  - `sequence: number`\n  - `type: 'lifecycle' | 'stdout' | 'stderr'`\n  - `chunk?: string`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `exit_code?: number`\n  - `signal?: number`\n  - `status?: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const executionEvent of client.machines.executions.events({ machine_id: 'machine_id', execution_id: 'execution_id' })) {\n  console.log(executionEvent);\n}\n```",
    perLanguage: {
      cli: {
        method: 'executions events',
        example:
          "dedalus machines:executions events \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --execution-id execution_id",
      },
      go: {
        method: 'client.Machines.Executions.Events',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Machines.Executions.Events(context.TODO(), dedalus.MachineExecutionEventsParams{\n\t\tMachineID:   "machine_id",\n\t\tExecutionID: "execution_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/executions/$EXECUTION_ID/events \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.executions.events',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.machines.executions.events(\n    machine_id="machine_id",\n    execution_id="execution_id",\n)\npage = page.items[0]\nprint(page.at)',
      },
      typescript: {
        method: 'client.machines.executions.events',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const executionEvent of client.machines.executions.events({\n  machine_id: 'machine_id',\n  execution_id: 'execution_id',\n})) {\n  console.log(executionEvent.at);\n}",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/machines/{machine_id}/terminals',
    httpMethod: 'get',
    summary: 'List terminals',
    description: 'List terminals',
    stainlessPath: '(resource) machines.terminals > (method) list',
    qualified: 'client.machines.terminals.list',
    params: ['machine_id: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      "{ created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }",
    markdown:
      "## list\n\n`client.machines.terminals.list(machine_id: string, cursor?: string, limit?: number): { created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n**get** `/v1/machines/{machine_id}/terminals`\n\nList terminals\n\n### Parameters\n\n- `machine_id: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n  - `created_at: string`\n  - `height: number`\n  - `machine_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `terminal_id: string`\n  - `width: number`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'websocket'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `stream_url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const terminal of client.machines.terminals.list({ machine_id: 'machine_id' })) {\n  console.log(terminal);\n}\n```",
    perLanguage: {
      cli: {
        method: 'terminals list',
        example: "dedalus machines:terminals list \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id",
      },
      go: {
        method: 'client.Machines.Terminals.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Machines.Terminals.List(context.TODO(), dedalus.MachineTerminalListParams{\n\t\tMachineID: "machine_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/terminals \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.terminals.list',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.machines.terminals.list(\n    machine_id="machine_id",\n)\npage = page.items[0]\nprint(page.machine_id)',
      },
      typescript: {
        method: 'client.machines.terminals.list',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const terminal of client.machines.terminals.list({ machine_id: 'machine_id' })) {\n  console.log(terminal.machine_id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/machines/{machine_id}/terminals',
    httpMethod: 'post',
    summary: 'Create terminal',
    description: 'Create terminal',
    stainlessPath: '(resource) machines.terminals > (method) create',
    qualified: 'client.machines.terminals.create',
    params: [
      'machine_id: string;',
      'height: number;',
      'width: number;',
      'cwd?: string;',
      'env?: object;',
      'shell?: string;',
    ],
    response:
      "{ created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }",
    markdown:
      "## create\n\n`client.machines.terminals.create(machine_id: string, height: number, width: number, cwd?: string, env?: object, shell?: string): { created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n**post** `/v1/machines/{machine_id}/terminals`\n\nCreate terminal\n\n### Parameters\n\n- `machine_id: string`\n\n- `height: number`\n\n- `width: number`\n\n- `cwd?: string`\n\n- `env?: object`\n\n- `shell?: string`\n\n### Returns\n\n- `{ created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n  - `created_at: string`\n  - `height: number`\n  - `machine_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `terminal_id: string`\n  - `width: number`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'websocket'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `stream_url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst terminal = await client.machines.terminals.create({\n  machine_id: 'machine_id',\n  height: 0,\n  width: 0,\n});\n\nconsole.log(terminal);\n```",
    perLanguage: {
      cli: {
        method: 'terminals create',
        example:
          "dedalus machines:terminals create \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --height 0 \\\n  --width 0",
      },
      go: {
        method: 'client.Machines.Terminals.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tterminal, err := client.Machines.Terminals.New(context.TODO(), dedalus.MachineTerminalNewParams{\n\t\tMachineID: "machine_id",\n\t\tTerminalCreateParams: dedalus.TerminalCreateParams{\n\t\t\tHeight: 0,\n\t\t\tWidth:  0,\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", terminal.TerminalID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/terminals \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY" \\\n    -d \'{\n          "height": 0,\n          "width": 0\n        }\'',
      },
      python: {
        method: 'machines.terminals.create',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nterminal = client.machines.terminals.create(\n    machine_id="machine_id",\n    height=0,\n    width=0,\n)\nprint(terminal.terminal_id)',
      },
      typescript: {
        method: 'client.machines.terminals.create',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst terminal = await client.machines.terminals.create({\n  machine_id: 'machine_id',\n  height: 0,\n  width: 0,\n});\n\nconsole.log(terminal.terminal_id);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/machines/{machine_id}/terminals/{terminal_id}',
    httpMethod: 'get',
    summary: 'Get terminal',
    description: 'Get terminal',
    stainlessPath: '(resource) machines.terminals > (method) retrieve',
    qualified: 'client.machines.terminals.retrieve',
    params: ['machine_id: string;', 'terminal_id: string;'],
    response:
      "{ created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }",
    markdown:
      "## retrieve\n\n`client.machines.terminals.retrieve(machine_id: string, terminal_id: string): { created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n**get** `/v1/machines/{machine_id}/terminals/{terminal_id}`\n\nGet terminal\n\n### Parameters\n\n- `machine_id: string`\n\n- `terminal_id: string`\n\n### Returns\n\n- `{ created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n  - `created_at: string`\n  - `height: number`\n  - `machine_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `terminal_id: string`\n  - `width: number`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'websocket'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `stream_url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst terminal = await client.machines.terminals.retrieve({ machine_id: 'machine_id', terminal_id: 'terminal_id' });\n\nconsole.log(terminal);\n```",
    perLanguage: {
      cli: {
        method: 'terminals retrieve',
        example:
          "dedalus machines:terminals retrieve \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --terminal-id terminal_id",
      },
      go: {
        method: 'client.Machines.Terminals.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tterminal, err := client.Machines.Terminals.Get(context.TODO(), dedalus.MachineTerminalGetParams{\n\t\tMachineID:  "machine_id",\n\t\tTerminalID: "terminal_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", terminal.TerminalID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/terminals/$TERMINAL_ID \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.terminals.retrieve',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nterminal = client.machines.terminals.retrieve(\n    machine_id="machine_id",\n    terminal_id="terminal_id",\n)\nprint(terminal.terminal_id)',
      },
      typescript: {
        method: 'client.machines.terminals.retrieve',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst terminal = await client.machines.terminals.retrieve({\n  machine_id: 'machine_id',\n  terminal_id: 'terminal_id',\n});\n\nconsole.log(terminal.terminal_id);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/machines/{machine_id}/terminals/{terminal_id}',
    httpMethod: 'delete',
    summary: 'Delete terminal',
    description: 'Delete terminal',
    stainlessPath: '(resource) machines.terminals > (method) delete',
    qualified: 'client.machines.terminals.delete',
    params: ['machine_id: string;', 'terminal_id: string;'],
    response:
      "{ created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }",
    markdown:
      "## delete\n\n`client.machines.terminals.delete(machine_id: string, terminal_id: string): { created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n**delete** `/v1/machines/{machine_id}/terminals/{terminal_id}`\n\nDelete terminal\n\n### Parameters\n\n- `machine_id: string`\n\n- `terminal_id: string`\n\n### Returns\n\n- `{ created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n  - `created_at: string`\n  - `height: number`\n  - `machine_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `terminal_id: string`\n  - `width: number`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'websocket'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `stream_url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst terminal = await client.machines.terminals.delete({ machine_id: 'machine_id', terminal_id: 'terminal_id' });\n\nconsole.log(terminal);\n```",
    perLanguage: {
      cli: {
        method: 'terminals delete',
        example:
          "dedalus machines:terminals delete \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --terminal-id terminal_id",
      },
      go: {
        method: 'client.Machines.Terminals.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tterminal, err := client.Machines.Terminals.Delete(context.TODO(), dedalus.MachineTerminalDeleteParams{\n\t\tMachineID:  "machine_id",\n\t\tTerminalID: "terminal_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", terminal.TerminalID)\n}\n',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/terminals/$TERMINAL_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
      python: {
        method: 'machines.terminals.delete',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nterminal = client.machines.terminals.delete(\n    machine_id="machine_id",\n    terminal_id="terminal_id",\n)\nprint(terminal.terminal_id)',
      },
      typescript: {
        method: 'client.machines.terminals.delete',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst terminal = await client.machines.terminals.delete({\n  machine_id: 'machine_id',\n  terminal_id: 'terminal_id',\n});\n\nconsole.log(terminal.terminal_id);",
      },
    },
  },
  {
    name: 'connect',
    endpoint: '',
    httpMethod: '',
    summary: '',
    description: '',
    stainlessPath: '(resource) machines.terminals > (method) connect',
    qualified: 'client.machines.terminals.connect',
    perLanguage: {
      cli: {
        example:
          "dedalus machines:terminals connect \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --terminal-id terminal_id",
      },
      go: {
        method: 'client.Machines.Terminals.Connect',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Machines.Terminals.Connect(context.TODO(), dedalus.MachineTerminalConnectParams{\n\t\tMachineID:  "machine_id",\n\t\tTerminalID: "terminal_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      python: {
        method: 'machines.terminals.connect',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nclient.machines.terminals.connect(\n    machine_id="machine_id",\n    terminal_id="terminal_id",\n)',
      },
      typescript: {
        method: 'client.machines.terminals.connect',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.machines.terminals.connect({ machine_id: 'machine_id', terminal_id: 'terminal_id' });",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'python',
    content:
      '# Dedalus Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/dedalus-sdk.svg?label=pypi%20(stable))](https://pypi.org/project/dedalus-sdk/)\n\nThe Dedalus Python library provides convenient access to the Dedalus REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dedalus MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=dedalus-mcp&config=eyJuYW1lIjoiZGVkYWx1cy1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly9kZWRhbHVzLnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7IngtYXBpLWtleSI6Ik15IFggQVBJIEtleSIsIngtZGVkYWx1cy1hcGkta2V5IjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22dedalus-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fdedalus.stlmcp.com%22%2C%22headers%22%3A%7B%22x-api-key%22%3A%22My%20X%20API%20Key%22%2C%22x-dedalus-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [docs.dedaluslabs.ai](https://docs.dedaluslabs.ai). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install dedalus-sdk\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\n\nmachine = client.machines.create(\n    memory_mib=2048,\n    storage_gib=10,\n    vcpu=1,\n)\nprint(machine.machine_id)\n```\n\nWhile you can provide a `x_api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `DEDALUS_X_API_KEY="My X API Key"` to your `.env` file\nso that your X API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncDedalus` instead of `Dedalus` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom dedalus_sdk import AsyncDedalus\n\nclient = AsyncDedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  machine = await client.machines.create(\n      memory_mib=2048,\n      storage_gib=10,\n      vcpu=1,\n  )\n  print(machine.machine_id)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install dedalus-sdk[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom dedalus_sdk import DefaultAioHttpClient\nfrom dedalus_sdk import AsyncDedalus\n\nasync def main() -> None:\n  async with AsyncDedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    machine = await client.machines.create(\n        memory_mib=2048,\n        storage_gib=10,\n        vcpu=1,\n    )\n    print(machine.machine_id)\n\nasyncio.run(main())\n```\n\n## Streaming responses\n\nWe provide support for streaming responses using Server Side Events (SSE).\n\n```python\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus()\n\nstream = client.machines.watch(\n    machine_id="machine_id",\n)\nfor machine in stream:\n  print(machine.machine_id)\n```\n\nThe async client uses the exact same interface.\n\n```python\nfrom dedalus_sdk import AsyncDedalus\n\nclient = AsyncDedalus()\n\nstream = await client.machines.watch(\n    machine_id="machine_id",\n)\nasync for machine in stream:\n  print(machine.machine_id)\n```\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n## Pagination\n\nList methods in the Dedalus API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```python\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus()\n\nall_machines = []\n# Automatically fetches more pages as needed.\nfor machine in client.machines.list():\n    # Do something with machine here\n    all_machines.append(machine)\nprint(all_machines)\n```\n\nOr, asynchronously:\n\n```python\nimport asyncio\nfrom dedalus_sdk import AsyncDedalus\n\nclient = AsyncDedalus()\n\nasync def main() -> None:\n    all_machines = []\n    # Iterate through items across all pages, issuing requests as needed.\n    async for machine in client.machines.list():\n        all_machines.append(machine)\n    print(all_machines)\n\nasyncio.run(main())\n```\n\nAlternatively, you can use the `.has_next_page()`, `.next_page_info()`, or  `.get_next_page()` methods for more granular control working with pages:\n\n```python\nfirst_page = await client.machines.list()\nif first_page.has_next_page():\n    print(f"will fetch next page using these details: {first_page.next_page_info()}")\n    next_page = await first_page.get_next_page()\n    print(f"number of items we just fetched: {len(next_page.items)}")\n\n# Remove `await` for non-async usage.\n```\n\nOr just work directly with the returned data:\n\n```python\nfirst_page = await client.machines.list()\n\nprint(f"next page cursor: {first_page.next_cursor}") # => "next page cursor: ..."\nfor machine in first_page.items:\n    print(machine.machine_id)\n\n# Remove `await` for non-async usage.\n```\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `dedalus_sdk.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `dedalus_sdk.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `dedalus_sdk.APIError`.\n\n```python\nimport dedalus_sdk\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus()\n\ntry:\n    client.machines.create(\n        memory_mib=2048,\n        storage_gib=10,\n        vcpu=1,\n    )\nexcept dedalus_sdk.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept dedalus_sdk.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept dedalus_sdk.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom dedalus_sdk import Dedalus\n\n# Configure the default for all requests:\nclient = Dedalus(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).machines.create(\n    memory_mib=2048,\n    storage_gib=10,\n    vcpu=1,\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom dedalus_sdk import Dedalus\n\n# Configure the default for all requests:\nclient = Dedalus(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Dedalus(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).machines.create(\n    memory_mib=2048,\n    storage_gib=10,\n    vcpu=1,\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `DEDALUS_LOG` to `info`.\n\n```shell\n$ export DEDALUS_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus()\nresponse = client.machines.with_raw_response.create(\n    memory_mib=2048,\n    storage_gib=10,\n    vcpu=1,\n)\nprint(response.headers.get(\'X-My-Header\'))\n\nmachine = response.parse()  # get the object that `machines.create()` would have returned\nprint(machine.machine_id)\n```\n\nThese methods return an [`APIResponse`](https://github.com/dedalus-labs/dedalus-python/tree/main/src/dedalus_sdk/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/dedalus-labs/dedalus-python/tree/main/src/dedalus_sdk/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.machines.with_streaming_response.create(\n    memory_mib=2048,\n    storage_gib=10,\n    vcpu=1,\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom dedalus_sdk import Dedalus, DefaultHttpxClient\n\nclient = Dedalus(\n    # Or use the `DEDALUS_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom dedalus_sdk import Dedalus\n\nwith Dedalus() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/dedalus-labs/dedalus-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport dedalus_sdk\nprint(dedalus_sdk.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'go',
    content:
      '# Dedalus Go API Library\n\n<a href="https://pkg.go.dev/github.com/dedalus-labs/dedalus-go"><img src="https://pkg.go.dev/badge/github.com/dedalus-labs/dedalus-go.svg" alt="Go Reference"></a>\n\nThe Dedalus Go library provides convenient access to the [Dedalus REST API](https://docs.dedaluslabs.ai)\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dedalus MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=dedalus-mcp&config=eyJuYW1lIjoiZGVkYWx1cy1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly9kZWRhbHVzLnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7IngtYXBpLWtleSI6Ik15IFggQVBJIEtleSIsIngtZGVkYWx1cy1hcGkta2V5IjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22dedalus-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fdedalus.stlmcp.com%22%2C%22headers%22%3A%7B%22x-api-key%22%3A%22My%20X%20API%20Key%22%2C%22x-dedalus-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/dedalus-labs/dedalus-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/dedalus-labs/dedalus-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("DEDALUS_API_KEY")\n\t)\n\tmachine, err := client.Machines.New(context.TODO(), dedalus.MachineNewParams{\n\t\tCreateParams: dedalus.CreateParams{\n\t\t\tMemoryMiB:  0,\n\t\t\tStorageGiB: 0,\n\t\t\tVCPU:       0,\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", machine.MachineID)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Machines.New(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/dedalus-labs/dedalus-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n```go\niter := client.Machines.ListAutoPaging(context.TODO(), dedalus.MachineListParams{})\n// Automatically fetches more pages as needed.\nfor iter.Next() {\n\tmachineListItem := iter.Current()\n\tfmt.Printf("%+v\\n", machineListItem)\n}\nif err := iter.Err(); err != nil {\n\tpanic(err.Error())\n}\n```\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n```go\npage, err := client.Machines.List(context.TODO(), dedalus.MachineListParams{})\nfor page != nil {\n\tfor _, machine := range page.Items {\n\t\tfmt.Printf("%+v\\n", machine)\n\t}\n\tpage, err = page.GetNextPage()\n}\nif err != nil {\n\tpanic(err.Error())\n}\n```\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Machines.New(context.TODO(), dedalus.MachineNewParams{\n\tCreateParams: dedalus.CreateParams{\n\t\tMemoryMiB:  0,\n\t\tStorageGiB: 0,\n\t\tVCPU:       0,\n\t},\n})\nif err != nil {\n\tvar apierr *dedalus.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t\tprintln(apierr.ErrorCode)                  // IDEMPOTENCY_KEY_REUSED\n\t\tprintln(apierr.Message)                    // idempotency key reused with different request parameters\n\t\tprintln(apierr.Retryable)                  // false\n\t}\n\tpanic(err.Error()) // GET "/v1/machines": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Machines.New(\n\tctx,\n\tdedalus.MachineNewParams{\n\t\tCreateParams: dedalus.CreateParams{\n\t\t\tMemoryMiB:  0,\n\t\t\tStorageGiB: 0,\n\t\t\tVCPU:       0,\n\t\t},\n\t},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := dedalus.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Machines.New(\n\tcontext.TODO(),\n\tdedalus.MachineNewParams{\n\t\tCreateParams: dedalus.CreateParams{\n\t\t\tMemoryMiB:  0,\n\t\t\tStorageGiB: 0,\n\t\t\tVCPU:       0,\n\t\t},\n\t},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nmachine, err := client.Machines.New(\n\tcontext.TODO(),\n\tdedalus.MachineNewParams{\n\t\tCreateParams: dedalus.CreateParams{\n\t\t\tMemoryMiB:  0,\n\t\t\tStorageGiB: 0,\n\t\t\tVCPU:       0,\n\t\t},\n\t},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", machine)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/dedalus-labs/dedalus-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'terraform',
    content:
      '# Dedalus Terraform Provider\n\nThe [Dedalus Terraform provider](https://registry.terraform.io/providers/dedalus-labs/dedalus/latest/docs) provides convenient access to\nthe [Dedalus REST API](https://docs.dedaluslabs.ai) from Terraform.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## Requirements\n\nThis provider requires Terraform CLI 1.0 or later. You can [install it for your system](https://developer.hashicorp.com/terraform/install)\non Hashicorp\'s website.\n\n## Usage\n\nAdd the following to your `main.tf` file:\n\n<!-- x-release-please-start-version -->\n\n```hcl\n# Declare the provider and version\nterraform {\n  required_providers {\n    SDK_ProviderTypeName = {\n      source  = "dedalus-labs/dedalus"\n      version = "~> 0.0.1"\n    }\n  }\n}\n\n# Initialize the provider\nprovider "dedalus" {\n  # Dedalus API key sent as Authorization Bearer.\n  api_key = "My API Key" # or set DEDALUS_API_KEY env variable\n  # Dedalus API key sent as x-api-key header.\n  x_api_key = "My X API Key" # or set DEDALUS_X_API_KEY env variable\n  # Organization ID header for all DCS requests.\n  dedalus_org_id = "My Dedalus Org ID" # or set DEDALUS_ORG_ID env variable\n}\n\n# Configure a resource\nresource "dedalus_machine" "example_machine" {\n  memory_mib = 2048\n  storage_gib = 10\n  vcpu = 1\n}\n```\n\n<!-- x-release-please-end -->\n\nInitialize your project by running `terraform init` in the directory.\n\nAdditional examples can be found in the [./examples](./examples) folder within this repository, and you can\nrefer to the full documentation on [the Terraform Registry](https://registry.terraform.io/providers/dedalus-labs/dedalus/latest/docs).\n\n### Provider Options\nWhen you initialize the provider, the following options are supported. It is recommended to use environment variables for sensitive values like access tokens.\nIf an environment variable is provided, then the option does not need to be set in the terraform source.\n\n| Property       | Environment variable | Required | Default value |\n| -------------- | -------------------- | -------- | ------------- |\n| x_api_key      | `DEDALUS_X_API_KEY`  | false    | —             |\n| dedalus_org_id | `DEDALUS_ORG_ID`     | false    | —             |\n| api_key        | `DEDALUS_API_KEY`    | false    | —             |\n\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/dedalus-labs/terraform-provider-dedalus/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Dedalus TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/dedalus.svg?label=npm%20(stable))](https://npmjs.org/package/dedalus) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/dedalus)\n\nThis library provides convenient access to the Dedalus REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [docs.dedaluslabs.ai](https://docs.dedaluslabs.ai). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dedalus MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=dedalus-mcp&config=eyJuYW1lIjoiZGVkYWx1cy1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly9kZWRhbHVzLnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7IngtYXBpLWtleSI6Ik15IFggQVBJIEtleSIsIngtZGVkYWx1cy1hcGkta2V5IjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22dedalus-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fdedalus.stlmcp.com%22%2C%22headers%22%3A%7B%22x-api-key%22%3A%22My%20X%20API%20Key%22%2C%22x-dedalus-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install dedalus\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst machine = await client.machines.create({\n  memory_mib: 2048,\n  storage_gib: 10,\n  vcpu: 1,\n});\n\nconsole.log(machine.machine_id);\n```\n\n## Streaming responses\n\nWe provide support for streaming responses using Server Sent Events (SSE).\n\n```ts\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst stream = await client.machines.watch({ machine_id: 'machine_id' });\nfor await (const machine of stream) {\n  console.log(machine.machine_id);\n}\n```\n\nIf you need to cancel a stream, you can `break` from the loop\nor call `stream.controller.abort()`.\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst params: Dedalus.MachineCreateParams = {\n  memory_mib: 2048,\n  storage_gib: 10,\n  vcpu: 1,\n};\nconst machine: Dedalus.Machine = await client.machines.create(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst machine = await client.machines\n  .create({\n    memory_mib: 2048,\n    storage_gib: 10,\n    vcpu: 1,\n  })\n  .catch(async (err) => {\n    if (err instanceof Dedalus.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.error?.error_code); // IDEMPOTENCY_KEY_REUSED\n      console.log(err.error?.message); // idempotency key reused with different request parameters\n      console.log(err.error?.retryable); // false\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Dedalus({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.machines.create({\n  memory_mib: 2048,\n  storage_gib: 10,\n  vcpu: 1,\n}, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Dedalus({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.machines.create({\n  memory_mib: 2048,\n  storage_gib: 10,\n  vcpu: 1,\n}, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the Dedalus API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllMachineListItems(params) {\n  const allMachineListItems = [];\n  // Automatically fetches more pages as needed.\n  for await (const machineListItem of client.machines.list()) {\n    allMachineListItems.push(machineListItem);\n  }\n  return allMachineListItems;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.machines.list();\nfor (const machineListItem of page.items) {\n  console.log(machineListItem);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Dedalus();\n\nconst response = await client.machines\n  .create({\n    memory_mib: 2048,\n    storage_gib: 10,\n    vcpu: 1,\n  })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: machine, response: raw } = await client.machines\n  .create({\n    memory_mib: 2048,\n    storage_gib: 10,\n    vcpu: 1,\n  })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(machine.machine_id);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `DEDALUS_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Dedalus from 'dedalus';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Dedalus({\n  logger: logger.child({ name: 'Dedalus' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.machines.create({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Dedalus from 'dedalus';\nimport fetch from 'my-fetch';\n\nconst client = new Dedalus({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Dedalus from 'dedalus';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Dedalus({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Dedalus from 'npm:dedalus';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Dedalus({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/dedalus-labs/dedalus-typescript/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
  {
    language: 'cli',
    content:
      "# Dedalus CLI\n\nThe official CLI for the [Dedalus REST API](https://docs.dedaluslabs.ai).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n<!-- x-release-please-start-version -->\n\n## Installation\n\n### Installing with Homebrew\n\n~~~sh\nbrew install dedalus-labs/tap/dedalus\n~~~\n\n### Installing with Go\n\nTo test or install the CLI locally, you need [Go](https://go.dev/doc/install) version 1.22 or later installed.\n\n~~~sh\ngo install 'github.com/dedalus-labs/dedalus-cli/cmd/dedalus@latest'\n~~~\n\nOnce you have run `go install`, the binary is placed in your Go bin directory:\n\n- **Default location**: `$HOME/go/bin` (or `$GOPATH/bin` if GOPATH is set)\n- **Check your path**: Run `go env GOPATH` to see the base directory\n\nIf commands aren't found after installation, add the Go bin directory to your PATH:\n\n~~~sh\n# Add to your shell profile (.zshrc, .bashrc, etc.)\nexport PATH=\"$PATH:$(go env GOPATH)/bin\"\n~~~\n\n<!-- x-release-please-end -->\n\n### Running Locally\n\nAfter cloning the git repository for this project, you can use the\n`scripts/run` script to run the tool locally:\n\n~~~sh\n./scripts/run args...\n~~~\n\n## Usage\n\nThe CLI follows a resource-based command structure:\n\n~~~sh\ndedalus [resource] <command> [flags...]\n~~~\n\n~~~sh\ndedalus machines create \\\n  --api-key 'My API Key' \\\n  --memory-mib 2048 \\\n  --storage-gib 10 \\\n  --vcpu 1\n~~~\n\nFor details about specific commands, use the `--help` flag.\n\n### Environment variables\n\n| Environment variable | Description                                   | Required | Default value |\n| -------------------- | --------------------------------------------- | -------- | ------------- |\n| `DEDALUS_API_KEY`    | Dedalus API key sent as Authorization Bearer. | no       | `null`        |\n| `DEDALUS_X_API_KEY`  | Dedalus API key sent as x-api-key header.     | no       | `null`        |\n| `DEDALUS_ORG_ID`     | Organization ID header for all DCS requests.  | no       | `null`        |\n\n### Global flags\n\n- `--api-key` - Dedalus API key sent as Authorization Bearer. (can also be set with `DEDALUS_API_KEY` env var)\n- `--x-api-key` - Dedalus API key sent as x-api-key header. (can also be set with `DEDALUS_X_API_KEY` env var)\n- `--dedalus-org-id` - Organization ID header for all DCS requests. (can also be set with `DEDALUS_ORG_ID` env var)\n- `--help` - Show command line usage\n- `--debug` - Enable debug logging (includes HTTP request/response details)\n- `--version`, `-v` - Show the CLI version\n- `--base-url` - Use a custom API backend URL\n- `--format` - Change the output format (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--format-error` - Change the output format for errors (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--transform` - Transform the data output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n- `--transform-error` - Transform the error output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n\n### Passing files as arguments\n\nTo pass files to your API, you can use the `@myfile.ext` syntax:\n\n~~~bash\ndedalus <command> --arg @abe.jpg\n~~~\n\nFiles can also be passed inside JSON or YAML blobs:\n\n~~~bash\ndedalus <command> --arg '{image: \"@abe.jpg\"}'\n# Equivalent:\ndedalus <command> <<YAML\narg:\n  image: \"@abe.jpg\"\nYAML\n~~~\n\nIf you need to pass a string literal that begins with an `@` sign, you can\nescape the `@` sign to avoid accidentally passing a file.\n\n~~~bash\ndedalus <command> --username '\\@abe'\n~~~\n\n#### Explicit encoding\n\nFor JSON endpoints, the CLI tool does filetype sniffing to determine whether the\nfile contents should be sent as a string literal (for plain text files) or as a\nbase64-encoded string literal (for binary files). If you need to explicitly send\nthe file as either plain text or base64-encoded data, you can use\n`@file://myfile.txt` (for string encoding) or `@data://myfile.dat` (for\nbase64-encoding). Note that absolute paths will begin with `@file://` or\n`@data://`, followed by a third `/` (for example, `@file:///tmp/file.txt`).\n\n~~~bash\ndedalus <command> --arg @data://file.txt\n~~~\n",
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
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
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
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
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
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
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
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
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

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
