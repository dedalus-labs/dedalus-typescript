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
    name: 'retrieve',
    endpoint: '/v1/usage',
    httpMethod: 'get',
    summary: 'Get usage summary',
    description: 'Get usage summary',
    stainlessPath: '(resource) usage > (method) retrieve',
    qualified: 'client.usage.retrieve',
    params: ['period_start?: string;'],
    response:
      '{ billed_awake_seconds: number; billed_cpu_millicore_seconds: number; billed_logical_storage_mib_seconds: number; billed_memory_mib_seconds: number; included_storage_gib: number; plan_slug: string; provisioned_storage_gib: number; }',
    markdown:
      "## retrieve\n\n`client.usage.retrieve(period_start?: string): { billed_awake_seconds: number; billed_cpu_millicore_seconds: number; billed_logical_storage_mib_seconds: number; billed_memory_mib_seconds: number; included_storage_gib: number; plan_slug: string; provisioned_storage_gib: number; }`\n\n**get** `/v1/usage`\n\nGet usage summary\n\n### Parameters\n\n- `period_start?: string`\n  Billing period start (YYYY-MM-DD). Defaults to first of current month.\n\n### Returns\n\n- `{ billed_awake_seconds: number; billed_cpu_millicore_seconds: number; billed_logical_storage_mib_seconds: number; billed_memory_mib_seconds: number; included_storage_gib: number; plan_slug: string; provisioned_storage_gib: number; }`\n\n  - `billed_awake_seconds: number`\n  - `billed_cpu_millicore_seconds: number`\n  - `billed_logical_storage_mib_seconds: number`\n  - `billed_memory_mib_seconds: number`\n  - `included_storage_gib: number`\n  - `plan_slug: string`\n  - `provisioned_storage_gib: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst orgUsage = await client.usage.retrieve();\n\nconsole.log(orgUsage);\n```",
    perLanguage: {
      typescript: {
        method: 'client.usage.retrieve',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst orgUsage = await client.usage.retrieve();\n\nconsole.log(orgUsage.billed_awake_seconds);",
      },
      python: {
        method: 'usage.retrieve',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\norg_usage = client.usage.retrieve()\nprint(org_usage.billed_awake_seconds)',
      },
      java: {
        method: 'usage().retrieve',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.usage.OrgUsage;\nimport com.dedalus.api.models.usage.UsageRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        OrgUsage orgUsage = client.usage().retrieve();\n    }\n}',
      },
      kotlin: {
        method: 'usage().retrieve',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.usage.OrgUsage\nimport com.dedalus.api.models.usage.UsageRetrieveParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val orgUsage: OrgUsage = client.usage().retrieve()\n}',
      },
      go: {
        method: 'client.Usage.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\torgUsage, err := client.Usage.Get(context.TODO(), dedalus.UsageGetParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", orgUsage.BilledAwakeSeconds)\n}\n',
      },
      ruby: {
        method: 'usage.retrieve',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\norg_usage = dedalus.usage.retrieve\n\nputs(org_usage)',
      },
      cli: {
        method: 'usage retrieve',
        example: "dedalus usage retrieve \\\n  --api-key 'My API Key'",
      },
      php: {
        method: 'usage->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$orgUsage = $client->usage->retrieve(periodStart: 'period_start');\n\nvar_dump($orgUsage);",
      },
      csharp: {
        method: 'Usage.Retrieve',
        example:
          'UsageRetrieveParams parameters = new();\n\nvar orgUsage = await client.Usage.Retrieve(parameters);\n\nConsole.WriteLine(orgUsage);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/usage \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
    },
  },
  {
    name: 'machine_compute',
    endpoint: '/v1/usage/machines/compute',
    httpMethod: 'get',
    summary: 'List machine compute usage breakdown',
    description: 'List machine compute usage breakdown',
    stainlessPath: '(resource) usage > (method) machine_compute',
    qualified: 'client.usage.machineCompute',
    params: [
      'granularity?: string;',
      'machine_id?: string;',
      'period_end?: string;',
      'period_start?: string;',
    ],
    response:
      '{ granularity: string; period_end: string; period_start: string; rows: { awake_seconds: number; bucket_end: string; bucket_start: string; cpu_millicore_seconds: number; last_window_end: string; machine_id: string; memory_mib_seconds: number; org_metering_bucket_ids: string[]; requested_memory_mib: number; requested_storage_gib: number; requested_vcpu: number; spec_fingerprint: string; stripe_cpu_identifiers: string[]; stripe_memory_identifiers: string[]; window_count: number; latest_stripe_emitted_at?: string; }[]; }',
    markdown:
      "## machine_compute\n\n`client.usage.machineCompute(granularity?: string, machine_id?: string, period_end?: string, period_start?: string): { granularity: string; period_end: string; period_start: string; rows: machine_compute_usage_row[]; }`\n\n**get** `/v1/usage/machines/compute`\n\nList machine compute usage breakdown\n\n### Parameters\n\n- `granularity?: string`\n  Usage breakdown granularity: hour or day. Defaults to hour.\n\n- `machine_id?: string`\n  Optional machine ID filter.\n\n- `period_end?: string`\n  Last UTC usage date to include (YYYY-MM-DD). Defaults to current time.\n\n- `period_start?: string`\n  Usage period start (YYYY-MM-DD). Defaults to first of current month.\n\n### Returns\n\n- `{ granularity: string; period_end: string; period_start: string; rows: { awake_seconds: number; bucket_end: string; bucket_start: string; cpu_millicore_seconds: number; last_window_end: string; machine_id: string; memory_mib_seconds: number; org_metering_bucket_ids: string[]; requested_memory_mib: number; requested_storage_gib: number; requested_vcpu: number; spec_fingerprint: string; stripe_cpu_identifiers: string[]; stripe_memory_identifiers: string[]; window_count: number; latest_stripe_emitted_at?: string; }[]; }`\n\n  - `granularity: string`\n  - `period_end: string`\n  - `period_start: string`\n  - `rows: { awake_seconds: number; bucket_end: string; bucket_start: string; cpu_millicore_seconds: number; last_window_end: string; machine_id: string; memory_mib_seconds: number; org_metering_bucket_ids: string[]; requested_memory_mib: number; requested_storage_gib: number; requested_vcpu: number; spec_fingerprint: string; stripe_cpu_identifiers: string[]; stripe_memory_identifiers: string[]; window_count: number; latest_stripe_emitted_at?: string; }[]`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst machineComputeUsage = await client.usage.machineCompute();\n\nconsole.log(machineComputeUsage);\n```",
    perLanguage: {
      typescript: {
        method: 'client.usage.machineCompute',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst machineComputeUsage = await client.usage.machineCompute();\n\nconsole.log(machineComputeUsage.granularity);",
      },
      python: {
        method: 'usage.machine_compute',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nmachine_compute_usage = client.usage.machine_compute()\nprint(machine_compute_usage.granularity)',
      },
      java: {
        method: 'usage().machineCompute',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.usage.MachineComputeUsage;\nimport com.dedalus.api.models.usage.UsageMachineComputeParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        MachineComputeUsage machineComputeUsage = client.usage().machineCompute();\n    }\n}',
      },
      kotlin: {
        method: 'usage().machineCompute',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.usage.MachineComputeUsage\nimport com.dedalus.api.models.usage.UsageMachineComputeParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val machineComputeUsage: MachineComputeUsage = client.usage().machineCompute()\n}',
      },
      go: {
        method: 'client.Usage.MachineCompute',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmachineComputeUsage, err := client.Usage.MachineCompute(context.TODO(), dedalus.UsageMachineComputeParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", machineComputeUsage.Granularity)\n}\n',
      },
      ruby: {
        method: 'usage.machine_compute',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nmachine_compute_usage = dedalus.usage.machine_compute\n\nputs(machine_compute_usage)',
      },
      cli: {
        method: 'usage machine_compute',
        example: "dedalus usage machine-compute \\\n  --api-key 'My API Key'",
      },
      php: {
        method: 'usage->machineCompute',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$machineComputeUsage = $client->usage->machineCompute(\n  granularity: 'granularity',\n  machineID: 'machine_id',\n  periodEnd: 'period_end',\n  periodStart: 'period_start',\n);\n\nvar_dump($machineComputeUsage);",
      },
      csharp: {
        method: 'Usage.MachineCompute',
        example:
          'UsageMachineComputeParams parameters = new();\n\nvar machineComputeUsage = await client.Usage.MachineCompute(parameters);\n\nConsole.WriteLine(machineComputeUsage);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/usage/machines/compute \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
    },
  },
  {
    name: 'machine_storage',
    endpoint: '/v1/usage/machines/storage',
    httpMethod: 'get',
    summary: 'List machine storage usage breakdown',
    description: 'List machine storage usage breakdown',
    stainlessPath: '(resource) usage > (method) machine_storage',
    qualified: 'client.usage.machineStorage',
    params: ['machine_id?: string;', 'period_end?: string;', 'period_start?: string;'],
    response:
      '{ period_end: string; period_start: string; rows: { bucket_end: string; bucket_start: string; logical_storage_bytes: number; machine_id: string; org_metering_bucket_id: string; storage_mib_seconds: number; stripe_storage_identifier: string; latest_stripe_emitted_at?: string; }[]; }',
    markdown:
      "## machine_storage\n\n`client.usage.machineStorage(machine_id?: string, period_end?: string, period_start?: string): { period_end: string; period_start: string; rows: machine_storage_usage_row[]; }`\n\n**get** `/v1/usage/machines/storage`\n\nList machine storage usage breakdown\n\n### Parameters\n\n- `machine_id?: string`\n  Optional machine ID filter.\n\n- `period_end?: string`\n  Last UTC usage date to include (YYYY-MM-DD). Defaults to current time.\n\n- `period_start?: string`\n  Usage period start (YYYY-MM-DD). Defaults to first of current month.\n\n### Returns\n\n- `{ period_end: string; period_start: string; rows: { bucket_end: string; bucket_start: string; logical_storage_bytes: number; machine_id: string; org_metering_bucket_id: string; storage_mib_seconds: number; stripe_storage_identifier: string; latest_stripe_emitted_at?: string; }[]; }`\n\n  - `period_end: string`\n  - `period_start: string`\n  - `rows: { bucket_end: string; bucket_start: string; logical_storage_bytes: number; machine_id: string; org_metering_bucket_id: string; storage_mib_seconds: number; stripe_storage_identifier: string; latest_stripe_emitted_at?: string; }[]`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst machineStorageUsage = await client.usage.machineStorage();\n\nconsole.log(machineStorageUsage);\n```",
    perLanguage: {
      typescript: {
        method: 'client.usage.machineStorage',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst machineStorageUsage = await client.usage.machineStorage();\n\nconsole.log(machineStorageUsage.period_end);",
      },
      python: {
        method: 'usage.machine_storage',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nmachine_storage_usage = client.usage.machine_storage()\nprint(machine_storage_usage.period_end)',
      },
      java: {
        method: 'usage().machineStorage',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.usage.MachineStorageUsage;\nimport com.dedalus.api.models.usage.UsageMachineStorageParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        MachineStorageUsage machineStorageUsage = client.usage().machineStorage();\n    }\n}',
      },
      kotlin: {
        method: 'usage().machineStorage',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.usage.MachineStorageUsage\nimport com.dedalus.api.models.usage.UsageMachineStorageParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val machineStorageUsage: MachineStorageUsage = client.usage().machineStorage()\n}',
      },
      go: {
        method: 'client.Usage.MachineStorage',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmachineStorageUsage, err := client.Usage.MachineStorage(context.TODO(), dedalus.UsageMachineStorageParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", machineStorageUsage.PeriodEnd)\n}\n',
      },
      ruby: {
        method: 'usage.machine_storage',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nmachine_storage_usage = dedalus.usage.machine_storage\n\nputs(machine_storage_usage)',
      },
      cli: {
        method: 'usage machine_storage',
        example: "dedalus usage machine-storage \\\n  --api-key 'My API Key'",
      },
      php: {
        method: 'usage->machineStorage',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$machineStorageUsage = $client->usage->machineStorage(\n  machineID: 'machine_id', periodEnd: 'period_end', periodStart: 'period_start'\n);\n\nvar_dump($machineStorageUsage);",
      },
      csharp: {
        method: 'Usage.MachineStorage',
        example:
          'UsageMachineStorageParams parameters = new();\n\nvar machineStorageUsage = await client.Usage.MachineStorage(parameters);\n\nConsole.WriteLine(machineStorageUsage);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/usage/machines/storage \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
      },
    },
  },
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
      "{ autosleep_seconds: number; created_at: string; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }",
    markdown:
      "## list\n\n`client.machines.list(cursor?: string, limit?: number): { autosleep_seconds: number; created_at: string; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; }`\n\n**get** `/v1/machines`\n\nList machines\n\n### Parameters\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ autosleep_seconds: number; created_at: string; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }`\n\n  - `autosleep_seconds: number`\n  - `created_at: string`\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `machine_id: string`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const machineListItem of client.machines.list()) {\n  console.log(machineListItem);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.list',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const machineListItem of client.machines.list()) {\n  console.log(machineListItem.machine_id);\n}",
      },
      python: {
        method: 'machines.list',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.machines.list()\npage = page.items[0]\nprint(page.machine_id)',
      },
      java: {
        method: 'machines().list',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.MachineListPage;\nimport com.dedalus.api.models.machines.MachineListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        MachineListPage page = client.machines().list();\n    }\n}',
      },
      kotlin: {
        method: 'machines().list',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.MachineListPage\nimport com.dedalus.api.models.machines.MachineListParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val page: MachineListPage = client.machines().list()\n}',
      },
      go: {
        method: 'client.Machines.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Machines.List(context.TODO(), dedalus.MachineListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'machines.list',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\npage = dedalus.machines.list\n\nputs(page)',
      },
      cli: {
        method: 'machines list',
        example: "dedalus machines list \\\n  --api-key 'My API Key'",
      },
      php: {
        method: 'machines->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->machines->list(cursor: 'cursor', limit: 0);\n\nvar_dump($page);",
      },
      csharp: {
        method: 'Machines.List',
        example:
          'MachineListParams parameters = new();\n\nvar page = await client.Machines.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
    params: ['memory_mib: number;', 'storage_gib: number;', 'vcpu: number;', 'autosleep?: string;'],
    response:
      "{ autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }",
    markdown:
      "## create\n\n`client.machines.create(memory_mib: number, storage_gib: number, vcpu: number, autosleep?: string): { autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; }`\n\n**post** `/v1/machines`\n\nCreate machine\n\n### Parameters\n\n- `memory_mib: number`\n  Memory in MiB.\n\n- `storage_gib: number`\n  Storage in GiB.\n\n- `vcpu: number`\n  CPU in vCPUs.\n\n- `autosleep?: string`\n  Idle window before autosleep. Accepts fixed duration units like 30s, 30m, 2h, 7d3h4s, or 1w3d, raw seconds (\"1800\"), or never to disable.\n\n### Returns\n\n- `{ autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }`\n\n  - `autosleep_seconds: number`\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `machine_id: string`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst machine = await client.machines.create({\n  memory_mib: 0,\n  storage_gib: 0,\n  vcpu: 0,\n});\n\nconsole.log(machine);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.create',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst machine = await client.machines.create({\n  memory_mib: 0,\n  storage_gib: 0,\n  vcpu: 0,\n});\n\nconsole.log(machine.machine_id);",
      },
      python: {
        method: 'machines.create',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nmachine = client.machines.create(\n    memory_mib=0,\n    storage_gib=0,\n    vcpu=0,\n)\nprint(machine.machine_id)',
      },
      java: {
        method: 'machines().create',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.CreateParams;\nimport com.dedalus.api.models.machines.Machine;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        CreateParams params = CreateParams.builder()\n            .memoryMiB(0L)\n            .storageGiB(0L)\n            .vcpu(0.0)\n            .build();\n        Machine machine = client.machines().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().create',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.CreateParams\nimport com.dedalus.api.models.machines.Machine\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: CreateParams = CreateParams.builder()\n        .memoryMiB(0L)\n        .storageGiB(0L)\n        .vcpu(0.0)\n        .build()\n    val machine: Machine = client.machines().create(params)\n}',
      },
      go: {
        method: 'client.Machines.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmachine, err := client.Machines.New(context.TODO(), dedalus.MachineNewParams{\n\t\tCreateParams: dedalus.CreateParams{\n\t\t\tMemoryMiB:  0,\n\t\t\tStorageGiB: 0,\n\t\t\tVCPU:       0,\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", machine.MachineID)\n}\n',
      },
      ruby: {
        method: 'machines.create',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nmachine = dedalus.machines.create(memory_mib: 0, storage_gib: 0, vcpu: 0)\n\nputs(machine)',
      },
      cli: {
        method: 'machines create',
        example:
          "dedalus machines create \\\n  --api-key 'My API Key' \\\n  --memory-mib 0 \\\n  --storage-gib 0 \\\n  --vcpu 0",
      },
      php: {
        method: 'machines->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$machine = $client->machines->create(\n  memoryMiB: 0, storageGiB: 0, vcpu: 0, autosleep: 'autosleep'\n);\n\nvar_dump($machine);",
      },
      csharp: {
        method: 'Machines.Create',
        example:
          'MachineCreateParams parameters = new()\n{\n    MemoryMiB = 0,\n    StorageGiB = 0,\n    Vcpu = 0,\n};\n\nvar machine = await client.Machines.Create(parameters);\n\nConsole.WriteLine(machine);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY" \\\n    -d \'{\n          "memory_mib": 0,\n          "storage_gib": 0,\n          "vcpu": 0\n        }\'',
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
      "{ autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }",
    markdown:
      "## retrieve\n\n`client.machines.retrieve(machine_id: string): { autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; }`\n\n**get** `/v1/machines/{machine_id}`\n\nGet machine\n\n### Parameters\n\n- `machine_id: string`\n\n### Returns\n\n- `{ autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }`\n\n  - `autosleep_seconds: number`\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `machine_id: string`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst machine = await client.machines.retrieve({ machine_id: 'dm-3' });\n\nconsole.log(machine);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.retrieve',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst machine = await client.machines.retrieve({ machine_id: 'dm-3' });\n\nconsole.log(machine.machine_id);",
      },
      python: {
        method: 'machines.retrieve',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nmachine = client.machines.retrieve(\n    machine_id="dm-3",\n)\nprint(machine.machine_id)',
      },
      java: {
        method: 'machines().retrieve',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.Machine;\nimport com.dedalus.api.models.machines.MachineRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        MachineRetrieveParams params = MachineRetrieveParams.builder()\n            .machineId("dm-3")\n            .build();\n        Machine machine = client.machines().retrieve(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().retrieve',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.Machine\nimport com.dedalus.api.models.machines.MachineRetrieveParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: MachineRetrieveParams = MachineRetrieveParams.builder()\n        .machineId("dm-3")\n        .build()\n    val machine: Machine = client.machines().retrieve(params)\n}',
      },
      go: {
        method: 'client.Machines.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmachine, err := client.Machines.Get(context.TODO(), dedalus.MachineGetParams{\n\t\tMachineID: "dm-3",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", machine.MachineID)\n}\n',
      },
      ruby: {
        method: 'machines.retrieve',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nmachine = dedalus.machines.retrieve(machine_id: "dm-3")\n\nputs(machine)',
      },
      cli: {
        method: 'machines retrieve',
        example: "dedalus machines retrieve \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3",
      },
      php: {
        method: 'machines->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$machine = $client->machines->retrieve(machineID: 'dm-3');\n\nvar_dump($machine);",
      },
      csharp: {
        method: 'Machines.Retrieve',
        example:
          'MachineRetrieveParams parameters = new() { MachineID = "dm-3" };\n\nvar machine = await client.Machines.Retrieve(parameters);\n\nConsole.WriteLine(machine);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      'autosleep?: string;',
      'memory_mib?: number;',
      'storage_gib?: number;',
      'vcpu?: number;',
    ],
    response:
      "{ autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }",
    markdown:
      "## update\n\n`client.machines.update(machine_id: string, autosleep?: string, memory_mib?: number, storage_gib?: number, vcpu?: number): { autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; }`\n\n**patch** `/v1/machines/{machine_id}`\n\nUpdate machine\n\n### Parameters\n\n- `machine_id: string`\n\n- `autosleep?: string`\n  Idle window before autosleep. Accepts fixed duration units like 30s, 30m, 2h, 7d3h4s, or 1w3d, raw seconds (\"1800\"), or never to disable.\n\n- `memory_mib?: number`\n  Memory in MiB.\n\n- `storage_gib?: number`\n  Storage in GiB.\n\n- `vcpu?: number`\n  CPU in vCPUs.\n\n### Returns\n\n- `{ autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }`\n\n  - `autosleep_seconds: number`\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `machine_id: string`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst machine = await client.machines.update({ machine_id: 'dm-3' });\n\nconsole.log(machine);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.update',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst machine = await client.machines.update({ machine_id: 'dm-3' });\n\nconsole.log(machine.machine_id);",
      },
      python: {
        method: 'machines.update',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nmachine = client.machines.update(\n    machine_id="dm-3",\n)\nprint(machine.machine_id)',
      },
      java: {
        method: 'machines().update',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.Machine;\nimport com.dedalus.api.models.machines.MachineUpdateParams;\nimport com.dedalus.api.models.machines.UpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        MachineUpdateParams params = MachineUpdateParams.builder()\n            .machineId("dm-3")\n            .updateParams(UpdateParams.builder().build())\n            .build();\n        Machine machine = client.machines().update(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().update',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.Machine\nimport com.dedalus.api.models.machines.MachineUpdateParams\nimport com.dedalus.api.models.machines.UpdateParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: MachineUpdateParams = MachineUpdateParams.builder()\n        .machineId("dm-3")\n        .updateParams(UpdateParams.builder().build())\n        .build()\n    val machine: Machine = client.machines().update(params)\n}',
      },
      go: {
        method: 'client.Machines.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmachine, err := client.Machines.Update(context.TODO(), dedalus.MachineUpdateParams{\n\t\tMachineID:    "dm-3",\n\t\tUpdateParams: dedalus.UpdateParams{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", machine.MachineID)\n}\n',
      },
      ruby: {
        method: 'machines.update',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nmachine = dedalus.machines.update(machine_id: "dm-3")\n\nputs(machine)',
      },
      cli: {
        method: 'machines update',
        example: "dedalus machines update \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3",
      },
      php: {
        method: 'machines->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$machine = $client->machines->update(\n  machineID: 'dm-3',\n  autosleep: 'autosleep',\n  memoryMiB: 0,\n  storageGiB: 0,\n  vcpu: 0,\n);\n\nvar_dump($machine);",
      },
      csharp: {
        method: 'Machines.Update',
        example:
          'MachineUpdateParams parameters = new() { MachineID = "dm-3" };\n\nvar machine = await client.Machines.Update(parameters);\n\nConsole.WriteLine(machine);',
      },
      http: {
        example:
          "curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $DEDALUS_API_KEY\" \\\n    -d '{}'",
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
    params: ['machine_id: string;'],
    response:
      "{ autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }",
    markdown:
      "## delete\n\n`client.machines.delete(machine_id: string): { autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; }`\n\n**delete** `/v1/machines/{machine_id}`\n\nDestroy machine\n\n### Parameters\n\n- `machine_id: string`\n\n### Returns\n\n- `{ autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }`\n\n  - `autosleep_seconds: number`\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `machine_id: string`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst machine = await client.machines.delete({ machine_id: 'dm-3' });\n\nconsole.log(machine);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.delete',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst machine = await client.machines.delete({ machine_id: 'dm-3' });\n\nconsole.log(machine.machine_id);",
      },
      python: {
        method: 'machines.delete',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nmachine = client.machines.delete(\n    machine_id="dm-3",\n)\nprint(machine.machine_id)',
      },
      java: {
        method: 'machines().delete',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.Machine;\nimport com.dedalus.api.models.machines.MachineDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        MachineDeleteParams params = MachineDeleteParams.builder()\n            .machineId("dm-3")\n            .build();\n        Machine machine = client.machines().delete(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().delete',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.Machine\nimport com.dedalus.api.models.machines.MachineDeleteParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: MachineDeleteParams = MachineDeleteParams.builder()\n        .machineId("dm-3")\n        .build()\n    val machine: Machine = client.machines().delete(params)\n}',
      },
      go: {
        method: 'client.Machines.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmachine, err := client.Machines.Delete(context.TODO(), dedalus.MachineDeleteParams{\n\t\tMachineID: "dm-3",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", machine.MachineID)\n}\n',
      },
      ruby: {
        method: 'machines.delete',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nmachine = dedalus.machines.delete(machine_id: "dm-3")\n\nputs(machine)',
      },
      cli: {
        method: 'machines delete',
        example: "dedalus machines delete \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3",
      },
      php: {
        method: 'machines->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$machine = $client->machines->delete(machineID: 'dm-3');\n\nvar_dump($machine);",
      },
      csharp: {
        method: 'Machines.Delete',
        example:
          'MachineDeleteParams parameters = new() { MachineID = "dm-3" };\n\nvar machine = await client.Machines.Delete(parameters);\n\nConsole.WriteLine(machine);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      "{ autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }",
    markdown:
      "## watch\n\n`client.machines.watch(machine_id: string, Last-Event-ID?: string): { autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; }`\n\n**get** `/v1/machines/{machine_id}/status/stream`\n\nStreams machine lifecycle updates over Server-Sent Events. Each `status` event contains a full `LifecycleResponse` payload. The stream closes after the machine reaches its current desired state.\n\n### Parameters\n\n- `machine_id: string`\n\n- `Last-Event-ID?: string`\n\n### Returns\n\n- `{ autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }`\n\n  - `autosleep_seconds: number`\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `machine_id: string`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst stream = await client.machines.watch({ machine_id: 'dm-3' });\nfor await (const machine of stream) {\n  console.log(machine);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.watch',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst machine = await client.machines.watch({ machine_id: 'dm-3' });\n\nconsole.log(machine.machine_id);",
      },
      python: {
        method: 'machines.watch',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nfor machine in client.machines.watch(\n    machine_id="dm-3",\n):\n  print(machine)',
      },
      java: {
        method: 'machines().watchStreaming',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.core.http.StreamResponse;\nimport com.dedalus.api.models.machines.Machine;\nimport com.dedalus.api.models.machines.MachineWatchParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        MachineWatchParams params = MachineWatchParams.builder()\n            .machineId("dm-3")\n            .build();\n        StreamResponse<Machine> machine = client.machines().watchStreaming(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().watchStreaming',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.core.http.StreamResponse\nimport com.dedalus.api.models.machines.Machine\nimport com.dedalus.api.models.machines.MachineWatchParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: MachineWatchParams = MachineWatchParams.builder()\n        .machineId("dm-3")\n        .build()\n    val machine: StreamResponse<Machine> = client.machines().watchStreaming(params)\n}',
      },
      go: {
        method: 'client.Machines.Watch',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tstream := client.Machines.WatchStreaming(context.TODO(), dedalus.MachineWatchParams{\n\t\tMachineID: "dm-3",\n\t})\n\tfor stream.Next() {\n\t\tfmt.Printf("%+v\\n", stream.Current())\n\t}\n\terr := stream.Err()\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      ruby: {
        method: 'machines.watch',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nmachine = dedalus.machines.watch(machine_id: "dm-3")\n\nputs(machine)',
      },
      cli: {
        method: 'machines watch',
        example: "dedalus machines watch \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3",
      },
      php: {
        method: 'machines->watch',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$machine = $client->machines->watchStream(\n  machineID: 'dm-3', lastEventID: 'Last-Event-ID'\n);\n\nvar_dump($machine);",
      },
      csharp: {
        method: 'Machines.WatchStreaming',
        example:
          'MachineWatchParams parameters = new() { MachineID = "dm-3" };\n\nawait foreach (var machine in client.Machines.WatchStreaming(parameters))\n{\n    Console.WriteLine(machine);\n}',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/status/stream \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
    params: ['machine_id: string;'],
    response:
      "{ autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }",
    markdown:
      "## sleep\n\n`client.machines.sleep(machine_id: string): { autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; }`\n\n**post** `/v1/machines/{machine_id}/sleep`\n\nSleep a running machine\n\n### Parameters\n\n- `machine_id: string`\n\n### Returns\n\n- `{ autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }`\n\n  - `autosleep_seconds: number`\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `machine_id: string`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst machine = await client.machines.sleep({ machine_id: 'dm-3' });\n\nconsole.log(machine);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.sleep',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst machine = await client.machines.sleep({ machine_id: 'dm-3' });\n\nconsole.log(machine.machine_id);",
      },
      python: {
        method: 'machines.sleep',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nmachine = client.machines.sleep(\n    machine_id="dm-3",\n)\nprint(machine.machine_id)',
      },
      java: {
        method: 'machines().sleep',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.Machine;\nimport com.dedalus.api.models.machines.MachineSleepParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        MachineSleepParams params = MachineSleepParams.builder()\n            .machineId("dm-3")\n            .build();\n        Machine machine = client.machines().sleep(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().sleep',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.Machine\nimport com.dedalus.api.models.machines.MachineSleepParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: MachineSleepParams = MachineSleepParams.builder()\n        .machineId("dm-3")\n        .build()\n    val machine: Machine = client.machines().sleep(params)\n}',
      },
      go: {
        method: 'client.Machines.Sleep',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmachine, err := client.Machines.Sleep(context.TODO(), dedalus.MachineSleepParams{\n\t\tMachineID: "dm-3",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", machine.MachineID)\n}\n',
      },
      ruby: {
        method: 'machines.sleep_',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nmachine = dedalus.machines.sleep_(machine_id: "dm-3")\n\nputs(machine)',
      },
      cli: {
        method: 'machines sleep',
        example: "dedalus machines sleep \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3",
      },
      php: {
        method: 'machines->sleep',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$machine = $client->machines->sleep(machineID: 'dm-3');\n\nvar_dump($machine);",
      },
      csharp: {
        method: 'Machines.Sleep',
        example:
          'MachineSleepParams parameters = new() { MachineID = "dm-3" };\n\nvar machine = await client.Machines.Sleep(parameters);\n\nConsole.WriteLine(machine);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/sleep \\\n    -X POST \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
    params: ['machine_id: string;'],
    response:
      "{ autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }",
    markdown:
      "## wake\n\n`client.machines.wake(machine_id: string): { autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: lifecycle_status; storage_gib: number; vcpu: number; }`\n\n**post** `/v1/machines/{machine_id}/wake`\n\nWake a sleeping machine\n\n### Parameters\n\n- `machine_id: string`\n\n### Returns\n\n- `{ autosleep_seconds: number; desired_state: 'running' | 'sleeping' | 'destroyed'; machine_id: string; memory_mib: number; status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }; storage_gib: number; vcpu: number; }`\n\n  - `autosleep_seconds: number`\n  - `desired_state: 'running' | 'sleeping' | 'destroyed'`\n  - `machine_id: string`\n  - `memory_mib: number`\n  - `status: { last_progress_at: string; last_transition_at: string; phase: string; reason: string; retryable: boolean; revision: string; last_error?: string; }`\n  - `storage_gib: number`\n  - `vcpu: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst machine = await client.machines.wake({ machine_id: 'dm-3' });\n\nconsole.log(machine);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.wake',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst machine = await client.machines.wake({ machine_id: 'dm-3' });\n\nconsole.log(machine.machine_id);",
      },
      python: {
        method: 'machines.wake',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nmachine = client.machines.wake(\n    machine_id="dm-3",\n)\nprint(machine.machine_id)',
      },
      java: {
        method: 'machines().wake',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.Machine;\nimport com.dedalus.api.models.machines.MachineWakeParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        MachineWakeParams params = MachineWakeParams.builder()\n            .machineId("dm-3")\n            .build();\n        Machine machine = client.machines().wake(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().wake',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.Machine\nimport com.dedalus.api.models.machines.MachineWakeParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: MachineWakeParams = MachineWakeParams.builder()\n        .machineId("dm-3")\n        .build()\n    val machine: Machine = client.machines().wake(params)\n}',
      },
      go: {
        method: 'client.Machines.Wake',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmachine, err := client.Machines.Wake(context.TODO(), dedalus.MachineWakeParams{\n\t\tMachineID: "dm-3",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", machine.MachineID)\n}\n',
      },
      ruby: {
        method: 'machines.wake',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nmachine = dedalus.machines.wake(machine_id: "dm-3")\n\nputs(machine)',
      },
      cli: {
        method: 'machines wake',
        example: "dedalus machines wake \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3",
      },
      php: {
        method: 'machines->wake',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$machine = $client->machines->wake(machineID: 'dm-3');\n\nvar_dump($machine);",
      },
      csharp: {
        method: 'Machines.Wake',
        example:
          'MachineWakeParams parameters = new() { MachineID = "dm-3" };\n\nvar machine = await client.Machines.Wake(parameters);\n\nConsole.WriteLine(machine);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/wake \\\n    -X POST \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      "## list\n\n`client.machines.artifacts.list(machine_id: string, cursor?: string, limit?: number): { artifact_id: string; created_at: string; machine_id: string; name: string; size_bytes: number; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }`\n\n**get** `/v1/machines/{machine_id}/artifacts`\n\nList artifacts\n\n### Parameters\n\n- `machine_id: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ artifact_id: string; created_at: string; machine_id: string; name: string; size_bytes: number; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }`\n\n  - `artifact_id: string`\n  - `created_at: string`\n  - `machine_id: string`\n  - `name: string`\n  - `size_bytes: number`\n  - `download_url?: string`\n  - `execution_id?: string`\n  - `expires_at?: string`\n  - `mime_type?: string`\n  - `sha256?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const artifact of client.machines.artifacts.list({ machine_id: 'dm-3' })) {\n  console.log(artifact);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.artifacts.list',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const artifact of client.machines.artifacts.list({ machine_id: 'dm-3' })) {\n  console.log(artifact.artifact_id);\n}",
      },
      python: {
        method: 'machines.artifacts.list',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.machines.artifacts.list(\n    machine_id="dm-3",\n)\npage = page.items[0]\nprint(page.artifact_id)',
      },
      java: {
        method: 'machines().artifacts().list',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.artifacts.ArtifactListPage;\nimport com.dedalus.api.models.machines.artifacts.ArtifactListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        ArtifactListParams params = ArtifactListParams.builder()\n            .machineId("dm-3")\n            .build();\n        ArtifactListPage page = client.machines().artifacts().list(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().artifacts().list',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.artifacts.ArtifactListPage\nimport com.dedalus.api.models.machines.artifacts.ArtifactListParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: ArtifactListParams = ArtifactListParams.builder()\n        .machineId("dm-3")\n        .build()\n    val page: ArtifactListPage = client.machines().artifacts().list(params)\n}',
      },
      go: {
        method: 'client.Machines.Artifacts.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Machines.Artifacts.List(context.TODO(), dedalus.MachineArtifactListParams{\n\t\tMachineID: "dm-3",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'machines.artifacts.list',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\npage = dedalus.machines.artifacts.list(machine_id: "dm-3")\n\nputs(page)',
      },
      cli: {
        method: 'artifacts list',
        example: "dedalus machines:artifacts list \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3",
      },
      php: {
        method: 'machines->artifacts->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->machines->artifacts->list(\n  machineID: 'dm-3', cursor: 'cursor', limit: 0\n);\n\nvar_dump($page);",
      },
      csharp: {
        method: 'Machines.Artifacts.List',
        example:
          'ArtifactListParams parameters = new() { MachineID = "dm-3" };\n\nvar page = await client.Machines.Artifacts.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/artifacts \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      "## retrieve\n\n`client.machines.artifacts.retrieve(machine_id: string, artifact_id: string): { artifact_id: string; created_at: string; machine_id: string; name: string; size_bytes: number; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }`\n\n**get** `/v1/machines/{machine_id}/artifacts/{artifact_id}`\n\nGet artifact\n\n### Parameters\n\n- `machine_id: string`\n\n- `artifact_id: string`\n\n### Returns\n\n- `{ artifact_id: string; created_at: string; machine_id: string; name: string; size_bytes: number; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }`\n\n  - `artifact_id: string`\n  - `created_at: string`\n  - `machine_id: string`\n  - `name: string`\n  - `size_bytes: number`\n  - `download_url?: string`\n  - `execution_id?: string`\n  - `expires_at?: string`\n  - `mime_type?: string`\n  - `sha256?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst artifact = await client.machines.artifacts.retrieve({ machine_id: 'dm-3', artifact_id: 'artifact_id' });\n\nconsole.log(artifact);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.artifacts.retrieve',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst artifact = await client.machines.artifacts.retrieve({\n  machine_id: 'dm-3',\n  artifact_id: 'artifact_id',\n});\n\nconsole.log(artifact.artifact_id);",
      },
      python: {
        method: 'machines.artifacts.retrieve',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nartifact = client.machines.artifacts.retrieve(\n    machine_id="dm-3",\n    artifact_id="artifact_id",\n)\nprint(artifact.artifact_id)',
      },
      java: {
        method: 'machines().artifacts().retrieve',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.artifacts.Artifact;\nimport com.dedalus.api.models.machines.artifacts.ArtifactRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        ArtifactRetrieveParams params = ArtifactRetrieveParams.builder()\n            .machineId("dm-3")\n            .artifactId("artifact_id")\n            .build();\n        Artifact artifact = client.machines().artifacts().retrieve(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().artifacts().retrieve',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.artifacts.Artifact\nimport com.dedalus.api.models.machines.artifacts.ArtifactRetrieveParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: ArtifactRetrieveParams = ArtifactRetrieveParams.builder()\n        .machineId("dm-3")\n        .artifactId("artifact_id")\n        .build()\n    val artifact: Artifact = client.machines().artifacts().retrieve(params)\n}',
      },
      go: {
        method: 'client.Machines.Artifacts.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tartifact, err := client.Machines.Artifacts.Get(context.TODO(), dedalus.MachineArtifactGetParams{\n\t\tMachineID:  "dm-3",\n\t\tArtifactID: "artifact_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", artifact.ArtifactID)\n}\n',
      },
      ruby: {
        method: 'machines.artifacts.retrieve',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nartifact = dedalus.machines.artifacts.retrieve(machine_id: "dm-3", artifact_id: "artifact_id")\n\nputs(artifact)',
      },
      cli: {
        method: 'artifacts retrieve',
        example:
          "dedalus machines:artifacts retrieve \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3 \\\n  --artifact-id artifact_id",
      },
      php: {
        method: 'machines->artifacts->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$artifact = $client->machines->artifacts->retrieve(\n  machineID: 'dm-3', artifactID: 'artifact_id'\n);\n\nvar_dump($artifact);",
      },
      csharp: {
        method: 'Machines.Artifacts.Retrieve',
        example:
          'ArtifactRetrieveParams parameters = new()\n{\n    MachineID = "dm-3",\n    ArtifactID = "artifact_id",\n};\n\nvar artifact = await client.Machines.Artifacts.Retrieve(parameters);\n\nConsole.WriteLine(artifact);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/artifacts/$ARTIFACT_ID \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      "## delete\n\n`client.machines.artifacts.delete(machine_id: string, artifact_id: string): { artifact_id: string; created_at: string; machine_id: string; name: string; size_bytes: number; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }`\n\n**delete** `/v1/machines/{machine_id}/artifacts/{artifact_id}`\n\nDelete artifact\n\n### Parameters\n\n- `machine_id: string`\n\n- `artifact_id: string`\n\n### Returns\n\n- `{ artifact_id: string; created_at: string; machine_id: string; name: string; size_bytes: number; download_url?: string; execution_id?: string; expires_at?: string; mime_type?: string; sha256?: string; }`\n\n  - `artifact_id: string`\n  - `created_at: string`\n  - `machine_id: string`\n  - `name: string`\n  - `size_bytes: number`\n  - `download_url?: string`\n  - `execution_id?: string`\n  - `expires_at?: string`\n  - `mime_type?: string`\n  - `sha256?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst artifact = await client.machines.artifacts.delete({ machine_id: 'dm-3', artifact_id: 'artifact_id' });\n\nconsole.log(artifact);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.artifacts.delete',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst artifact = await client.machines.artifacts.delete({\n  machine_id: 'dm-3',\n  artifact_id: 'artifact_id',\n});\n\nconsole.log(artifact.artifact_id);",
      },
      python: {
        method: 'machines.artifacts.delete',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nartifact = client.machines.artifacts.delete(\n    machine_id="dm-3",\n    artifact_id="artifact_id",\n)\nprint(artifact.artifact_id)',
      },
      java: {
        method: 'machines().artifacts().delete',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.artifacts.Artifact;\nimport com.dedalus.api.models.machines.artifacts.ArtifactDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        ArtifactDeleteParams params = ArtifactDeleteParams.builder()\n            .machineId("dm-3")\n            .artifactId("artifact_id")\n            .build();\n        Artifact artifact = client.machines().artifacts().delete(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().artifacts().delete',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.artifacts.Artifact\nimport com.dedalus.api.models.machines.artifacts.ArtifactDeleteParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: ArtifactDeleteParams = ArtifactDeleteParams.builder()\n        .machineId("dm-3")\n        .artifactId("artifact_id")\n        .build()\n    val artifact: Artifact = client.machines().artifacts().delete(params)\n}',
      },
      go: {
        method: 'client.Machines.Artifacts.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tartifact, err := client.Machines.Artifacts.Delete(context.TODO(), dedalus.MachineArtifactDeleteParams{\n\t\tMachineID:  "dm-3",\n\t\tArtifactID: "artifact_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", artifact.ArtifactID)\n}\n',
      },
      ruby: {
        method: 'machines.artifacts.delete',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nartifact = dedalus.machines.artifacts.delete(machine_id: "dm-3", artifact_id: "artifact_id")\n\nputs(artifact)',
      },
      cli: {
        method: 'artifacts delete',
        example:
          "dedalus machines:artifacts delete \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3 \\\n  --artifact-id artifact_id",
      },
      php: {
        method: 'machines->artifacts->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$artifact = $client->machines->artifacts->delete(\n  machineID: 'dm-3', artifactID: 'artifact_id'\n);\n\nvar_dump($artifact);",
      },
      csharp: {
        method: 'Machines.Artifacts.Delete',
        example:
          'ArtifactDeleteParams parameters = new()\n{\n    MachineID = "dm-3",\n    ArtifactID = "artifact_id",\n};\n\nvar artifact = await client.Machines.Artifacts.Delete(parameters);\n\nConsole.WriteLine(artifact);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/artifacts/$ARTIFACT_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      "## list\n\n`client.machines.previews.list(machine_id: string, cursor?: string, limit?: number): { created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n**get** `/v1/machines/{machine_id}/previews`\n\nList previews\n\n### Parameters\n\n- `machine_id: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n  - `created_at: string`\n  - `machine_id: string`\n  - `port: number`\n  - `preview_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `visibility: 'public' | 'private' | 'org'`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'http' | 'https'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const preview of client.machines.previews.list({ machine_id: 'dm-3' })) {\n  console.log(preview);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.previews.list',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const preview of client.machines.previews.list({ machine_id: 'dm-3' })) {\n  console.log(preview.machine_id);\n}",
      },
      python: {
        method: 'machines.previews.list',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.machines.previews.list(\n    machine_id="dm-3",\n)\npage = page.items[0]\nprint(page.machine_id)',
      },
      java: {
        method: 'machines().previews().list',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.previews.PreviewListPage;\nimport com.dedalus.api.models.machines.previews.PreviewListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        PreviewListParams params = PreviewListParams.builder()\n            .machineId("dm-3")\n            .build();\n        PreviewListPage page = client.machines().previews().list(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().previews().list',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.previews.PreviewListPage\nimport com.dedalus.api.models.machines.previews.PreviewListParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: PreviewListParams = PreviewListParams.builder()\n        .machineId("dm-3")\n        .build()\n    val page: PreviewListPage = client.machines().previews().list(params)\n}',
      },
      go: {
        method: 'client.Machines.Previews.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Machines.Previews.List(context.TODO(), dedalus.MachinePreviewListParams{\n\t\tMachineID: "dm-3",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'machines.previews.list',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\npage = dedalus.machines.previews.list(machine_id: "dm-3")\n\nputs(page)',
      },
      cli: {
        method: 'previews list',
        example: "dedalus machines:previews list \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3",
      },
      php: {
        method: 'machines->previews->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->machines->previews->list(\n  machineID: 'dm-3', cursor: 'cursor', limit: 0\n);\n\nvar_dump($page);",
      },
      csharp: {
        method: 'Machines.Previews.List',
        example:
          'PreviewListParams parameters = new() { MachineID = "dm-3" };\n\nvar page = await client.Machines.Previews.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/previews \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      "## create\n\n`client.machines.previews.create(machine_id: string, port: number, protocol?: 'http' | 'https', visibility?: 'public' | 'private' | 'org'): { created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n**post** `/v1/machines/{machine_id}/previews`\n\nCreate preview\n\n### Parameters\n\n- `machine_id: string`\n\n- `port: number`\n\n- `protocol?: 'http' | 'https'`\n\n- `visibility?: 'public' | 'private' | 'org'`\n\n### Returns\n\n- `{ created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n  - `created_at: string`\n  - `machine_id: string`\n  - `port: number`\n  - `preview_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `visibility: 'public' | 'private' | 'org'`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'http' | 'https'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst preview = await client.machines.previews.create({ machine_id: 'dm-3', port: 0 });\n\nconsole.log(preview);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.previews.create',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst preview = await client.machines.previews.create({ machine_id: 'dm-3', port: 0 });\n\nconsole.log(preview.preview_id);",
      },
      python: {
        method: 'machines.previews.create',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npreview = client.machines.previews.create(\n    machine_id="dm-3",\n    port=0,\n)\nprint(preview.preview_id)',
      },
      java: {
        method: 'machines().previews().create',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.previews.Preview;\nimport com.dedalus.api.models.machines.previews.PreviewCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        PreviewCreateParams params = PreviewCreateParams.builder()\n            .machineId("dm-3")\n            .previewCreateParams(PreviewCreateParams.builder()\n                .port(0L)\n                .build())\n            .build();\n        Preview preview = client.machines().previews().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().previews().create',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.previews.Preview\nimport com.dedalus.api.models.machines.previews.PreviewCreateParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: PreviewCreateParams = PreviewCreateParams.builder()\n        .machineId("dm-3")\n        .previewCreateParams(PreviewCreateParams.builder()\n            .port(0L)\n            .build())\n        .build()\n    val preview: Preview = client.machines().previews().create(params)\n}',
      },
      go: {
        method: 'client.Machines.Previews.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpreview, err := client.Machines.Previews.New(context.TODO(), dedalus.MachinePreviewNewParams{\n\t\tMachineID: "dm-3",\n\t\tPreviewCreateParams: dedalus.PreviewCreateParams{\n\t\t\tPort: 0,\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", preview.PreviewID)\n}\n',
      },
      ruby: {
        method: 'machines.previews.create',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\npreview = dedalus.machines.previews.create(machine_id: "dm-3", port: 0)\n\nputs(preview)',
      },
      cli: {
        method: 'previews create',
        example:
          "dedalus machines:previews create \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3 \\\n  --port 0",
      },
      php: {
        method: 'machines->previews->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$preview = $client->machines->previews->create(\n  machineID: 'dm-3', port: 0, protocol: 'http', visibility: 'public'\n);\n\nvar_dump($preview);",
      },
      csharp: {
        method: 'Machines.Previews.Create',
        example:
          'PreviewCreateParams parameters = new()\n{\n    MachineID = "dm-3",\n    Port = 0,\n};\n\nvar preview = await client.Machines.Previews.Create(parameters);\n\nConsole.WriteLine(preview);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/previews \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY" \\\n    -d \'{\n          "port": 0\n        }\'',
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
      "## retrieve\n\n`client.machines.previews.retrieve(machine_id: string, preview_id: string): { created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n**get** `/v1/machines/{machine_id}/previews/{preview_id}`\n\nGet preview\n\n### Parameters\n\n- `machine_id: string`\n\n- `preview_id: string`\n\n### Returns\n\n- `{ created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n  - `created_at: string`\n  - `machine_id: string`\n  - `port: number`\n  - `preview_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `visibility: 'public' | 'private' | 'org'`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'http' | 'https'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst preview = await client.machines.previews.retrieve({ machine_id: 'dm-3', preview_id: 'preview_id' });\n\nconsole.log(preview);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.previews.retrieve',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst preview = await client.machines.previews.retrieve({\n  machine_id: 'dm-3',\n  preview_id: 'preview_id',\n});\n\nconsole.log(preview.preview_id);",
      },
      python: {
        method: 'machines.previews.retrieve',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npreview = client.machines.previews.retrieve(\n    machine_id="dm-3",\n    preview_id="preview_id",\n)\nprint(preview.preview_id)',
      },
      java: {
        method: 'machines().previews().retrieve',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.previews.Preview;\nimport com.dedalus.api.models.machines.previews.PreviewRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        PreviewRetrieveParams params = PreviewRetrieveParams.builder()\n            .machineId("dm-3")\n            .previewId("preview_id")\n            .build();\n        Preview preview = client.machines().previews().retrieve(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().previews().retrieve',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.previews.Preview\nimport com.dedalus.api.models.machines.previews.PreviewRetrieveParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: PreviewRetrieveParams = PreviewRetrieveParams.builder()\n        .machineId("dm-3")\n        .previewId("preview_id")\n        .build()\n    val preview: Preview = client.machines().previews().retrieve(params)\n}',
      },
      go: {
        method: 'client.Machines.Previews.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpreview, err := client.Machines.Previews.Get(context.TODO(), dedalus.MachinePreviewGetParams{\n\t\tMachineID: "dm-3",\n\t\tPreviewID: "preview_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", preview.PreviewID)\n}\n',
      },
      ruby: {
        method: 'machines.previews.retrieve',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\npreview = dedalus.machines.previews.retrieve(machine_id: "dm-3", preview_id: "preview_id")\n\nputs(preview)',
      },
      cli: {
        method: 'previews retrieve',
        example:
          "dedalus machines:previews retrieve \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3 \\\n  --preview-id preview_id",
      },
      php: {
        method: 'machines->previews->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$preview = $client->machines->previews->retrieve(\n  machineID: 'dm-3', previewID: 'preview_id'\n);\n\nvar_dump($preview);",
      },
      csharp: {
        method: 'Machines.Previews.Retrieve',
        example:
          'PreviewRetrieveParams parameters = new()\n{\n    MachineID = "dm-3",\n    PreviewID = "preview_id",\n};\n\nvar preview = await client.Machines.Previews.Retrieve(parameters);\n\nConsole.WriteLine(preview);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/previews/$PREVIEW_ID \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      "## delete\n\n`client.machines.previews.delete(machine_id: string, preview_id: string): { created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n**delete** `/v1/machines/{machine_id}/previews/{preview_id}`\n\nDelete preview\n\n### Parameters\n\n- `machine_id: string`\n\n- `preview_id: string`\n\n### Returns\n\n- `{ created_at: string; machine_id: string; port: number; preview_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; visibility: 'public' | 'private' | 'org'; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'http' | 'https'; ready_at?: string; retry_after_ms?: number; url?: string; }`\n\n  - `created_at: string`\n  - `machine_id: string`\n  - `port: number`\n  - `preview_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `visibility: 'public' | 'private' | 'org'`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'http' | 'https'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst preview = await client.machines.previews.delete({ machine_id: 'dm-3', preview_id: 'preview_id' });\n\nconsole.log(preview);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.previews.delete',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst preview = await client.machines.previews.delete({\n  machine_id: 'dm-3',\n  preview_id: 'preview_id',\n});\n\nconsole.log(preview.preview_id);",
      },
      python: {
        method: 'machines.previews.delete',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npreview = client.machines.previews.delete(\n    machine_id="dm-3",\n    preview_id="preview_id",\n)\nprint(preview.preview_id)',
      },
      java: {
        method: 'machines().previews().delete',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.previews.Preview;\nimport com.dedalus.api.models.machines.previews.PreviewDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        PreviewDeleteParams params = PreviewDeleteParams.builder()\n            .machineId("dm-3")\n            .previewId("preview_id")\n            .build();\n        Preview preview = client.machines().previews().delete(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().previews().delete',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.previews.Preview\nimport com.dedalus.api.models.machines.previews.PreviewDeleteParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: PreviewDeleteParams = PreviewDeleteParams.builder()\n        .machineId("dm-3")\n        .previewId("preview_id")\n        .build()\n    val preview: Preview = client.machines().previews().delete(params)\n}',
      },
      go: {
        method: 'client.Machines.Previews.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpreview, err := client.Machines.Previews.Delete(context.TODO(), dedalus.MachinePreviewDeleteParams{\n\t\tMachineID: "dm-3",\n\t\tPreviewID: "preview_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", preview.PreviewID)\n}\n',
      },
      ruby: {
        method: 'machines.previews.delete',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\npreview = dedalus.machines.previews.delete(machine_id: "dm-3", preview_id: "preview_id")\n\nputs(preview)',
      },
      cli: {
        method: 'previews delete',
        example:
          "dedalus machines:previews delete \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3 \\\n  --preview-id preview_id",
      },
      php: {
        method: 'machines->previews->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$preview = $client->machines->previews->delete(\n  machineID: 'dm-3', previewID: 'preview_id'\n);\n\nvar_dump($preview);",
      },
      csharp: {
        method: 'Machines.Previews.Delete',
        example:
          'PreviewDeleteParams parameters = new()\n{\n    MachineID = "dm-3",\n    PreviewID = "preview_id",\n};\n\nvar preview = await client.Machines.Previews.Delete(parameters);\n\nConsole.WriteLine(preview);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/previews/$PREVIEW_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      "## list\n\n`client.machines.ssh.list(machine_id: string, cursor?: string, limit?: number): { created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: ssh_connection; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n**get** `/v1/machines/{machine_id}/ssh`\n\nList SSH sessions\n\n### Parameters\n\n- `machine_id: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n  - `created_at: string`\n  - `machine_id: string`\n  - `session_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: { host_pattern: string; kind: 'cert_authority'; public_key: string; }; user_certificate?: string; }`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const sshSession of client.machines.ssh.list({ machine_id: 'dm-3' })) {\n  console.log(sshSession);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.ssh.list',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const sshSession of client.machines.ssh.list({ machine_id: 'dm-3' })) {\n  console.log(sshSession.machine_id);\n}",
      },
      python: {
        method: 'machines.ssh.list',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.machines.ssh.list(\n    machine_id="dm-3",\n)\npage = page.items[0]\nprint(page.machine_id)',
      },
      java: {
        method: 'machines().ssh().list',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.ssh.SshListPage;\nimport com.dedalus.api.models.machines.ssh.SshListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        SshListParams params = SshListParams.builder()\n            .machineId("dm-3")\n            .build();\n        SshListPage page = client.machines().ssh().list(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().ssh().list',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.ssh.SshListPage\nimport com.dedalus.api.models.machines.ssh.SshListParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: SshListParams = SshListParams.builder()\n        .machineId("dm-3")\n        .build()\n    val page: SshListPage = client.machines().ssh().list(params)\n}',
      },
      go: {
        method: 'client.Machines.SSH.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Machines.SSH.List(context.TODO(), dedalus.MachineSSHListParams{\n\t\tMachineID: "dm-3",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'machines.ssh.list',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\npage = dedalus.machines.ssh.list(machine_id: "dm-3")\n\nputs(page)',
      },
      cli: {
        method: 'ssh list',
        example: "dedalus machines:ssh list \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3",
      },
      php: {
        method: 'machines->ssh->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->machines->ssh->list(\n  machineID: 'dm-3', cursor: 'cursor', limit: 0\n);\n\nvar_dump($page);",
      },
      csharp: {
        method: 'Machines.Ssh.List',
        example:
          'SshListParams parameters = new() { MachineID = "dm-3" };\n\nvar page = await client.Machines.Ssh.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/ssh \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      "## create\n\n`client.machines.ssh.create(machine_id: string, public_key: string): { created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: ssh_connection; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n**post** `/v1/machines/{machine_id}/ssh`\n\nCreate SSH session\n\n### Parameters\n\n- `machine_id: string`\n\n- `public_key: string`\n\n### Returns\n\n- `{ created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n  - `created_at: string`\n  - `machine_id: string`\n  - `session_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: { host_pattern: string; kind: 'cert_authority'; public_key: string; }; user_certificate?: string; }`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst sshSession = await client.machines.ssh.create({ machine_id: 'dm-3', public_key: 'public_key' });\n\nconsole.log(sshSession);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.ssh.create',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst sshSession = await client.machines.ssh.create({\n  machine_id: 'dm-3',\n  public_key: 'public_key',\n});\n\nconsole.log(sshSession.session_id);",
      },
      python: {
        method: 'machines.ssh.create',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nssh_session = client.machines.ssh.create(\n    machine_id="dm-3",\n    public_key="public_key",\n)\nprint(ssh_session.session_id)',
      },
      java: {
        method: 'machines().ssh().create',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.ssh.SshCreateParams;\nimport com.dedalus.api.models.machines.ssh.SshSession;\nimport com.dedalus.api.models.machines.ssh.SshSessionCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        SshCreateParams params = SshCreateParams.builder()\n            .machineId("dm-3")\n            .sshSessionCreateParams(SshSessionCreateParams.builder()\n                .publicKey("public_key")\n                .build())\n            .build();\n        SshSession sshSession = client.machines().ssh().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().ssh().create',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.ssh.SshCreateParams\nimport com.dedalus.api.models.machines.ssh.SshSession\nimport com.dedalus.api.models.machines.ssh.SshSessionCreateParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: SshCreateParams = SshCreateParams.builder()\n        .machineId("dm-3")\n        .sshSessionCreateParams(SshSessionCreateParams.builder()\n            .publicKey("public_key")\n            .build())\n        .build()\n    val sshSession: SshSession = client.machines().ssh().create(params)\n}',
      },
      go: {
        method: 'client.Machines.SSH.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsshSession, err := client.Machines.SSH.New(context.TODO(), dedalus.MachineSSHNewParams{\n\t\tMachineID: "dm-3",\n\t\tSSHSessionCreateParams: dedalus.SSHSessionCreateParams{\n\t\t\tPublicKey: "public_key",\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", sshSession.SessionID)\n}\n',
      },
      ruby: {
        method: 'machines.ssh.create',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nssh_session = dedalus.machines.ssh.create(machine_id: "dm-3", public_key: "public_key")\n\nputs(ssh_session)',
      },
      cli: {
        method: 'ssh create',
        example:
          "dedalus machines:ssh create \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3 \\\n  --public-key public_key",
      },
      php: {
        method: 'machines->ssh->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$sshSession = $client->machines->ssh->create(\n  machineID: 'dm-3', publicKey: 'public_key'\n);\n\nvar_dump($sshSession);",
      },
      csharp: {
        method: 'Machines.Ssh.Create',
        example:
          'SshCreateParams parameters = new()\n{\n    MachineID = "dm-3",\n    PublicKey = "public_key",\n};\n\nvar sshSession = await client.Machines.Ssh.Create(parameters);\n\nConsole.WriteLine(sshSession);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/ssh \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY" \\\n    -d \'{\n          "public_key": "public_key"\n        }\'',
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
      "## retrieve\n\n`client.machines.ssh.retrieve(machine_id: string, session_id: string): { created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: ssh_connection; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n**get** `/v1/machines/{machine_id}/ssh/{session_id}`\n\nGet SSH session\n\n### Parameters\n\n- `machine_id: string`\n\n- `session_id: string`\n\n### Returns\n\n- `{ created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n  - `created_at: string`\n  - `machine_id: string`\n  - `session_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: { host_pattern: string; kind: 'cert_authority'; public_key: string; }; user_certificate?: string; }`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst sshSession = await client.machines.ssh.retrieve({ machine_id: 'dm-3', session_id: 'session_id' });\n\nconsole.log(sshSession);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.ssh.retrieve',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst sshSession = await client.machines.ssh.retrieve({\n  machine_id: 'dm-3',\n  session_id: 'session_id',\n});\n\nconsole.log(sshSession.session_id);",
      },
      python: {
        method: 'machines.ssh.retrieve',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nssh_session = client.machines.ssh.retrieve(\n    machine_id="dm-3",\n    session_id="session_id",\n)\nprint(ssh_session.session_id)',
      },
      java: {
        method: 'machines().ssh().retrieve',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.ssh.SshRetrieveParams;\nimport com.dedalus.api.models.machines.ssh.SshSession;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        SshRetrieveParams params = SshRetrieveParams.builder()\n            .machineId("dm-3")\n            .sessionId("session_id")\n            .build();\n        SshSession sshSession = client.machines().ssh().retrieve(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().ssh().retrieve',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.ssh.SshRetrieveParams\nimport com.dedalus.api.models.machines.ssh.SshSession\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: SshRetrieveParams = SshRetrieveParams.builder()\n        .machineId("dm-3")\n        .sessionId("session_id")\n        .build()\n    val sshSession: SshSession = client.machines().ssh().retrieve(params)\n}',
      },
      go: {
        method: 'client.Machines.SSH.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsshSession, err := client.Machines.SSH.Get(context.TODO(), dedalus.MachineSSHGetParams{\n\t\tMachineID: "dm-3",\n\t\tSessionID: "session_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", sshSession.SessionID)\n}\n',
      },
      ruby: {
        method: 'machines.ssh.retrieve',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nssh_session = dedalus.machines.ssh.retrieve(machine_id: "dm-3", session_id: "session_id")\n\nputs(ssh_session)',
      },
      cli: {
        method: 'ssh retrieve',
        example:
          "dedalus machines:ssh retrieve \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3 \\\n  --session-id session_id",
      },
      php: {
        method: 'machines->ssh->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$sshSession = $client->machines->ssh->retrieve(\n  machineID: 'dm-3', sessionID: 'session_id'\n);\n\nvar_dump($sshSession);",
      },
      csharp: {
        method: 'Machines.Ssh.Retrieve',
        example:
          'SshRetrieveParams parameters = new()\n{\n    MachineID = "dm-3",\n    SessionID = "session_id",\n};\n\nvar sshSession = await client.Machines.Ssh.Retrieve(parameters);\n\nConsole.WriteLine(sshSession);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/ssh/$SESSION_ID \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      "## delete\n\n`client.machines.ssh.delete(machine_id: string, session_id: string): { created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: ssh_connection; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n**delete** `/v1/machines/{machine_id}/ssh/{session_id}`\n\nDelete SSH session\n\n### Parameters\n\n- `machine_id: string`\n\n- `session_id: string`\n\n### Returns\n\n- `{ created_at: string; machine_id: string; session_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: ssh_host_trust; user_certificate?: string; }; error_code?: string; error_message?: string; expires_at?: string; ready_at?: string; retry_after_ms?: number; }`\n\n  - `created_at: string`\n  - `machine_id: string`\n  - `session_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `connection?: { endpoint: string; port: number; ssh_username: string; host_trust?: { host_pattern: string; kind: 'cert_authority'; public_key: string; }; user_certificate?: string; }`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst sshSession = await client.machines.ssh.delete({ machine_id: 'dm-3', session_id: 'session_id' });\n\nconsole.log(sshSession);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.ssh.delete',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst sshSession = await client.machines.ssh.delete({\n  machine_id: 'dm-3',\n  session_id: 'session_id',\n});\n\nconsole.log(sshSession.session_id);",
      },
      python: {
        method: 'machines.ssh.delete',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nssh_session = client.machines.ssh.delete(\n    machine_id="dm-3",\n    session_id="session_id",\n)\nprint(ssh_session.session_id)',
      },
      java: {
        method: 'machines().ssh().delete',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.ssh.SshDeleteParams;\nimport com.dedalus.api.models.machines.ssh.SshSession;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        SshDeleteParams params = SshDeleteParams.builder()\n            .machineId("dm-3")\n            .sessionId("session_id")\n            .build();\n        SshSession sshSession = client.machines().ssh().delete(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().ssh().delete',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.ssh.SshDeleteParams\nimport com.dedalus.api.models.machines.ssh.SshSession\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: SshDeleteParams = SshDeleteParams.builder()\n        .machineId("dm-3")\n        .sessionId("session_id")\n        .build()\n    val sshSession: SshSession = client.machines().ssh().delete(params)\n}',
      },
      go: {
        method: 'client.Machines.SSH.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsshSession, err := client.Machines.SSH.Delete(context.TODO(), dedalus.MachineSSHDeleteParams{\n\t\tMachineID: "dm-3",\n\t\tSessionID: "session_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", sshSession.SessionID)\n}\n',
      },
      ruby: {
        method: 'machines.ssh.delete',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nssh_session = dedalus.machines.ssh.delete(machine_id: "dm-3", session_id: "session_id")\n\nputs(ssh_session)',
      },
      cli: {
        method: 'ssh delete',
        example:
          "dedalus machines:ssh delete \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3 \\\n  --session-id session_id",
      },
      php: {
        method: 'machines->ssh->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$sshSession = $client->machines->ssh->delete(\n  machineID: 'dm-3', sessionID: 'session_id'\n);\n\nvar_dump($sshSession);",
      },
      csharp: {
        method: 'Machines.Ssh.Delete',
        example:
          'SshDeleteParams parameters = new()\n{\n    MachineID = "dm-3",\n    SessionID = "session_id",\n};\n\nvar sshSession = await client.Machines.Ssh.Delete(parameters);\n\nConsole.WriteLine(sshSession);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/ssh/$SESSION_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      "## list\n\n`client.machines.executions.list(machine_id: string, cursor?: string, limit?: number): { command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: artifact_ref[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n**get** `/v1/machines/{machine_id}/executions`\n\nList executions\n\n### Parameters\n\n- `machine_id: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n  - `command: string[]`\n  - `created_at: string`\n  - `execution_id: string`\n  - `machine_id: string`\n  - `status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'`\n  - `artifacts?: { artifact_id: string; name: string; }[]`\n  - `completed_at?: string`\n  - `cwd?: string`\n  - `env_keys?: string[]`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `exit_code?: number`\n  - `expires_at?: string`\n  - `retry_after_ms?: number`\n  - `signal?: number`\n  - `started_at?: string`\n  - `stderr_bytes?: number`\n  - `stderr_truncated?: boolean`\n  - `stdout_bytes?: number`\n  - `stdout_truncated?: boolean`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const execution of client.machines.executions.list({ machine_id: 'dm-3' })) {\n  console.log(execution);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.executions.list',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const execution of client.machines.executions.list({ machine_id: 'dm-3' })) {\n  console.log(execution.execution_id);\n}",
      },
      python: {
        method: 'machines.executions.list',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.machines.executions.list(\n    machine_id="dm-3",\n)\npage = page.items[0]\nprint(page.execution_id)',
      },
      java: {
        method: 'machines().executions().list',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.executions.ExecutionListPage;\nimport com.dedalus.api.models.machines.executions.ExecutionListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        ExecutionListParams params = ExecutionListParams.builder()\n            .machineId("dm-3")\n            .build();\n        ExecutionListPage page = client.machines().executions().list(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().executions().list',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.executions.ExecutionListPage\nimport com.dedalus.api.models.machines.executions.ExecutionListParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: ExecutionListParams = ExecutionListParams.builder()\n        .machineId("dm-3")\n        .build()\n    val page: ExecutionListPage = client.machines().executions().list(params)\n}',
      },
      go: {
        method: 'client.Machines.Executions.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Machines.Executions.List(context.TODO(), dedalus.MachineExecutionListParams{\n\t\tMachineID: "dm-3",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'machines.executions.list',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\npage = dedalus.machines.executions.list(machine_id: "dm-3")\n\nputs(page)',
      },
      cli: {
        method: 'executions list',
        example: "dedalus machines:executions list \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3",
      },
      php: {
        method: 'machines->executions->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->machines->executions->list(\n  machineID: 'dm-3', cursor: 'cursor', limit: 0\n);\n\nvar_dump($page);",
      },
      csharp: {
        method: 'Machines.Executions.List',
        example:
          'ExecutionListParams parameters = new() { MachineID = "dm-3" };\n\nvar page = await client.Machines.Executions.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/executions \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      "## create\n\n`client.machines.executions.create(machine_id: string, command: string[], cwd?: string, env?: object, stdin?: string, timeout_ms?: number): { command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: artifact_ref[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n**post** `/v1/machines/{machine_id}/executions`\n\nCreate execution\n\n### Parameters\n\n- `machine_id: string`\n\n- `command: string[]`\n\n- `cwd?: string`\n\n- `env?: object`\n\n- `stdin?: string`\n\n- `timeout_ms?: number`\n\n### Returns\n\n- `{ command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n  - `command: string[]`\n  - `created_at: string`\n  - `execution_id: string`\n  - `machine_id: string`\n  - `status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'`\n  - `artifacts?: { artifact_id: string; name: string; }[]`\n  - `completed_at?: string`\n  - `cwd?: string`\n  - `env_keys?: string[]`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `exit_code?: number`\n  - `expires_at?: string`\n  - `retry_after_ms?: number`\n  - `signal?: number`\n  - `started_at?: string`\n  - `stderr_bytes?: number`\n  - `stderr_truncated?: boolean`\n  - `stdout_bytes?: number`\n  - `stdout_truncated?: boolean`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst execution = await client.machines.executions.create({ machine_id: 'dm-3', command: ['string'] });\n\nconsole.log(execution);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.executions.create',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst execution = await client.machines.executions.create({\n  machine_id: 'dm-3',\n  command: ['string'],\n});\n\nconsole.log(execution.execution_id);",
      },
      python: {
        method: 'machines.executions.create',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nexecution = client.machines.executions.create(\n    machine_id="dm-3",\n    command=["string"],\n)\nprint(execution.execution_id)',
      },
      java: {
        method: 'machines().executions().create',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.executions.Execution;\nimport com.dedalus.api.models.machines.executions.ExecutionCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        ExecutionCreateParams params = ExecutionCreateParams.builder()\n            .machineId("dm-3")\n            .executionCreateParams(ExecutionCreateParams.builder()\n                .addCommand("string")\n                .build())\n            .build();\n        Execution execution = client.machines().executions().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().executions().create',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.executions.Execution\nimport com.dedalus.api.models.machines.executions.ExecutionCreateParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: ExecutionCreateParams = ExecutionCreateParams.builder()\n        .machineId("dm-3")\n        .executionCreateParams(ExecutionCreateParams.builder()\n            .addCommand("string")\n            .build())\n        .build()\n    val execution: Execution = client.machines().executions().create(params)\n}',
      },
      go: {
        method: 'client.Machines.Executions.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\texecution, err := client.Machines.Executions.New(context.TODO(), dedalus.MachineExecutionNewParams{\n\t\tMachineID: "dm-3",\n\t\tExecutionCreateParams: dedalus.ExecutionCreateParams{\n\t\t\tCommand: []string{"string"},\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", execution.ExecutionID)\n}\n',
      },
      ruby: {
        method: 'machines.executions.create',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nexecution = dedalus.machines.executions.create(machine_id: "dm-3", command: ["string"])\n\nputs(execution)',
      },
      cli: {
        method: 'executions create',
        example:
          "dedalus machines:executions create \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3 \\\n  --command string",
      },
      php: {
        method: 'machines->executions->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$execution = $client->machines->executions->create(\n  machineID: 'dm-3',\n  command: ['string'],\n  cwd: 'cwd',\n  env: ['foo' => 'string'],\n  stdin: 'stdin',\n  timeoutMs: 0,\n);\n\nvar_dump($execution);",
      },
      csharp: {
        method: 'Machines.Executions.Create',
        example:
          'ExecutionCreateParams parameters = new()\n{\n    MachineID = "dm-3",\n    Command =\n    [\n        "string"\n    ],\n};\n\nvar execution = await client.Machines.Executions.Create(parameters);\n\nConsole.WriteLine(execution);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/executions \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY" \\\n    -d \'{\n          "command": [\n            "string"\n          ]\n        }\'',
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
      "## retrieve\n\n`client.machines.executions.retrieve(machine_id: string, execution_id: string): { command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: artifact_ref[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n**get** `/v1/machines/{machine_id}/executions/{execution_id}`\n\nGet execution\n\n### Parameters\n\n- `machine_id: string`\n\n- `execution_id: string`\n\n### Returns\n\n- `{ command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n  - `command: string[]`\n  - `created_at: string`\n  - `execution_id: string`\n  - `machine_id: string`\n  - `status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'`\n  - `artifacts?: { artifact_id: string; name: string; }[]`\n  - `completed_at?: string`\n  - `cwd?: string`\n  - `env_keys?: string[]`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `exit_code?: number`\n  - `expires_at?: string`\n  - `retry_after_ms?: number`\n  - `signal?: number`\n  - `started_at?: string`\n  - `stderr_bytes?: number`\n  - `stderr_truncated?: boolean`\n  - `stdout_bytes?: number`\n  - `stdout_truncated?: boolean`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst execution = await client.machines.executions.retrieve({ machine_id: 'dm-3', execution_id: 'execution_id' });\n\nconsole.log(execution);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.executions.retrieve',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst execution = await client.machines.executions.retrieve({\n  machine_id: 'dm-3',\n  execution_id: 'execution_id',\n});\n\nconsole.log(execution.execution_id);",
      },
      python: {
        method: 'machines.executions.retrieve',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nexecution = client.machines.executions.retrieve(\n    machine_id="dm-3",\n    execution_id="execution_id",\n)\nprint(execution.execution_id)',
      },
      java: {
        method: 'machines().executions().retrieve',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.executions.Execution;\nimport com.dedalus.api.models.machines.executions.ExecutionRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        ExecutionRetrieveParams params = ExecutionRetrieveParams.builder()\n            .machineId("dm-3")\n            .executionId("execution_id")\n            .build();\n        Execution execution = client.machines().executions().retrieve(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().executions().retrieve',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.executions.Execution\nimport com.dedalus.api.models.machines.executions.ExecutionRetrieveParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: ExecutionRetrieveParams = ExecutionRetrieveParams.builder()\n        .machineId("dm-3")\n        .executionId("execution_id")\n        .build()\n    val execution: Execution = client.machines().executions().retrieve(params)\n}',
      },
      go: {
        method: 'client.Machines.Executions.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\texecution, err := client.Machines.Executions.Get(context.TODO(), dedalus.MachineExecutionGetParams{\n\t\tMachineID:   "dm-3",\n\t\tExecutionID: "execution_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", execution.ExecutionID)\n}\n',
      },
      ruby: {
        method: 'machines.executions.retrieve',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nexecution = dedalus.machines.executions.retrieve(machine_id: "dm-3", execution_id: "execution_id")\n\nputs(execution)',
      },
      cli: {
        method: 'executions retrieve',
        example:
          "dedalus machines:executions retrieve \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3 \\\n  --execution-id execution_id",
      },
      php: {
        method: 'machines->executions->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$execution = $client->machines->executions->retrieve(\n  machineID: 'dm-3', executionID: 'execution_id'\n);\n\nvar_dump($execution);",
      },
      csharp: {
        method: 'Machines.Executions.Retrieve',
        example:
          'ExecutionRetrieveParams parameters = new()\n{\n    MachineID = "dm-3",\n    ExecutionID = "execution_id",\n};\n\nvar execution = await client.Machines.Executions.Retrieve(parameters);\n\nConsole.WriteLine(execution);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/executions/$EXECUTION_ID \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      "## delete\n\n`client.machines.executions.delete(machine_id: string, execution_id: string): { command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: artifact_ref[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n**delete** `/v1/machines/{machine_id}/executions/{execution_id}`\n\nDelete execution\n\n### Parameters\n\n- `machine_id: string`\n\n- `execution_id: string`\n\n### Returns\n\n- `{ command: string[]; created_at: string; execution_id: string; machine_id: string; status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; artifacts?: { artifact_id: string; name: string; }[]; completed_at?: string; cwd?: string; env_keys?: string[]; error_code?: string; error_message?: string; exit_code?: number; expires_at?: string; retry_after_ms?: number; signal?: number; started_at?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n  - `command: string[]`\n  - `created_at: string`\n  - `execution_id: string`\n  - `machine_id: string`\n  - `status: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'`\n  - `artifacts?: { artifact_id: string; name: string; }[]`\n  - `completed_at?: string`\n  - `cwd?: string`\n  - `env_keys?: string[]`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `exit_code?: number`\n  - `expires_at?: string`\n  - `retry_after_ms?: number`\n  - `signal?: number`\n  - `started_at?: string`\n  - `stderr_bytes?: number`\n  - `stderr_truncated?: boolean`\n  - `stdout_bytes?: number`\n  - `stdout_truncated?: boolean`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst execution = await client.machines.executions.delete({ machine_id: 'dm-3', execution_id: 'execution_id' });\n\nconsole.log(execution);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.executions.delete',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst execution = await client.machines.executions.delete({\n  machine_id: 'dm-3',\n  execution_id: 'execution_id',\n});\n\nconsole.log(execution.execution_id);",
      },
      python: {
        method: 'machines.executions.delete',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nexecution = client.machines.executions.delete(\n    machine_id="dm-3",\n    execution_id="execution_id",\n)\nprint(execution.execution_id)',
      },
      java: {
        method: 'machines().executions().delete',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.executions.Execution;\nimport com.dedalus.api.models.machines.executions.ExecutionDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        ExecutionDeleteParams params = ExecutionDeleteParams.builder()\n            .machineId("dm-3")\n            .executionId("execution_id")\n            .build();\n        Execution execution = client.machines().executions().delete(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().executions().delete',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.executions.Execution\nimport com.dedalus.api.models.machines.executions.ExecutionDeleteParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: ExecutionDeleteParams = ExecutionDeleteParams.builder()\n        .machineId("dm-3")\n        .executionId("execution_id")\n        .build()\n    val execution: Execution = client.machines().executions().delete(params)\n}',
      },
      go: {
        method: 'client.Machines.Executions.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\texecution, err := client.Machines.Executions.Delete(context.TODO(), dedalus.MachineExecutionDeleteParams{\n\t\tMachineID:   "dm-3",\n\t\tExecutionID: "execution_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", execution.ExecutionID)\n}\n',
      },
      ruby: {
        method: 'machines.executions.delete',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nexecution = dedalus.machines.executions.delete(machine_id: "dm-3", execution_id: "execution_id")\n\nputs(execution)',
      },
      cli: {
        method: 'executions delete',
        example:
          "dedalus machines:executions delete \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3 \\\n  --execution-id execution_id",
      },
      php: {
        method: 'machines->executions->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$execution = $client->machines->executions->delete(\n  machineID: 'dm-3', executionID: 'execution_id'\n);\n\nvar_dump($execution);",
      },
      csharp: {
        method: 'Machines.Executions.Delete',
        example:
          'ExecutionDeleteParams parameters = new()\n{\n    MachineID = "dm-3",\n    ExecutionID = "execution_id",\n};\n\nvar execution = await client.Machines.Executions.Delete(parameters);\n\nConsole.WriteLine(execution);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/executions/$EXECUTION_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      "## output\n\n`client.machines.executions.output(machine_id: string, execution_id: string): { execution_id: string; stderr?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout?: string; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n**get** `/v1/machines/{machine_id}/executions/{execution_id}/output`\n\nGet execution output\n\n### Parameters\n\n- `machine_id: string`\n\n- `execution_id: string`\n\n### Returns\n\n- `{ execution_id: string; stderr?: string; stderr_bytes?: number; stderr_truncated?: boolean; stdout?: string; stdout_bytes?: number; stdout_truncated?: boolean; }`\n\n  - `execution_id: string`\n  - `stderr?: string`\n  - `stderr_bytes?: number`\n  - `stderr_truncated?: boolean`\n  - `stdout?: string`\n  - `stdout_bytes?: number`\n  - `stdout_truncated?: boolean`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst executionOutput = await client.machines.executions.output({ machine_id: 'dm-3', execution_id: 'execution_id' });\n\nconsole.log(executionOutput);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.executions.output',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst executionOutput = await client.machines.executions.output({\n  machine_id: 'dm-3',\n  execution_id: 'execution_id',\n});\n\nconsole.log(executionOutput.execution_id);",
      },
      python: {
        method: 'machines.executions.output',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nexecution_output = client.machines.executions.output(\n    machine_id="dm-3",\n    execution_id="execution_id",\n)\nprint(execution_output.execution_id)',
      },
      java: {
        method: 'machines().executions().output',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.executions.ExecutionOutput;\nimport com.dedalus.api.models.machines.executions.ExecutionOutputParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        ExecutionOutputParams params = ExecutionOutputParams.builder()\n            .machineId("dm-3")\n            .executionId("execution_id")\n            .build();\n        ExecutionOutput executionOutput = client.machines().executions().output(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().executions().output',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.executions.ExecutionOutput\nimport com.dedalus.api.models.machines.executions.ExecutionOutputParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: ExecutionOutputParams = ExecutionOutputParams.builder()\n        .machineId("dm-3")\n        .executionId("execution_id")\n        .build()\n    val executionOutput: ExecutionOutput = client.machines().executions().output(params)\n}',
      },
      go: {
        method: 'client.Machines.Executions.Output',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\texecutionOutput, err := client.Machines.Executions.Output(context.TODO(), dedalus.MachineExecutionOutputParams{\n\t\tMachineID:   "dm-3",\n\t\tExecutionID: "execution_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", executionOutput.ExecutionID)\n}\n',
      },
      ruby: {
        method: 'machines.executions.output',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nexecution_output = dedalus.machines.executions.output(machine_id: "dm-3", execution_id: "execution_id")\n\nputs(execution_output)',
      },
      cli: {
        method: 'executions output',
        example:
          "dedalus machines:executions output \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3 \\\n  --execution-id execution_id",
      },
      php: {
        method: 'machines->executions->output',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$executionOutput = $client->machines->executions->output(\n  machineID: 'dm-3', executionID: 'execution_id'\n);\n\nvar_dump($executionOutput);",
      },
      csharp: {
        method: 'Machines.Executions.Output',
        example:
          'ExecutionOutputParams parameters = new()\n{\n    MachineID = "dm-3",\n    ExecutionID = "execution_id",\n};\n\nvar executionOutput = await client.Machines.Executions.Output(parameters);\n\nConsole.WriteLine(executionOutput);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/executions/$EXECUTION_ID/output \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      "## events\n\n`client.machines.executions.events(machine_id: string, execution_id: string, cursor?: string, limit?: number): { at: string; sequence: number; type: 'lifecycle' | 'stdout' | 'stderr'; chunk?: string; error_code?: string; error_message?: string; exit_code?: number; signal?: number; status?: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; }`\n\n**get** `/v1/machines/{machine_id}/executions/{execution_id}/events`\n\nList execution events\n\n### Parameters\n\n- `machine_id: string`\n\n- `execution_id: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ at: string; sequence: number; type: 'lifecycle' | 'stdout' | 'stderr'; chunk?: string; error_code?: string; error_message?: string; exit_code?: number; signal?: number; status?: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'; }`\n\n  - `at: string`\n  - `sequence: number`\n  - `type: 'lifecycle' | 'stdout' | 'stderr'`\n  - `chunk?: string`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `exit_code?: number`\n  - `signal?: number`\n  - `status?: 'wake_in_progress' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled' | 'expired'`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const executionEvent of client.machines.executions.events({ machine_id: 'dm-3', execution_id: 'execution_id' })) {\n  console.log(executionEvent);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.executions.events',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const executionEvent of client.machines.executions.events({\n  machine_id: 'dm-3',\n  execution_id: 'execution_id',\n})) {\n  console.log(executionEvent.at);\n}",
      },
      python: {
        method: 'machines.executions.events',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.machines.executions.events(\n    machine_id="dm-3",\n    execution_id="execution_id",\n)\npage = page.items[0]\nprint(page.at)',
      },
      java: {
        method: 'machines().executions().events',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.executions.ExecutionEventsPage;\nimport com.dedalus.api.models.machines.executions.ExecutionEventsParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        ExecutionEventsParams params = ExecutionEventsParams.builder()\n            .machineId("dm-3")\n            .executionId("execution_id")\n            .build();\n        ExecutionEventsPage page = client.machines().executions().events(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().executions().events',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.executions.ExecutionEventsPage\nimport com.dedalus.api.models.machines.executions.ExecutionEventsParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: ExecutionEventsParams = ExecutionEventsParams.builder()\n        .machineId("dm-3")\n        .executionId("execution_id")\n        .build()\n    val page: ExecutionEventsPage = client.machines().executions().events(params)\n}',
      },
      go: {
        method: 'client.Machines.Executions.Events',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Machines.Executions.Events(context.TODO(), dedalus.MachineExecutionEventsParams{\n\t\tMachineID:   "dm-3",\n\t\tExecutionID: "execution_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'machines.executions.events',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\npage = dedalus.machines.executions.events(machine_id: "dm-3", execution_id: "execution_id")\n\nputs(page)',
      },
      cli: {
        method: 'executions events',
        example:
          "dedalus machines:executions events \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3 \\\n  --execution-id execution_id",
      },
      php: {
        method: 'machines->executions->events',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->machines->executions->events(\n  machineID: 'dm-3', executionID: 'execution_id', cursor: 'cursor', limit: 0\n);\n\nvar_dump($page);",
      },
      csharp: {
        method: 'Machines.Executions.Events',
        example:
          'ExecutionEventsParams parameters = new()\n{\n    MachineID = "dm-3",\n    ExecutionID = "execution_id",\n};\n\nvar page = await client.Machines.Executions.Events(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/executions/$EXECUTION_ID/events \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      "## list\n\n`client.machines.terminals.list(machine_id: string, cursor?: string, limit?: number): { created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n**get** `/v1/machines/{machine_id}/terminals`\n\nList terminals\n\n### Parameters\n\n- `machine_id: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n  - `created_at: string`\n  - `height: number`\n  - `machine_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `terminal_id: string`\n  - `width: number`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'websocket'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `stream_url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\n// Automatically fetches more pages as needed.\nfor await (const terminal of client.machines.terminals.list({ machine_id: 'dm-3' })) {\n  console.log(terminal);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.terminals.list',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const terminal of client.machines.terminals.list({ machine_id: 'dm-3' })) {\n  console.log(terminal.machine_id);\n}",
      },
      python: {
        method: 'machines.terminals.list',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\npage = client.machines.terminals.list(\n    machine_id="dm-3",\n)\npage = page.items[0]\nprint(page.machine_id)',
      },
      java: {
        method: 'machines().terminals().list',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.terminals.TerminalListPage;\nimport com.dedalus.api.models.machines.terminals.TerminalListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        TerminalListParams params = TerminalListParams.builder()\n            .machineId("dm-3")\n            .build();\n        TerminalListPage page = client.machines().terminals().list(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().terminals().list',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.terminals.TerminalListPage\nimport com.dedalus.api.models.machines.terminals.TerminalListParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: TerminalListParams = TerminalListParams.builder()\n        .machineId("dm-3")\n        .build()\n    val page: TerminalListPage = client.machines().terminals().list(params)\n}',
      },
      go: {
        method: 'client.Machines.Terminals.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Machines.Terminals.List(context.TODO(), dedalus.MachineTerminalListParams{\n\t\tMachineID: "dm-3",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      ruby: {
        method: 'machines.terminals.list',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\npage = dedalus.machines.terminals.list(machine_id: "dm-3")\n\nputs(page)',
      },
      cli: {
        method: 'terminals list',
        example: "dedalus machines:terminals list \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3",
      },
      php: {
        method: 'machines->terminals->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->machines->terminals->list(\n  machineID: 'dm-3', cursor: 'cursor', limit: 0\n);\n\nvar_dump($page);",
      },
      csharp: {
        method: 'Machines.Terminals.List',
        example:
          'TerminalListParams parameters = new() { MachineID = "dm-3" };\n\nvar page = await client.Machines.Terminals.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/terminals \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      "## create\n\n`client.machines.terminals.create(machine_id: string, height: number, width: number, cwd?: string, env?: object, shell?: string): { created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n**post** `/v1/machines/{machine_id}/terminals`\n\nCreate terminal\n\n### Parameters\n\n- `machine_id: string`\n\n- `height: number`\n\n- `width: number`\n\n- `cwd?: string`\n\n- `env?: object`\n\n- `shell?: string`\n\n### Returns\n\n- `{ created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n  - `created_at: string`\n  - `height: number`\n  - `machine_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `terminal_id: string`\n  - `width: number`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'websocket'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `stream_url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst terminal = await client.machines.terminals.create({\n  machine_id: 'dm-3',\n  height: 0,\n  width: 0,\n});\n\nconsole.log(terminal);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.terminals.create',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst terminal = await client.machines.terminals.create({\n  machine_id: 'dm-3',\n  height: 0,\n  width: 0,\n});\n\nconsole.log(terminal.terminal_id);",
      },
      python: {
        method: 'machines.terminals.create',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nterminal = client.machines.terminals.create(\n    machine_id="dm-3",\n    height=0,\n    width=0,\n)\nprint(terminal.terminal_id)',
      },
      java: {
        method: 'machines().terminals().create',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.terminals.Terminal;\nimport com.dedalus.api.models.machines.terminals.TerminalCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        TerminalCreateParams params = TerminalCreateParams.builder()\n            .machineId("dm-3")\n            .terminalCreateParams(TerminalCreateParams.builder()\n                .height(0L)\n                .width(0L)\n                .build())\n            .build();\n        Terminal terminal = client.machines().terminals().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().terminals().create',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.terminals.Terminal\nimport com.dedalus.api.models.machines.terminals.TerminalCreateParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: TerminalCreateParams = TerminalCreateParams.builder()\n        .machineId("dm-3")\n        .terminalCreateParams(TerminalCreateParams.builder()\n            .height(0L)\n            .width(0L)\n            .build())\n        .build()\n    val terminal: Terminal = client.machines().terminals().create(params)\n}',
      },
      go: {
        method: 'client.Machines.Terminals.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tterminal, err := client.Machines.Terminals.New(context.TODO(), dedalus.MachineTerminalNewParams{\n\t\tMachineID: "dm-3",\n\t\tTerminalCreateParams: dedalus.TerminalCreateParams{\n\t\t\tHeight: 0,\n\t\t\tWidth:  0,\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", terminal.TerminalID)\n}\n',
      },
      ruby: {
        method: 'machines.terminals.create',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nterminal = dedalus.machines.terminals.create(machine_id: "dm-3", height: 0, width: 0)\n\nputs(terminal)',
      },
      cli: {
        method: 'terminals create',
        example:
          "dedalus machines:terminals create \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3 \\\n  --height 0 \\\n  --width 0",
      },
      php: {
        method: 'machines->terminals->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$terminal = $client->machines->terminals->create(\n  machineID: 'dm-3',\n  height: 0,\n  width: 0,\n  cwd: 'cwd',\n  env: ['foo' => 'string'],\n  shell: 'shell',\n);\n\nvar_dump($terminal);",
      },
      csharp: {
        method: 'Machines.Terminals.Create',
        example:
          'TerminalCreateParams parameters = new()\n{\n    MachineID = "dm-3",\n    Height = 0,\n    Width = 0,\n};\n\nvar terminal = await client.Machines.Terminals.Create(parameters);\n\nConsole.WriteLine(terminal);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/terminals \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY" \\\n    -d \'{\n          "height": 0,\n          "width": 0\n        }\'',
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
      "## retrieve\n\n`client.machines.terminals.retrieve(machine_id: string, terminal_id: string): { created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n**get** `/v1/machines/{machine_id}/terminals/{terminal_id}`\n\nGet terminal\n\n### Parameters\n\n- `machine_id: string`\n\n- `terminal_id: string`\n\n### Returns\n\n- `{ created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n  - `created_at: string`\n  - `height: number`\n  - `machine_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `terminal_id: string`\n  - `width: number`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'websocket'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `stream_url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst terminal = await client.machines.terminals.retrieve({ machine_id: 'dm-3', terminal_id: 'terminal_id' });\n\nconsole.log(terminal);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.terminals.retrieve',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst terminal = await client.machines.terminals.retrieve({\n  machine_id: 'dm-3',\n  terminal_id: 'terminal_id',\n});\n\nconsole.log(terminal.terminal_id);",
      },
      python: {
        method: 'machines.terminals.retrieve',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nterminal = client.machines.terminals.retrieve(\n    machine_id="dm-3",\n    terminal_id="terminal_id",\n)\nprint(terminal.terminal_id)',
      },
      java: {
        method: 'machines().terminals().retrieve',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.terminals.Terminal;\nimport com.dedalus.api.models.machines.terminals.TerminalRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        TerminalRetrieveParams params = TerminalRetrieveParams.builder()\n            .machineId("dm-3")\n            .terminalId("terminal_id")\n            .build();\n        Terminal terminal = client.machines().terminals().retrieve(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().terminals().retrieve',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.terminals.Terminal\nimport com.dedalus.api.models.machines.terminals.TerminalRetrieveParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: TerminalRetrieveParams = TerminalRetrieveParams.builder()\n        .machineId("dm-3")\n        .terminalId("terminal_id")\n        .build()\n    val terminal: Terminal = client.machines().terminals().retrieve(params)\n}',
      },
      go: {
        method: 'client.Machines.Terminals.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tterminal, err := client.Machines.Terminals.Get(context.TODO(), dedalus.MachineTerminalGetParams{\n\t\tMachineID:  "dm-3",\n\t\tTerminalID: "terminal_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", terminal.TerminalID)\n}\n',
      },
      ruby: {
        method: 'machines.terminals.retrieve',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nterminal = dedalus.machines.terminals.retrieve(machine_id: "dm-3", terminal_id: "terminal_id")\n\nputs(terminal)',
      },
      cli: {
        method: 'terminals retrieve',
        example:
          "dedalus machines:terminals retrieve \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3 \\\n  --terminal-id terminal_id",
      },
      php: {
        method: 'machines->terminals->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$terminal = $client->machines->terminals->retrieve(\n  machineID: 'dm-3', terminalID: 'terminal_id'\n);\n\nvar_dump($terminal);",
      },
      csharp: {
        method: 'Machines.Terminals.Retrieve',
        example:
          'TerminalRetrieveParams parameters = new()\n{\n    MachineID = "dm-3",\n    TerminalID = "terminal_id",\n};\n\nvar terminal = await client.Machines.Terminals.Retrieve(parameters);\n\nConsole.WriteLine(terminal);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/terminals/$TERMINAL_ID \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      "## delete\n\n`client.machines.terminals.delete(machine_id: string, terminal_id: string): { created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n**delete** `/v1/machines/{machine_id}/terminals/{terminal_id}`\n\nDelete terminal\n\n### Parameters\n\n- `machine_id: string`\n\n- `terminal_id: string`\n\n### Returns\n\n- `{ created_at: string; height: number; machine_id: string; status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'; terminal_id: string; width: number; error_code?: string; error_message?: string; expires_at?: string; protocol?: 'websocket'; ready_at?: string; retry_after_ms?: number; stream_url?: string; }`\n\n  - `created_at: string`\n  - `height: number`\n  - `machine_id: string`\n  - `status: 'wake_in_progress' | 'ready' | 'closed' | 'expired' | 'failed'`\n  - `terminal_id: string`\n  - `width: number`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `expires_at?: string`\n  - `protocol?: 'websocket'`\n  - `ready_at?: string`\n  - `retry_after_ms?: number`\n  - `stream_url?: string`\n\n### Example\n\n```typescript\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst terminal = await client.machines.terminals.delete({ machine_id: 'dm-3', terminal_id: 'terminal_id' });\n\nconsole.log(terminal);\n```",
    perLanguage: {
      typescript: {
        method: 'client.machines.terminals.delete',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst terminal = await client.machines.terminals.delete({\n  machine_id: 'dm-3',\n  terminal_id: 'terminal_id',\n});\n\nconsole.log(terminal.terminal_id);",
      },
      python: {
        method: 'machines.terminals.delete',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nterminal = client.machines.terminals.delete(\n    machine_id="dm-3",\n    terminal_id="terminal_id",\n)\nprint(terminal.terminal_id)',
      },
      java: {
        method: 'machines().terminals().delete',
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.terminals.Terminal;\nimport com.dedalus.api.models.machines.terminals.TerminalDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        TerminalDeleteParams params = TerminalDeleteParams.builder()\n            .machineId("dm-3")\n            .terminalId("terminal_id")\n            .build();\n        Terminal terminal = client.machines().terminals().delete(params);\n    }\n}',
      },
      kotlin: {
        method: 'machines().terminals().delete',
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.terminals.Terminal\nimport com.dedalus.api.models.machines.terminals.TerminalDeleteParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: TerminalDeleteParams = TerminalDeleteParams.builder()\n        .machineId("dm-3")\n        .terminalId("terminal_id")\n        .build()\n    val terminal: Terminal = client.machines().terminals().delete(params)\n}',
      },
      go: {
        method: 'client.Machines.Terminals.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tterminal, err := client.Machines.Terminals.Delete(context.TODO(), dedalus.MachineTerminalDeleteParams{\n\t\tMachineID:  "dm-3",\n\t\tTerminalID: "terminal_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", terminal.TerminalID)\n}\n',
      },
      ruby: {
        method: 'machines.terminals.delete',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nterminal = dedalus.machines.terminals.delete(machine_id: "dm-3", terminal_id: "terminal_id")\n\nputs(terminal)',
      },
      cli: {
        method: 'terminals delete',
        example:
          "dedalus machines:terminals delete \\\n  --api-key 'My API Key' \\\n  --machine-id dm-3 \\\n  --terminal-id terminal_id",
      },
      php: {
        method: 'machines->terminals->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$terminal = $client->machines->terminals->delete(\n  machineID: 'dm-3', terminalID: 'terminal_id'\n);\n\nvar_dump($terminal);",
      },
      csharp: {
        method: 'Machines.Terminals.Delete',
        example:
          'TerminalDeleteParams parameters = new()\n{\n    MachineID = "dm-3",\n    TerminalID = "terminal_id",\n};\n\nvar terminal = await client.Machines.Terminals.Delete(parameters);\n\nConsole.WriteLine(terminal);',
      },
      http: {
        example:
          'curl https://dcs.dedaluslabs.ai/v1/machines/$MACHINE_ID/terminals/$TERMINAL_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $DEDALUS_API_KEY"',
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
      typescript: {
        method: 'client.machines.terminals.connect',
        example:
          "import Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.machines.terminals.connect({ machine_id: 'machine_id', terminal_id: 'terminal_id' });",
      },
      python: {
        method: 'machines.terminals.connect',
        example:
          'import os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\nclient.machines.terminals.connect(\n    machine_id="machine_id",\n    terminal_id="terminal_id",\n)',
      },
      java: {
        example:
          'package com.dedalus.api.example;\n\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.terminals.TerminalConnectParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        DedalusClient client = DedalusOkHttpClient.fromEnv();\n\n        TerminalConnectParams params = TerminalConnectParams.builder()\n            .machineId("machine_id")\n            .terminalId("terminal_id")\n            .build();\n        client.machines().terminals().connect(params);\n    }\n}',
      },
      kotlin: {
        example:
          'package com.dedalus.api.example\n\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.terminals.TerminalConnectParams\n\nfun main() {\n    val client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\n    val params: TerminalConnectParams = TerminalConnectParams.builder()\n        .machineId("machine_id")\n        .terminalId("terminal_id")\n        .build()\n    client.machines().terminals().connect(params)\n}',
      },
      go: {
        method: 'client.Machines.Terminals.Connect',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Machines.Terminals.Connect(context.TODO(), dedalus.MachineTerminalConnectParams{\n\t\tMachineID:  "machine_id",\n\t\tTerminalID: "terminal_id",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      ruby: {
        method: 'machines.terminals.connect',
        example:
          'require "dedalus"\n\ndedalus = Dedalus::Client.new(api_key: "My API Key")\n\nresult = dedalus.machines.terminals.connect(machine_id: "machine_id", terminal_id: "terminal_id")\n\nputs(result)',
      },
      cli: {
        example:
          "dedalus machines:terminals connect \\\n  --api-key 'My API Key' \\\n  --machine-id machine_id \\\n  --terminal-id terminal_id",
      },
      php: {
        method: 'machines->terminals->connect',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->machines->terminals->connect(\n  machineID: 'machine_id', terminalID: 'terminal_id'\n);\n\nvar_dump($result);",
      },
      csharp: {
        example:
          'TerminalConnectParams parameters = new()\n{\n    MachineID = "machine_id",\n    TerminalID = "terminal_id",\n};\n\nawait client.Machines.Terminals.Connect(parameters);',
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'cli',
    content:
      "# Dedalus CLI\n\nThe official CLI for the [Dedalus REST API](https://docs.dedaluslabs.ai).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n<!-- x-release-please-start-version -->\n\n## Installation\n\n### Installing with Homebrew\n\n~~~sh\nbrew install dedalus-labs/tap/dedalus\n~~~\n\n### Installing with Go\n\nTo test or install the CLI locally, you need [Go](https://go.dev/doc/install) version 1.22 or later installed.\n\n~~~sh\ngo install 'github.com/dedalus-labs/dedalus-cli/cmd/dedalus@latest'\n~~~\n\nOnce you have run `go install`, the binary is placed in your Go bin directory:\n\n- **Default location**: `$HOME/go/bin` (or `$GOPATH/bin` if GOPATH is set)\n- **Check your path**: Run `go env GOPATH` to see the base directory\n\nIf commands aren't found after installation, add the Go bin directory to your PATH:\n\n~~~sh\n# Add to your shell profile (.zshrc, .bashrc, etc.)\nexport PATH=\"$PATH:$(go env GOPATH)/bin\"\n~~~\n\n<!-- x-release-please-end -->\n\n### Running Locally\n\nAfter cloning the git repository for this project, you can use the\n`scripts/run` script to run the tool locally:\n\n~~~sh\n./scripts/run args...\n~~~\n\n## Usage\n\nThe CLI follows a resource-based command structure:\n\n~~~sh\ndedalus [resource] <command> [flags...]\n~~~\n\n~~~sh\ndedalus machines create \\\n  --api-key 'My API Key' \\\n  --memory-mib 2048 \\\n  --storage-gib 10 \\\n  --vcpu 1\n~~~\n\nFor details about specific commands, use the `--help` flag.\n\n### Environment variables\n\n| Environment variable | Description                                   | Required | Default value |\n| -------------------- | --------------------------------------------- | -------- | ------------- |\n| `DEDALUS_API_KEY`    | Dedalus API key sent as Authorization Bearer. | no       | `null`        |\n| `DEDALUS_X_API_KEY`  | Dedalus API key sent as x-api-key header.     | no       | `null`        |\n| `DEDALUS_ORG_ID`     | Organization ID header for all DCS requests.  | no       | `null`        |\n\n### Global flags\n\n- `--api-key` - Dedalus API key sent as Authorization Bearer. (can also be set with `DEDALUS_API_KEY` env var)\n- `--x-api-key` - Dedalus API key sent as x-api-key header. (can also be set with `DEDALUS_X_API_KEY` env var)\n- `--dedalus-org-id` - Organization ID header for all DCS requests. (can also be set with `DEDALUS_ORG_ID` env var)\n- `--help` - Show command line usage\n- `--debug` - Enable debug logging (includes HTTP request/response details)\n- `--version`, `-v` - Show the CLI version\n- `--base-url` - Use a custom API backend URL\n- `--format` - Change the output format (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--format-error` - Change the output format for errors (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--transform` - Transform the data output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n- `--transform-error` - Transform the error output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n\n### Passing files as arguments\n\nTo pass files to your API, you can use the `@myfile.ext` syntax:\n\n~~~bash\ndedalus <command> --arg @abe.jpg\n~~~\n\nFiles can also be passed inside JSON or YAML blobs:\n\n~~~bash\ndedalus <command> --arg '{image: \"@abe.jpg\"}'\n# Equivalent:\ndedalus <command> <<YAML\narg:\n  image: \"@abe.jpg\"\nYAML\n~~~\n\nIf you need to pass a string literal that begins with an `@` sign, you can\nescape the `@` sign to avoid accidentally passing a file.\n\n~~~bash\ndedalus <command> --username '\\@abe'\n~~~\n\n#### Explicit encoding\n\nFor JSON endpoints, the CLI tool does filetype sniffing to determine whether the\nfile contents should be sent as a string literal (for plain text files) or as a\nbase64-encoded string literal (for binary files). If you need to explicitly send\nthe file as either plain text or base64-encoded data, you can use\n`@file://myfile.txt` (for string encoding) or `@data://myfile.dat` (for\nbase64-encoding). Note that absolute paths will begin with `@file://` or\n`@data://`, followed by a third `/` (for example, `@file:///tmp/file.txt`).\n\n~~~bash\ndedalus <command> --arg @data://file.txt\n~~~\n\n## Linking different Go SDK versions\n\nYou can link the CLI against a different version of the Dedalus Go SDK\nfor development purposes using the `./scripts/link` script.\n\nTo link to a specific version from a repository (version can be a branch,\ngit tag, or commit hash):\n\n~~~bash\n./scripts/link github.com/org/repo@version\n~~~\n\nTo link to a local copy of the SDK:\n\n~~~bash\n./scripts/link ../path/to/dedalus-go\n~~~\n\nIf you run the link script without any arguments, it will default to `../dedalus-go`.\n",
  },
  {
    language: 'csharp',
    content:
      '# Dedalus C# API Library\n\nThe Dedalus C# SDK provides convenient access to the [Dedalus REST API](https://docs.dedaluslabs.ai) from applications written in   C#.\n\n## Installation\n\n```bash\ngit clone git@github.com:stainless-sdks/dedalus-csharp.git\ndotnet add reference dedalus-csharp/src/Dedalus\n```\n\n## Requirements\n\nThis library requires .NET Standard 2.0 or later.\n\n## Usage\n\nSee the [`examples`](examples) directory for complete and runnable examples.\n\n```csharp\nDedalusClient client = new();\n\nMachineCreateParams parameters = new()\n{\n    MemoryMiB = 2048,\n    StorageGiB = 10,\n    Vcpu = 1,\n};\n\nvar machine = await client.Machines.Create(parameters);\n\nConsole.WriteLine(machine);\n```',
  },
  {
    language: 'go',
    content:
      '# Dedalus Go API Library\n\n<a href="https://pkg.go.dev/github.com/dedalus-labs/dedalus-go"><img src="https://pkg.go.dev/badge/github.com/dedalus-labs/dedalus-go.svg" alt="Go Reference"></a>\n\nThe Dedalus Go library provides convenient access to the [Dedalus REST API](https://docs.dedaluslabs.ai)\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dedalus MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=dedalus-mcp&config=eyJuYW1lIjoiZGVkYWx1cy1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly9kZWRhbHVzLnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7IngtYXBpLWtleSI6Ik15IFggQVBJIEtleSIsIngtZGVkYWx1cy1hcGkta2V5IjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22dedalus-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fdedalus.stlmcp.com%22%2C%22headers%22%3A%7B%22x-api-key%22%3A%22My%20X%20API%20Key%22%2C%22x-dedalus-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/dedalus-labs/dedalus-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/dedalus-labs/dedalus-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/dedalus-labs/dedalus-go"\n\t"github.com/dedalus-labs/dedalus-go/option"\n)\n\nfunc main() {\n\tclient := dedalus.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("DEDALUS_API_KEY")\n\t)\n\tmachine, err := client.Machines.New(context.TODO(), dedalus.MachineNewParams{\n\t\tCreateParams: dedalus.CreateParams{\n\t\t\tMemoryMiB:  0,\n\t\t\tStorageGiB: 0,\n\t\t\tVCPU:       0,\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", machine.MachineID)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Machines.New(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/dedalus-labs/dedalus-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n```go\niter := client.Machines.ListAutoPaging(context.TODO(), dedalus.MachineListParams{})\n// Automatically fetches more pages as needed.\nfor iter.Next() {\n\tmachineListItem := iter.Current()\n\tfmt.Printf("%+v\\n", machineListItem)\n}\nif err := iter.Err(); err != nil {\n\tpanic(err.Error())\n}\n```\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n```go\npage, err := client.Machines.List(context.TODO(), dedalus.MachineListParams{})\nfor page != nil {\n\tfor _, machine := range page.Items {\n\t\tfmt.Printf("%+v\\n", machine)\n\t}\n\tpage, err = page.GetNextPage()\n}\nif err != nil {\n\tpanic(err.Error())\n}\n```\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Machines.New(context.TODO(), dedalus.MachineNewParams{\n\tCreateParams: dedalus.CreateParams{\n\t\tMemoryMiB:  0,\n\t\tStorageGiB: 0,\n\t\tVCPU:       0,\n\t},\n})\nif err != nil {\n\tvar apierr *dedalus.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t\tprintln(apierr.ErrorCode)                  // IDEMPOTENCY_KEY_REUSED\n\t\tprintln(apierr.Message)                    // idempotency key reused with different request parameters\n\t\tprintln(apierr.Retryable)                  // false\n\t}\n\tpanic(err.Error()) // GET "/v1/machines": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Machines.New(\n\tctx,\n\tdedalus.MachineNewParams{\n\t\tCreateParams: dedalus.CreateParams{\n\t\t\tMemoryMiB:  0,\n\t\t\tStorageGiB: 0,\n\t\t\tVCPU:       0,\n\t\t},\n\t},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := dedalus.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Machines.New(\n\tcontext.TODO(),\n\tdedalus.MachineNewParams{\n\t\tCreateParams: dedalus.CreateParams{\n\t\t\tMemoryMiB:  0,\n\t\t\tStorageGiB: 0,\n\t\t\tVCPU:       0,\n\t\t},\n\t},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nmachine, err := client.Machines.New(\n\tcontext.TODO(),\n\tdedalus.MachineNewParams{\n\t\tCreateParams: dedalus.CreateParams{\n\t\t\tMemoryMiB:  0,\n\t\t\tStorageGiB: 0,\n\t\t\tVCPU:       0,\n\t\t},\n\t},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", machine)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/dedalus-labs/dedalus-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'java',
    content:
      '# Dedalus Java API Library\n\n<!-- x-release-please-start-version -->\n[![Maven Central](https://img.shields.io/maven-central/v/com.dedalus.api/dedalus-java)](https://central.sonatype.com/artifact/com.dedalus.api/dedalus-java/0.0.1)\n[![javadoc](https://javadoc.io/badge2/com.dedalus.api/dedalus-java/0.0.1/javadoc.svg)](https://javadoc.io/doc/com.dedalus.api/dedalus-java/0.0.1)\n<!-- x-release-please-end -->\n\nThe Dedalus Java SDK provides convenient access to the [Dedalus REST API](https://docs.dedaluslabs.ai)   from applications written in Java.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dedalus MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=dedalus-mcp&config=eyJuYW1lIjoiZGVkYWx1cy1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly9kZWRhbHVzLnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7IngtYXBpLWtleSI6Ik15IFggQVBJIEtleSIsIngtZGVkYWx1cy1hcGkta2V5IjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22dedalus-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fdedalus.stlmcp.com%22%2C%22headers%22%3A%7B%22x-api-key%22%3A%22My%20X%20API%20Key%22%2C%22x-dedalus-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n<!-- x-release-please-start-version -->\n\nThe REST API documentation can be found on [docs.dedaluslabs.ai](https://docs.dedaluslabs.ai). Javadocs are available on [javadoc.io](https://javadoc.io/doc/com.dedalus.api/dedalus-java/0.0.1).\n\n<!-- x-release-please-end -->\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n### Gradle\n\n~~~kotlin\nimplementation("com.dedalus.api:dedalus-java:0.0.1")\n~~~\n\n### Maven\n\n~~~xml\n<dependency>\n  <groupId>com.dedalus.api</groupId>\n  <artifactId>dedalus-java</artifactId>\n  <version>0.0.1</version>\n</dependency>\n~~~\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Java 8 or later.\n\n## Usage\n\n```java\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.CreateParams;\nimport com.dedalus.api.models.machines.Machine;\n\n// Configures using the `dedalus.apiKey`, `dedalus.xApiKey`, `dedalus.orgId` and `dedalus.baseUrl` system properties\n// Or configures using the `DEDALUS_API_KEY`, `DEDALUS_X_API_KEY`, `DEDALUS_ORG_ID` and `DEDALUS_BASE_URL` environment variables\nDedalusClient client = DedalusOkHttpClient.fromEnv();\n\nCreateParams params = CreateParams.builder()\n    .memoryMiB(0L)\n    .storageGiB(0L)\n    .vcpu(0.0)\n    .build();\nMachine machine = client.machines().create(params);\n```\n\n## Client configuration\n\nConfigure the client using system properties or environment variables:\n\n```java\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\n\n// Configures using the `dedalus.apiKey`, `dedalus.xApiKey`, `dedalus.orgId` and `dedalus.baseUrl` system properties\n// Or configures using the `DEDALUS_API_KEY`, `DEDALUS_X_API_KEY`, `DEDALUS_ORG_ID` and `DEDALUS_BASE_URL` environment variables\nDedalusClient client = DedalusOkHttpClient.fromEnv();\n```\n\nOr manually:\n\n```java\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\n\nDedalusClient client = DedalusOkHttpClient.builder()\n    .apiKey("My API Key")\n    .build();\n```\n\nOr using a combination of the two approaches:\n\n```java\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\n\nDedalusClient client = DedalusOkHttpClient.builder()\n    // Configures using the `dedalus.apiKey`, `dedalus.xApiKey`, `dedalus.orgId` and `dedalus.baseUrl` system properties\n    // Or configures using the `DEDALUS_API_KEY`, `DEDALUS_X_API_KEY`, `DEDALUS_ORG_ID` and `DEDALUS_BASE_URL` environment variables\n    .fromEnv()\n    .apiKey("My API Key")\n    .build();\n```\n\nSee this table for the available options:\n\n| Setter         | System property   | Environment variable | Required | Default value                  |\n| -------------- | ----------------- | -------------------- | -------- | ------------------------------ |\n| `apiKey`       | `dedalus.apiKey`  | `DEDALUS_API_KEY`    | false    | -                              |\n| `xApiKey`      | `dedalus.xApiKey` | `DEDALUS_X_API_KEY`  | false    | -                              |\n| `dedalusOrgId` | `dedalus.orgId`   | `DEDALUS_ORG_ID`     | false    | -                              |\n| `baseUrl`      | `dedalus.baseUrl` | `DEDALUS_BASE_URL`   | true     | `"https://dcs.dedaluslabs.ai"` |\n\nSystem properties take precedence over environment variables.\n\n> [!TIP]\n> Don\'t create more than one client in the same application. Each client has a connection pool and\n> thread pools, which are more efficient to share between requests.\n\n### Modifying configuration\n\nTo temporarily use a modified client configuration, while reusing the same connection and thread       pools, call `withOptions()` on any client or service:\n\n```java\nimport com.dedalus.api.client.DedalusClient;\n\nDedalusClient clientWithOptions = client.withOptions(optionsBuilder -> {\n    optionsBuilder.baseUrl("https://example.com");\n    optionsBuilder.maxRetries(42);\n});\n```\n\nThe `withOptions()` method does not affect the original client or service.\n\n## Requests and responses\n\nTo send a request to the Dedalus API, build an instance of some `Params` class and pass it to the     corresponding client method. When the response is received, it will be deserialized into an instance of     a Java class.\n\nFor example, `client.machines().create(...)` should be called with an instance of `MachineCreateParams`, and it     will return an instance of `Machine`.\n\n## Immutability\n\nEach class in the SDK has an associated   [builder](https://blogs.oracle.com/javamagazine/post/exploring-joshua-blochs-builder-design-pattern-in-java)   or factory method for constructing it.\n\nEach class is [immutable](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html)   once constructed. If the class has an associated builder, then it has a `toBuilder()` method, which can   be used to convert it back to a builder for making a modified copy.\n\nBecause each class is immutable, builder modification will _never_ affect already built class instances.\n\n## Asynchronous execution\n\nThe default client is synchronous. To switch to asynchronous execution, call the `async()` method:\n\n```java\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.models.machines.CreateParams;\nimport com.dedalus.api.models.machines.Machine;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `dedalus.apiKey`, `dedalus.xApiKey`, `dedalus.orgId` and `dedalus.baseUrl` system properties\n// Or configures using the `DEDALUS_API_KEY`, `DEDALUS_X_API_KEY`, `DEDALUS_ORG_ID` and `DEDALUS_BASE_URL` environment variables\nDedalusClient client = DedalusOkHttpClient.fromEnv();\n\nCreateParams params = CreateParams.builder()\n    .memoryMiB(0L)\n    .storageGiB(0L)\n    .vcpu(0.0)\n    .build();\nCompletableFuture<Machine> machine = client.async().machines().create(params);\n```\n\nOr create an asynchronous client from the beginning:\n\n```java\nimport com.dedalus.api.client.DedalusClientAsync;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClientAsync;\nimport com.dedalus.api.models.machines.CreateParams;\nimport com.dedalus.api.models.machines.Machine;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `dedalus.apiKey`, `dedalus.xApiKey`, `dedalus.orgId` and `dedalus.baseUrl` system properties\n// Or configures using the `DEDALUS_API_KEY`, `DEDALUS_X_API_KEY`, `DEDALUS_ORG_ID` and `DEDALUS_BASE_URL` environment variables\nDedalusClientAsync client = DedalusOkHttpClientAsync.fromEnv();\n\nCreateParams params = CreateParams.builder()\n    .memoryMiB(0L)\n    .storageGiB(0L)\n    .vcpu(0.0)\n    .build();\nCompletableFuture<Machine> machine = client.machines().create(params);\n```\n\nThe asynchronous client supports the same options as the synchronous one, except most methods return `CompletableFuture`s.\n\n## Streaming\n\nThe SDK defines methods that return response "chunk" streams, where each chunk can be individually     processed as soon as it arrives instead of waiting on the full response. Streaming methods generally     correspond to [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) or     [JSONL](https://jsonlines.org) responses.\n\nSome of these methods may have streaming and non-streaming variants, but a streaming method will     always have a `Streaming` suffix in its name, even if it doesn\'t have a non-streaming variant.\n\nThese streaming methods return [`StreamResponse`](dedalus-java-core/src/main/kotlin/com/dedalus/api/core/http/StreamResponse.kt) for synchronous clients:\n\n```java\nimport com.dedalus.api.core.http.StreamResponse;\nimport com.dedalus.api.models.machines.Machine;\n\ntry (StreamResponse<Machine> streamResponse = client.machines().watchStreaming(params)) {\n    streamResponse.stream().forEach(chunk -> {\n        System.out.println(chunk);\n    });\n    System.out.println("No more chunks!");\n}\n```\n\nOr [`AsyncStreamResponse`](dedalus-java-core/src/main/kotlin/com/dedalus/api/core/http/AsyncStreamResponse.kt) for asynchronous clients:\n\n```java\nimport com.dedalus.api.core.http.AsyncStreamResponse;\nimport com.dedalus.api.models.machines.Machine;\nimport java.util.Optional;\n\nclient.async().machines().watchStreaming(params).subscribe(chunk -> {\n    System.out.println(chunk);\n});\n\n// If you need to handle errors or completion of the stream\nclient.async().machines().watchStreaming(params).subscribe(new AsyncStreamResponse.Handler<>() {\n    @Override\n    public void onNext(Machine chunk) {\n        System.out.println(chunk);\n    }\n\n    @Override\n    public void onComplete(Optional<Throwable> error) {\n        if (error.isPresent()) {\n            System.out.println("Something went wrong!");\n            throw new RuntimeException(error.get());\n        } else {\n            System.out.println("No more chunks!");\n        }\n    }\n});\n\n// Or use futures\nclient.async().machines().watchStreaming(params)\n    .subscribe(chunk -> {\n        System.out.println(chunk);\n    })\n    .onCompleteFuture()\n    .whenComplete((unused, error) -> {\n        if (error != null) {\n            System.out.println("Something went wrong!");\n            throw new RuntimeException(error);\n        } else {\n            System.out.println("No more chunks!");\n        }\n    });\n```\n\nAsync streaming uses a dedicated per-client cached thread pool         [`Executor`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Executor.html)         to stream without blocking the current thread. This default is suitable for most purposes.\n\nTo use a different `Executor`, configure the subscription using the `executor` parameter:\n\n```java\nimport java.util.concurrent.Executor;\nimport java.util.concurrent.Executors;\n\nExecutor executor = Executors.newFixedThreadPool(4);\nclient.async().machines().watchStreaming(params).subscribe(\n    chunk -> System.out.println(chunk), executor\n);\n```\n\nOr configure the client globally using the `streamHandlerExecutor` method:\n\n```java\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport java.util.concurrent.Executors;\n\nDedalusClient client = DedalusOkHttpClient.builder()\n    .fromEnv()\n    .streamHandlerExecutor(Executors.newFixedThreadPool(4))\n    .build();\n```\n\n\n\n\n\n## Raw responses\n\nThe SDK defines methods that deserialize responses into instances of Java classes.       However, these methods don\'t provide access to the response headers, status code, or the raw response       body.\n\nTo access this data, prefix any HTTP method call on a client or service with `withRawResponse()`:\n\n```java\nimport com.dedalus.api.core.http.Headers;\nimport com.dedalus.api.core.http.HttpResponseFor;\nimport com.dedalus.api.models.machines.CreateParams;\nimport com.dedalus.api.models.machines.Machine;\n\nCreateParams params = CreateParams.builder()\n    .memoryMiB(0L)\n    .storageGiB(0L)\n    .vcpu(0.0)\n    .build();\nHttpResponseFor<Machine> machine = client.machines().withRawResponse().create(params);\n\nint statusCode = machine.statusCode();\nHeaders headers = machine.headers();\n```\n\nYou can still deserialize the response into an instance of a Java class if needed:\n\n```java\nimport com.dedalus.api.models.machines.Machine;\n\nMachine parsedMachine = machine.parse();\n```\n\n## Error handling\n\nThe SDK throws custom unchecked exception types:\n\n- [`DedalusServiceException`](dedalus-java-core/src/main/kotlin/com/dedalus/api/errors/DedalusServiceException.kt): Base class for HTTP errors. See this table for which exception       subclass is thrown for each HTTP status code:\n\n  | Status | Exception                                          |\n  | ------ | -------------------------------------------------- |\n  | 400    | [`BadRequestException`](dedalus-java-core/src/main/kotlin/com/dedalus/api/errors/BadRequestException.kt)           |\n  | 401    | [`UnauthorizedException`](dedalus-java-core/src/main/kotlin/com/dedalus/api/errors/UnauthorizedException.kt)         |\n  | 403    | [`PermissionDeniedException`](dedalus-java-core/src/main/kotlin/com/dedalus/api/errors/PermissionDeniedException.kt)     |\n  | 404    | [`NotFoundException`](dedalus-java-core/src/main/kotlin/com/dedalus/api/errors/NotFoundException.kt)             |\n  | 422    | [`UnprocessableEntityException`](dedalus-java-core/src/main/kotlin/com/dedalus/api/errors/UnprocessableEntityException.kt)  |\n  | 429    | [`RateLimitException`](dedalus-java-core/src/main/kotlin/com/dedalus/api/errors/RateLimitException.kt)            |\n  | 5xx    | [`InternalServerException`](dedalus-java-core/src/main/kotlin/com/dedalus/api/errors/InternalServerException.kt)       |\n  | others | [`UnexpectedStatusCodeException`](dedalus-java-core/src/main/kotlin/com/dedalus/api/errors/UnexpectedStatusCodeException.kt) |\n\n  [`SseException`](dedalus-java-core/src/main/kotlin/com/dedalus/api/errors/SseException.kt) is thrown for errors encountered during             [SSE streaming](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) after a             successful initial HTTP response.\n\n- [`DedalusIoException`](dedalus-java-core/src/main/kotlin/com/dedalus/api/errors/DedalusIoException.kt): I/O networking errors.\n\n- [`DedalusRetryableException`](dedalus-java-core/src/main/kotlin/com/dedalus/api/errors/DedalusRetryableException.kt): Generic error indicating a failure that could be retried by the client.\n\n- [`DedalusInvalidDataException`](dedalus-java-core/src/main/kotlin/com/dedalus/api/errors/DedalusInvalidDataException.kt): Failure to interpret successfully parsed data. For example,       when accessing a property that\'s supposed to be required, but the API unexpectedly omitted it from the       response.\n\n- [`DedalusException`](dedalus-java-core/src/main/kotlin/com/dedalus/api/errors/DedalusException.kt): Base class for all exceptions. Most errors will result in one of the       previously mentioned ones, but completely generic errors may be thrown using the base class.\n\n## Pagination\n\nThe SDK defines methods that return a paginated lists of results. It provides convenient ways to access     the results either one page at a time or item-by-item across all pages.\n\n### Auto-pagination\n\nTo iterate through all results across all pages, use the `autoPager()` method, which automatically     fetches more pages as needed.\n\nWhen using the synchronous client, the method returns an [`Iterable`](https://docs.oracle.com/javase/8/docs/api/java/lang/Iterable.html)\n\n```java\nimport com.dedalus.api.models.machines.MachineListItem;\nimport com.dedalus.api.models.machines.MachineListPage;\n\nMachineListPage page = client.machines().list();\n\n// Process as an Iterable\nfor (MachineListItem machine : page.autoPager()) {\n    System.out.println(machine);\n}\n\n// Process as a Stream\npage.autoPager()\n    .stream()\n    .limit(50)\n    .forEach(machine -> System.out.println(machine));\n```\n\nWhen using the asynchronous client, the method returns an [`AsyncStreamResponse`](dedalus-java-core/src/main/kotlin/com/dedalus/api/core/http/AsyncStreamResponse.kt):\n\n```java\nimport com.dedalus.api.core.http.AsyncStreamResponse;\nimport com.dedalus.api.models.machines.MachineListItem;\nimport com.dedalus.api.models.machines.MachineListPageAsync;\nimport java.util.Optional;\nimport java.util.concurrent.CompletableFuture;\n\nCompletableFuture<MachineListPageAsync> pageFuture = client.async().machines().list();\n\npageFuture.thenRun(page -> page.autoPager().subscribe(machine -> {\n    System.out.println(machine);\n}));\n\n// If you need to handle errors or completion of the stream\npageFuture.thenRun(page -> page.autoPager().subscribe(new AsyncStreamResponse.Handler<>() {\n    @Override\n    public void onNext(MachineListItem machine) {\n        System.out.println(machine);\n    }\n\n    @Override\n    public void onComplete(Optional<Throwable> error) {\n        if (error.isPresent()) {\n            System.out.println("Something went wrong!");\n            throw new RuntimeException(error.get());\n        } else {\n            System.out.println("No more!");\n        }\n    }\n}));\n\n// Or use futures\npageFuture.thenRun(page -> page.autoPager()\n    .subscribe(machine -> {\n        System.out.println(machine);\n    })\n    .onCompleteFuture()\n    .whenComplete((unused, error) -> {\n        if (error != null) {\n            System.out.println("Something went wrong!");\n            throw new RuntimeException(error);\n        } else {\n            System.out.println("No more!");\n        }\n    }));\n```\n\n### Manual pagination\n\nTo access individual page items and manually request the next page, use the `items()`,\n`hasNextPage()`, and `nextPage()` methods:\n\n```java\nimport com.dedalus.api.models.machines.MachineListItem;\nimport com.dedalus.api.models.machines.MachineListPage;\n\nMachineListPage page = client.machines().list();\nwhile (true) {\n    for (MachineListItem machine : page.items()) {\n        System.out.println(machine);\n    }\n\n    if (!page.hasNextPage()) {\n        break;\n    }\n\n    page = page.nextPage();\n}\n```\n\n## Logging\n\nEnable logging by setting the `DEDALUS_LOG` environment variable to   `info`:\n\n```sh\nexport DEDALUS_LOG=info\n```\n\nOr to `debug` for more verbose logging:\n\n```sh\nexport DEDALUS_LOG=debug\n```\n\nOr configure the client manually using the `logLevel` method:\n\n```java\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.core.LogLevel;\n\nDedalusClient client = DedalusOkHttpClient.builder()\n    .fromEnv()\n    .logLevel(LogLevel.INFO)\n    .build();\n```\n\n## ProGuard and R8\n\nAlthough the SDK uses reflection, it is still usable with     [ProGuard](https://github.com/Guardsquare/proguard) and     [R8](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization) because     `dedalus-java-core` is published with a     [configuration file](dedalus-java-core/src/main/resources/META-INF/proguard/dedalus-java-core.pro) containing     [keep rules](https://www.guardsquare.com/manual/configuration/usage).\n\nProGuard and R8 should automatically detect and use the published rules, but you can also manually copy     the keep rules if necessary.\n\n\n\n\n\n## Jackson\n\nThe SDK depends on [Jackson](https://github.com/FasterXML/jackson) for JSON     serialization/deserialization. It is compatible with version 2.13.4 or higher,     but depends on version 2.18.2 by default.\n\nThe SDK throws an exception if it detects an incompatible Jackson version at runtime (e.g. if the     default version was overridden in your Maven or Gradle config).\n\nIf the SDK threw an exception, but you\'re _certain_ the version is compatible, then disable the version     check using the `checkJacksonVersionCompatibility` on [`DedalusOkHttpClient`](dedalus-java-client-okhttp/src/main/kotlin/com/dedalus/api/client/okhttp/DedalusOkHttpClient.kt) or     [`DedalusOkHttpClientAsync`](dedalus-java-client-okhttp/src/main/kotlin/com/dedalus/api/client/okhttp/DedalusOkHttpClientAsync.kt).\n\n> [!CAUTION]\n> We make no guarantee that the SDK works correctly when the Jackson version check is disabled.\n\nAlso note that there are bugs in older Jackson versions that can affect the SDK. We don\'t work around all     Jackson bugs ([example](https://github.com/FasterXML/jackson-databind/issues/3240)) and expect users to     upgrade Jackson for those instead.\n\n## Network options\n\n### Retries\n\nThe SDK automatically retries 2 times by default, with a short exponential backoff between requests.\n\nOnly the following error types are retried:\n- Connection errors (for example, due to a network connectivity problem)\n- 408 Request Timeout\n- 409 Conflict\n- 429 Rate Limit\n- 5xx Internal\n\nThe API may also explicitly instruct the SDK to retry or not retry a request.\n\nTo set a custom number of retries, configure the client using the `maxRetries` method:\n\n```java\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\n\nDedalusClient client = DedalusOkHttpClient.builder()\n    .fromEnv()\n    .maxRetries(4)\n    .build();\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default.\n\nTo set a custom timeout, configure the method call using the `timeout` method:\n\n```java\nimport com.dedalus.api.models.machines.Machine;\n\nMachine machine = client.machines().create(\n  params, RequestOptions.builder().timeout(Duration.ofSeconds(30)).build()\n);\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport java.time.Duration;\n\nDedalusClient client = DedalusOkHttpClient.builder()\n    .fromEnv()\n    .timeout(Duration.ofSeconds(30))\n    .build();\n```\n\n### Proxies\n\nTo route requests through a proxy, configure the client using the `proxy` method:\n\n```java\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport java.net.InetSocketAddress;\nimport java.net.Proxy;\n\nDedalusClient client = DedalusOkHttpClient.builder()\n    .fromEnv()\n    .proxy(new Proxy(\n      Proxy.Type.HTTP, new InetSocketAddress(\n        "https://example.com", 8080\n      )\n    ))\n    .build();\n```\n\nIf the proxy responds with `407 Proxy Authentication Required`, supply credentials by also   configuring `proxyAuthenticator`:\n\n```java\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport com.dedalus.api.core.http.ProxyAuthenticator;\n\nDedalusClient client = DedalusOkHttpClient.builder()\n    .fromEnv()\n    .proxy(...)\n    // Or a custom implementation of `ProxyAuthenticator`.\n    .proxyAuthenticator(ProxyAuthenticator.basic("username", "password"))\n    .build();\n```\n\n### Connection pooling\n\nTo customize the underlying OkHttp connection pool, configure the client using the   `maxIdleConnections` and `keepAliveDuration` methods:\n\n```java\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\nimport java.time.Duration;\n\nDedalusClient client = DedalusOkHttpClient.builder()\n    .fromEnv()\n    // If `maxIdleConnections` is set, then `keepAliveDuration` must be set, and vice versa.\n    .maxIdleConnections(10)\n    .keepAliveDuration(Duration.ofMinutes(2))\n    .build();\n```\n\nIf both options are unset, OkHttp\'s default connection pool settings are used.\n\n### HTTPS\n\n> [!NOTE]\n> Most applications should not call these methods, and instead use the system defaults. The defaults include\n> special optimizations that can be lost if the implementations are modified.\n\nTo configure how HTTPS connections are secured, configure the client using the `sslSocketFactory`,   `trustManager`, and `hostnameVerifier` methods:\n\n```java\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\n\nDedalusClient client = DedalusOkHttpClient.builder()\n    .fromEnv()\n    // If `sslSocketFactory` is set, then `trustManager` must be set, and vice versa.\n    .sslSocketFactory(yourSSLSocketFactory)\n    .trustManager(yourTrustManager)\n    .hostnameVerifier(yourHostnameVerifier)\n    .build();\n```\n\n\n\n### Custom HTTP client\n\nThe SDK consists of three artifacts:\n- `dedalus-java-core`\n  - Contains core SDK logic\n  - Does not depend on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`DedalusClient`](dedalus-java-core/src/main/kotlin/com/dedalus/api/client/DedalusClient.kt), [`DedalusClientAsync`](dedalus-java-core/src/main/kotlin/com/dedalus/api/client/DedalusClientAsync.kt),             [`DedalusClientImpl`](dedalus-java-core/src/main/kotlin/com/dedalus/api/client/DedalusClientImpl.kt), and [`DedalusClientAsyncImpl`](dedalus-java-core/src/main/kotlin/com/dedalus/api/client/DedalusClientAsyncImpl.kt), all of which can             work with any HTTP client\n- `dedalus-java-client-okhttp`\n  - Depends on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`DedalusOkHttpClient`](dedalus-java-client-okhttp/src/main/kotlin/com/dedalus/api/client/okhttp/DedalusOkHttpClient.kt) and [`DedalusOkHttpClientAsync`](dedalus-java-client-okhttp/src/main/kotlin/com/dedalus/api/client/okhttp/DedalusOkHttpClientAsync.kt), which             provide a way to construct [`DedalusClientImpl`](dedalus-java-core/src/main/kotlin/com/dedalus/api/client/DedalusClientImpl.kt) and             [`DedalusClientAsyncImpl`](dedalus-java-core/src/main/kotlin/com/dedalus/api/client/DedalusClientAsyncImpl.kt), respectively, using OkHttp\n- `dedalus-java`\n  - Depends on and exposes the APIs of both `dedalus-java-core` and `dedalus-java-client-okhttp`\n  - Does not have its own logic\n\nThis structure allows replacing the SDK\'s default HTTP client without pulling in unnecessary dependencies.\n\n#### Customized [`OkHttpClient`](https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html)\n\n> [!TIP]\n> Try the available [network options](#network-options) before replacing the default client.\n\nTo use a customized `OkHttpClient`:\n\n1. Replace your [`dedalus-java` dependency](#installation) with `dedalus-java-core`\n2. Copy `dedalus-java-client-okhttp`\'s [`OkHttpClient`](dedalus-java-client-okhttp/src/main/kotlin/com/dedalus/api/client/okhttp/OkHttpClient.kt) class into your code and        customize it\n3. Construct [`DedalusClientImpl`](dedalus-java-core/src/main/kotlin/com/dedalus/api/client/DedalusClientImpl.kt) or [`DedalusClientAsyncImpl`](dedalus-java-core/src/main/kotlin/com/dedalus/api/client/DedalusClientAsyncImpl.kt), similarly to        [`DedalusOkHttpClient`](dedalus-java-client-okhttp/src/main/kotlin/com/dedalus/api/client/okhttp/DedalusOkHttpClient.kt) or [`DedalusOkHttpClientAsync`](dedalus-java-client-okhttp/src/main/kotlin/com/dedalus/api/client/okhttp/DedalusOkHttpClientAsync.kt), using your        customized client\n\n### Completely custom HTTP client\n\nTo use a completely custom HTTP client:\n\n1. Replace your [`dedalus-java` dependency](#installation) with `dedalus-java-core`\n2. Write a class that implements the [`HttpClient`](dedalus-java-core/src/main/kotlin/com/dedalus/api/core/http/HttpClient.kt) interface\n3. Construct [`DedalusClientImpl`](dedalus-java-core/src/main/kotlin/com/dedalus/api/client/DedalusClientImpl.kt) or [`DedalusClientAsyncImpl`](dedalus-java-core/src/main/kotlin/com/dedalus/api/client/DedalusClientAsyncImpl.kt), similarly to        [`DedalusOkHttpClient`](dedalus-java-client-okhttp/src/main/kotlin/com/dedalus/api/client/okhttp/DedalusOkHttpClient.kt) or [`DedalusOkHttpClientAsync`](dedalus-java-client-okhttp/src/main/kotlin/com/dedalus/api/client/okhttp/DedalusOkHttpClientAsync.kt), using your new        client class\n\n## Undocumented API functionality\n\nThe SDK is typed for convenient usage of the documented API. However, it also supports working with undocumented or not yet supported parts of the API.\n\n### Parameters\n\nTo set undocumented parameters, call the `putAdditionalHeader`, `putAdditionalQueryParam`, or       `putAdditionalBodyProperty` methods on any `Params` class:\n\n```java\nimport com.dedalus.api.core.JsonValue;\nimport com.dedalus.api.models.machines.MachineCreateParams;\n\nMachineCreateParams params = MachineCreateParams.builder()\n    .putAdditionalHeader("Secret-Header", "42")\n    .putAdditionalQueryParam("secret_query_param", "42")\n    .putAdditionalBodyProperty("secretProperty", JsonValue.from("42"))\n    .build();\n```\n\nThese can be accessed on the built object later using the `_additionalHeaders()`,       `_additionalQueryParams()`, and `_additionalBodyProperties()` methods.\n\nTo set a documented parameter or property to an undocumented or not yet supported _value_, pass a       [`JsonValue`](dedalus-java-core/src/main/kotlin/com/dedalus/api/core/Values.kt) object to its setter:\n\n```java\nimport com.dedalus.api.models.machines.CreateParams;\nimport com.dedalus.api.models.machines.MachineCreateParams;\n\nMachineCreateParams params = MachineCreateParams.builder()\n    .createParams(CreateParams.builder()\n        .memoryMiB(0L)\n        .storageGiB(0L)\n        .vcpu(0.0)\n        .build())\n    .build();\n```\n\nThe most straightforward way to create a [`JsonValue`](dedalus-java-core/src/main/kotlin/com/dedalus/api/core/Values.kt) is using its       `from(...)` method:\n\n```java\nimport com.dedalus.api.core.JsonValue;\nimport java.util.List;\nimport java.util.Map;\n\n// Create primitive JSON values\nJsonValue nullValue = JsonValue.from(null);\nJsonValue booleanValue = JsonValue.from(true);\nJsonValue numberValue = JsonValue.from(42);\nJsonValue stringValue = JsonValue.from("Hello World!");\n\n// Create a JSON array value equivalent to `["Hello", "World"]`\nJsonValue arrayValue = JsonValue.from(List.of(\n  "Hello", "World"\n));\n\n// Create a JSON object value equivalent to `{ "a": 1, "b": 2 }`\nJsonValue objectValue = JsonValue.from(Map.of(\n  "a", 1,\n  "b", 2\n));\n\n// Create an arbitrarily nested JSON equivalent to:\n// {\n//   "a": [1, 2],\n//   "b": [3, 4]\n// }\nJsonValue complexValue = JsonValue.from(Map.of(\n  "a", List.of(\n    1, 2\n  ),\n  "b", List.of(\n    3, 4\n  )\n));\n```\n\nNormally a `Builder` class\'s `build` method will throw         [`IllegalStateException`](https://docs.oracle.com/javase/8/docs/api/java/lang/IllegalStateException.html)         if any required parameter or property is unset.\n\nTo forcibly omit a required parameter or property, pass [`JsonMissing`](dedalus-java-core/src/main/kotlin/com/dedalus/api/core/Values.kt):\n\n```java\nimport com.dedalus.api.core.JsonMissing;\nimport com.dedalus.api.models.machines.CreateParams;\nimport com.dedalus.api.models.machines.MachineCreateParams;\n\nMachineCreateParams params = MachineCreateParams.builder()\n    .createParams(CreateParams.builder()\n        .memoryMiB(0L)\n        .storageGiB(0L)\n        .vcpu(0.0)\n        .build())\n    .memoryMiB(JsonMissing.of())\n    .build();\n```\n\n### Response properties\n\nTo access undocumented response properties, call the `_additionalProperties()` method:\n\n```java\nimport com.dedalus.api.core.JsonValue;\nimport java.util.Map;\n\nMap<String, JsonValue> additionalProperties = client.machines().create(params)._additionalProperties();\nJsonValue secretPropertyValue = additionalProperties.get("secretProperty");\n\nString result = secretPropertyValue.accept(new JsonValue.Visitor<>() {\n    @Override\n    public String visitNull() {\n        return "It\'s null!";\n    }\n\n    @Override\n    public String visitBoolean(boolean value) {\n        return "It\'s a boolean!";\n    }\n\n    @Override\n    public String visitNumber(Number value) {\n        return "It\'s a number!";\n    }\n\n    // Other methods include `visitMissing`, `visitString`, `visitArray`, and `visitObject`\n    // The default implementation of each unimplemented method delegates to `visitDefault`, which throws by default, but can also be overridden\n});\n```\n\nTo access a property\'s raw JSON value, which may be undocumented, call its `_` prefixed method:\n\n```java\nimport com.dedalus.api.core.JsonField;\nimport java.util.Optional;\n\nJsonField<Object> field = client.machines().create(params)._field();\n\nif (field.isMissing()) {\n  // The property is absent from the JSON response\n} else if (field.isNull()) {\n  // The property was set to literal null\n} else {\n  // Check if value was provided as a string\n  // Other methods include `asNumber()`, `asBoolean()`, etc.\n  Optional<String> jsonString = field.asString();\n\n  // Try to deserialize into a custom type\n  MyClass myObject = field.asUnknown().orElseThrow().convert(MyClass.class);\n}\n```\n\n### Response validation\n\nIn rare cases, the API may return a response that doesn\'t match the expected type. For example, the SDK     may expect a property to contain a `String`, but the API could return something else.\n\nBy default, the SDK will not throw an exception in this case. It will throw     [`DedalusInvalidDataException`](dedalus-java-core/src/main/kotlin/com/dedalus/api/errors/DedalusInvalidDataException.kt) only if you directly access the property.\n\nValidating the response is _not_ forwards compatible with new types from the API for existing fields.\n\nIf you would still prefer to check that the response is completely well-typed upfront, then either call     `validate()`:\n\n```java\nimport com.dedalus.api.models.machines.Machine;\n\nMachine machine = client.machines().create(params).validate();\n```\n\nOr configure the method call to validate the response using the `responseValidation` method:\n\n```java\nimport com.dedalus.api.models.machines.Machine;\n\nMachine machine = client.machines().create(\n  params, RequestOptions.builder().responseValidation(true).build()\n);\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport com.dedalus.api.client.DedalusClient;\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient;\n\nDedalusClient client = DedalusOkHttpClient.builder()\n    .fromEnv()\n    .responseValidation(true)\n    .build();\n```\n\n## FAQ\n\n### Why don\'t you use plain `enum` classes?\n\nJava `enum` classes are not trivially   [forwards compatible](https://www.stainless.com/blog/making-java-enums-forwards-compatible). Using them in   the SDK could cause runtime exceptions if the API is updated to respond with a new enum value.\n\n### Why do you represent fields using `JsonField<T>` instead of just plain `T`?\n\nUsing `JsonField<T>` enables a few features:\n\n- Allowing usage of [undocumented API functionality](#undocumented-api-functionality)\n- Lazily [validating the API response against the expected shape](#response-validation)\n- Representing absent vs explicitly null values\n\n### Why don\'t you use [`data` classes](https://kotlinlang.org/docs/data-classes.html)?\n\nIt is not [backwards compatible to add new fields to a data class](https://kotlinlang.org/docs/api-guidelines-backward-compatibility.html#avoid-using-data-classes-in-your-api)   and we don\'t want to introduce a breaking change every time we add a field to a class.\n\n### Why don\'t you use checked exceptions?\n\nChecked exceptions are widely considered a mistake in the Java programming language. In fact, they were   omitted from Kotlin for this reason.\n\nChecked exceptions:\n\n- Are verbose to handle\n- Encourage error handling at the wrong level of abstraction, where nothing can be done about the error\n- Are tedious to propagate due to the [function coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function)\n- Don\'t play well with lambdas (also due to the function coloring problem)\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/dedalus-labs/dedalus-java/issues) with questions, bugs, or suggestions.\n',
  },
  {
    language: 'kotlin',
    content:
      '# Dedalus Kotlin API Library\n\n\n[![Maven Central](https://img.shields.io/maven-central/v/com.dedalus.api/dedalus-kotlin)](https://central.sonatype.com/artifact/com.dedalus.api/dedalus-kotlin/0.0.1)\n[![javadoc](https://javadoc.io/badge2/com.dedalus.api/dedalus-kotlin/0.0.1/javadoc.svg)](https://javadoc.io/doc/com.dedalus.api/dedalus-kotlin/0.0.1)\n\n\nThe Dedalus Kotlin SDK provides convenient access to the [Dedalus REST API](https://docs.dedaluslabs.ai)   from applications written in Kotlin.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dedalus MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=dedalus-mcp&config=eyJuYW1lIjoiZGVkYWx1cy1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly9kZWRhbHVzLnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7IngtYXBpLWtleSI6Ik15IFggQVBJIEtleSIsIngtZGVkYWx1cy1hcGkta2V5IjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22dedalus-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fdedalus.stlmcp.com%22%2C%22headers%22%3A%7B%22x-api-key%22%3A%22My%20X%20API%20Key%22%2C%22x-dedalus-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\nThe REST API documentation can be found on [docs.dedaluslabs.ai](https://docs.dedaluslabs.ai). KDocs are available on [javadoc.io](https://javadoc.io/doc/com.dedalus.api/dedalus-kotlin/0.0.1).\n\n## Installation\n\n### Gradle\n\n~~~kotlin\nimplementation("com.dedalus.api:dedalus-kotlin:0.0.1")\n~~~\n\n### Maven\n\n~~~xml\n<dependency>\n  <groupId>com.dedalus.api</groupId>\n  <artifactId>dedalus-kotlin</artifactId>\n  <version>0.0.1</version>\n</dependency>\n~~~\n\n## Requirements\n\nThis library requires Java 8 or later.\n\n## Usage\n\n```kotlin\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.CreateParams\nimport com.dedalus.api.models.machines.Machine\n\n// Configures using the `dedalus.apiKey`, `dedalus.xApiKey`, `dedalus.orgId` and `dedalus.baseUrl` system properties\n// Or configures using the `DEDALUS_API_KEY`, `DEDALUS_X_API_KEY`, `DEDALUS_ORG_ID` and `DEDALUS_BASE_URL` environment variables\nval client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\nval params: CreateParams = CreateParams.builder()\n    .memoryMiB(0L)\n    .storageGiB(0L)\n    .vcpu(0.0)\n    .build()\nval machine: Machine = client.machines().create(params)\n```\n\n## Client configuration\n\nConfigure the client using system properties or environment variables:\n\n```kotlin\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\n\n// Configures using the `dedalus.apiKey`, `dedalus.xApiKey`, `dedalus.orgId` and `dedalus.baseUrl` system properties\n// Or configures using the `DEDALUS_API_KEY`, `DEDALUS_X_API_KEY`, `DEDALUS_ORG_ID` and `DEDALUS_BASE_URL` environment variables\nval client: DedalusClient = DedalusOkHttpClient.fromEnv()\n```\n\nOr manually:\n\n```kotlin\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\n\nval client: DedalusClient = DedalusOkHttpClient.builder()\n    .apiKey("My API Key")\n    .build()\n```\n\nOr using a combination of the two approaches:\n\n```kotlin\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\n\nval client: DedalusClient = DedalusOkHttpClient.builder()\n    // Configures using the `dedalus.apiKey`, `dedalus.xApiKey`, `dedalus.orgId` and `dedalus.baseUrl` system properties\n    // Or configures using the `DEDALUS_API_KEY`, `DEDALUS_X_API_KEY`, `DEDALUS_ORG_ID` and `DEDALUS_BASE_URL` environment variables\n    .fromEnv()\n    .apiKey("My API Key")\n    .build()\n```\n\nSee this table for the available options:\n\n| Setter         | System property   | Environment variable | Required | Default value                  |\n| -------------- | ----------------- | -------------------- | -------- | ------------------------------ |\n| `apiKey`       | `dedalus.apiKey`  | `DEDALUS_API_KEY`    | false    | -                              |\n| `xApiKey`      | `dedalus.xApiKey` | `DEDALUS_X_API_KEY`  | false    | -                              |\n| `dedalusOrgId` | `dedalus.orgId`   | `DEDALUS_ORG_ID`     | false    | -                              |\n| `baseUrl`      | `dedalus.baseUrl` | `DEDALUS_BASE_URL`   | true     | `"https://dcs.dedaluslabs.ai"` |\n\nSystem properties take precedence over environment variables.\n\n> [!TIP]\n> Don\'t create more than one client in the same application. Each client has a connection pool and\n> thread pools, which are more efficient to share between requests.\n\n### Modifying configuration\n\nTo temporarily use a modified client configuration, while reusing the same connection and thread       pools, call `withOptions()` on any client or service:\n\n```kotlin\nimport com.dedalus.api.client.DedalusClient\n\nval clientWithOptions: DedalusClient = client.withOptions {\n    it.baseUrl("https://example.com")\n    it.maxRetries(42)\n}\n```\n\nThe `withOptions()` method does not affect the original client or service.\n\n## Requests and responses\n\nTo send a request to the Dedalus API, build an instance of some `Params` class and pass it to the     corresponding client method. When the response is received, it will be deserialized into an instance of     a Kotlin class.\n\nFor example, `client.machines().create(...)` should be called with an instance of `MachineCreateParams`, and it     will return an instance of `Machine`.\n\n## Immutability\n\nEach class in the SDK has an associated   [builder](https://blogs.oracle.com/javamagazine/post/exploring-joshua-blochs-builder-design-pattern-in-java)   or factory method for constructing it.\n\nEach class is [immutable](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html)   once constructed. If the class has an associated builder, then it has a `toBuilder()` method, which can   be used to convert it back to a builder for making a modified copy.\n\nBecause each class is immutable, builder modification will _never_ affect already built class instances.\n\n## Asynchronous execution\n\nThe default client is synchronous. To switch to asynchronous execution, call the `async()` method:\n\n```kotlin\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.models.machines.CreateParams\nimport com.dedalus.api.models.machines.Machine\n\n// Configures using the `dedalus.apiKey`, `dedalus.xApiKey`, `dedalus.orgId` and `dedalus.baseUrl` system properties\n// Or configures using the `DEDALUS_API_KEY`, `DEDALUS_X_API_KEY`, `DEDALUS_ORG_ID` and `DEDALUS_BASE_URL` environment variables\nval client: DedalusClient = DedalusOkHttpClient.fromEnv()\n\nval params: CreateParams = CreateParams.builder()\n    .memoryMiB(0L)\n    .storageGiB(0L)\n    .vcpu(0.0)\n    .build()\nval machine: Machine = client.async().machines().create(params)\n```\n\nOr create an asynchronous client from the beginning:\n\n```kotlin\nimport com.dedalus.api.client.DedalusClientAsync\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClientAsync\nimport com.dedalus.api.models.machines.CreateParams\nimport com.dedalus.api.models.machines.Machine\n\n// Configures using the `dedalus.apiKey`, `dedalus.xApiKey`, `dedalus.orgId` and `dedalus.baseUrl` system properties\n// Or configures using the `DEDALUS_API_KEY`, `DEDALUS_X_API_KEY`, `DEDALUS_ORG_ID` and `DEDALUS_BASE_URL` environment variables\nval client: DedalusClientAsync = DedalusOkHttpClientAsync.fromEnv()\n\nval params: CreateParams = CreateParams.builder()\n    .memoryMiB(0L)\n    .storageGiB(0L)\n    .vcpu(0.0)\n    .build()\nval machine: Machine = client.machines().create(params)\n```\n\nThe asynchronous client supports the same options as the synchronous one, except most methods are [suspending](https://kotlinlang.org/docs/coroutines-guide.html).\n\n## Streaming\n\nThe SDK defines methods that return response "chunk" streams, where each chunk can be individually     processed as soon as it arrives instead of waiting on the full response. Streaming methods generally     correspond to [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) or     [JSONL](https://jsonlines.org) responses.\n\nSome of these methods may have streaming and non-streaming variants, but a streaming method will     always have a `Streaming` suffix in its name, even if it doesn\'t have a non-streaming variant.\n\nThese streaming methods return [`StreamResponse`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/core/http/StreamResponse.kt) for synchronous clients:\n\n```kotlin\nclient.machines().watchStreaming(params).use { response ->\n    response.asSequence().forEach { println(it) }\n    println("No more chunks!")\n}\n```\n\n\n\n\n\n## Raw responses\n\nThe SDK defines methods that deserialize responses into instances of Kotlin classes.       However, these methods don\'t provide access to the response headers, status code, or the raw response       body.\n\nTo access this data, prefix any HTTP method call on a client or service with `withRawResponse()`:\n\n```kotlin\nimport com.dedalus.api.core.http.Headers\nimport com.dedalus.api.core.http.HttpResponseFor\nimport com.dedalus.api.models.machines.CreateParams\nimport com.dedalus.api.models.machines.Machine\n\nval params: CreateParams = CreateParams.builder()\n    .memoryMiB(0L)\n    .storageGiB(0L)\n    .vcpu(0.0)\n    .build()\nval machine: HttpResponseFor<Machine> = client.machines().withRawResponse().create(params)\n\nval statusCode: Int = machine.statusCode()\nval headers: Headers = machine.headers()\n```\n\nYou can still deserialize the response into an instance of a Kotlin class if needed:\n\n```kotlin\nimport com.dedalus.api.models.machines.Machine\n\nval parsedMachine: Machine = machine.parse()\n```\n\n## Error handling\n\nThe SDK throws custom unchecked exception types:\n\n- [`DedalusServiceException`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/errors/DedalusServiceException.kt): Base class for HTTP errors. See this table for which exception       subclass is thrown for each HTTP status code:\n\n  | Status | Exception                                          |\n  | ------ | -------------------------------------------------- |\n  | 400    | [`BadRequestException`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/errors/BadRequestException.kt)           |\n  | 401    | [`UnauthorizedException`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/errors/UnauthorizedException.kt)         |\n  | 403    | [`PermissionDeniedException`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/errors/PermissionDeniedException.kt)     |\n  | 404    | [`NotFoundException`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/errors/NotFoundException.kt)             |\n  | 422    | [`UnprocessableEntityException`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/errors/UnprocessableEntityException.kt)  |\n  | 429    | [`RateLimitException`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/errors/RateLimitException.kt)            |\n  | 5xx    | [`InternalServerException`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/errors/InternalServerException.kt)       |\n  | others | [`UnexpectedStatusCodeException`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/errors/UnexpectedStatusCodeException.kt) |\n\n  [`SseException`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/errors/SseException.kt) is thrown for errors encountered during             [SSE streaming](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) after a             successful initial HTTP response.\n\n- [`DedalusIoException`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/errors/DedalusIoException.kt): I/O networking errors.\n\n- [`DedalusRetryableException`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/errors/DedalusRetryableException.kt): Generic error indicating a failure that could be retried by the client.\n\n- [`DedalusInvalidDataException`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/errors/DedalusInvalidDataException.kt): Failure to interpret successfully parsed data. For example,       when accessing a property that\'s supposed to be required, but the API unexpectedly omitted it from the       response.\n\n- [`DedalusException`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/errors/DedalusException.kt): Base class for all exceptions. Most errors will result in one of the       previously mentioned ones, but completely generic errors may be thrown using the base class.\n\n## Pagination\n\nThe SDK defines methods that return a paginated lists of results. It provides convenient ways to access     the results either one page at a time or item-by-item across all pages.\n\n### Auto-pagination\n\nTo iterate through all results across all pages, use the `autoPager()` method, which automatically     fetches more pages as needed.\n\nWhen using the synchronous client, the method returns a [`Sequence`](https://kotlinlang.org/docs/sequences.html)\n\n```kotlin\nimport com.dedalus.api.models.machines.MachineListPage\n\nval page: MachineListPage = client.machines().list()\npage.autoPager()\n    .take(50)\n    .forEach { machine -> println(machine) }\n```\n\nWhen using the asynchronous client, the method returns a [`Flow`](https://kotlinlang.org/docs/flow.html):\n\n```kotlin\nimport com.dedalus.api.models.machines.MachineListPageAsync\n\nval page: MachineListPageAsync = client.async().machines().list()\npage.autoPager()\n    .take(50)\n    .forEach { machine -> println(machine) }\n```\n\n### Manual pagination\n\nTo access individual page items and manually request the next page, use the `items()`,\n`hasNextPage()`, and `nextPage()` methods:\n\n```kotlin\nimport com.dedalus.api.models.machines.MachineListItem\nimport com.dedalus.api.models.machines.MachineListPage\n\nval page: MachineListPage = client.machines().list()\nwhile (true) {\n    for (machine in page.items()) {\n        println(machine)\n    }\n\n    if (!page.hasNextPage()) {\n        break\n    }\n\n    page = page.nextPage()\n}\n```\n\n## Logging\n\nEnable logging by setting the `DEDALUS_LOG` environment variable to   `info`:\n\n```sh\nexport DEDALUS_LOG=info\n```\n\nOr to `debug` for more verbose logging:\n\n```sh\nexport DEDALUS_LOG=debug\n```\n\nOr configure the client manually using the `logLevel` method:\n\n```kotlin\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.core.LogLevel\n\nval client: DedalusClient = DedalusOkHttpClient.builder()\n    .fromEnv()\n    .logLevel(LogLevel.INFO)\n    .build()\n```\n\n## ProGuard and R8\n\nAlthough the SDK uses reflection, it is still usable with     [ProGuard](https://github.com/Guardsquare/proguard) and     [R8](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization) because     `dedalus-kotlin-core` is published with a     [configuration file](dedalus-kotlin-core/src/main/resources/META-INF/proguard/dedalus-kotlin-core.pro) containing     [keep rules](https://www.guardsquare.com/manual/configuration/usage).\n\nProGuard and R8 should automatically detect and use the published rules, but you can also manually copy     the keep rules if necessary.\n\n\n\n\n\n## Jackson\n\nThe SDK depends on [Jackson](https://github.com/FasterXML/jackson) for JSON     serialization/deserialization. It is compatible with version 2.13.4 or higher,     but depends on version 2.18.2 by default.\n\nThe SDK throws an exception if it detects an incompatible Jackson version at runtime (e.g. if the     default version was overridden in your Maven or Gradle config).\n\nIf the SDK threw an exception, but you\'re _certain_ the version is compatible, then disable the version     check using the `checkJacksonVersionCompatibility` on [`DedalusOkHttpClient`](dedalus-kotlin-client-okhttp/src/main/kotlin/com/dedalus/api/client/okhttp/DedalusOkHttpClient.kt) or     [`DedalusOkHttpClientAsync`](dedalus-kotlin-client-okhttp/src/main/kotlin/com/dedalus/api/client/okhttp/DedalusOkHttpClientAsync.kt).\n\n> [!CAUTION]\n> We make no guarantee that the SDK works correctly when the Jackson version check is disabled.\n\nAlso note that there are bugs in older Jackson versions that can affect the SDK. We don\'t work around all     Jackson bugs ([example](https://github.com/FasterXML/jackson-databind/issues/3240)) and expect users to     upgrade Jackson for those instead.\n\n## Network options\n\n### Retries\n\nThe SDK automatically retries 2 times by default, with a short exponential backoff between requests.\n\nOnly the following error types are retried:\n- Connection errors (for example, due to a network connectivity problem)\n- 408 Request Timeout\n- 409 Conflict\n- 429 Rate Limit\n- 5xx Internal\n\nThe API may also explicitly instruct the SDK to retry or not retry a request.\n\nTo set a custom number of retries, configure the client using the `maxRetries` method:\n\n```kotlin\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\n\nval client: DedalusClient = DedalusOkHttpClient.builder()\n    .fromEnv()\n    .maxRetries(4)\n    .build()\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default.\n\nTo set a custom timeout, configure the method call using the `timeout` method:\n\n```kotlin\nimport com.dedalus.api.models.machines.Machine\n\nval machine: Machine = client.machines().create(\n  params, RequestOptions.builder().timeout(Duration.ofSeconds(30)).build()\n)\n```\n\nOr configure the default for all method calls at the client level:\n\n```kotlin\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport java.time.Duration\n\nval client: DedalusClient = DedalusOkHttpClient.builder()\n    .fromEnv()\n    .timeout(Duration.ofSeconds(30))\n    .build()\n```\n\n### Proxies\n\nTo route requests through a proxy, configure the client using the `proxy` method:\n\n```kotlin\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport java.net.InetSocketAddress\nimport java.net.Proxy\n\nval client: DedalusClient = DedalusOkHttpClient.builder()\n    .fromEnv()\n    .proxy(Proxy(\n      Proxy.Type.HTTP, InetSocketAddress(\n        "https://example.com", 8080\n      )\n    ))\n    .build()\n```\n\nIf the proxy responds with `407 Proxy Authentication Required`, supply credentials by also   configuring `proxyAuthenticator`:\n\n```kotlin\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport com.dedalus.api.core.http.ProxyAuthenticator\n\nval client: DedalusClient = DedalusOkHttpClient.builder()\n    .fromEnv()\n    .proxy(...)\n    // Or a custom implementation of `ProxyAuthenticator`.\n    .proxyAuthenticator(ProxyAuthenticator.basic("username", "password"))\n    .build()\n```\n\n### Connection pooling\n\nTo customize the underlying OkHttp connection pool, configure the client using the   `maxIdleConnections` and `keepAliveDuration` methods:\n\n```kotlin\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\nimport java.time.Duration\n\nval client: DedalusClient = DedalusOkHttpClient.builder()\n    .fromEnv()\n    // If `maxIdleConnections` is set, then `keepAliveDuration` must be set, and vice versa.\n    .maxIdleConnections(10)\n    .keepAliveDuration(Duration.ofMinutes(2))\n    .build()\n```\n\nIf both options are unset, OkHttp\'s default connection pool settings are used.\n\n### HTTPS\n\n> [!NOTE]\n> Most applications should not call these methods, and instead use the system defaults. The defaults include\n> special optimizations that can be lost if the implementations are modified.\n\nTo configure how HTTPS connections are secured, configure the client using the `sslSocketFactory`,   `trustManager`, and `hostnameVerifier` methods:\n\n```kotlin\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\n\nval client: DedalusClient = DedalusOkHttpClient.builder()\n    .fromEnv()\n    // If `sslSocketFactory` is set, then `trustManager` must be set, and vice versa.\n    .sslSocketFactory(yourSSLSocketFactory)\n    .trustManager(yourTrustManager)\n    .hostnameVerifier(yourHostnameVerifier)\n    .build()\n```\n\n\n\n### Custom HTTP client\n\nThe SDK consists of three artifacts:\n- `dedalus-kotlin-core`\n  - Contains core SDK logic\n  - Does not depend on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`DedalusClient`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/client/DedalusClient.kt), [`DedalusClientAsync`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/client/DedalusClientAsync.kt),             [`DedalusClientImpl`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/client/DedalusClientImpl.kt), and [`DedalusClientAsyncImpl`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/client/DedalusClientAsyncImpl.kt), all of which can             work with any HTTP client\n- `dedalus-kotlin-client-okhttp`\n  - Depends on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`DedalusOkHttpClient`](dedalus-kotlin-client-okhttp/src/main/kotlin/com/dedalus/api/client/okhttp/DedalusOkHttpClient.kt) and [`DedalusOkHttpClientAsync`](dedalus-kotlin-client-okhttp/src/main/kotlin/com/dedalus/api/client/okhttp/DedalusOkHttpClientAsync.kt), which             provide a way to construct [`DedalusClientImpl`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/client/DedalusClientImpl.kt) and             [`DedalusClientAsyncImpl`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/client/DedalusClientAsyncImpl.kt), respectively, using OkHttp\n- `dedalus-kotlin`\n  - Depends on and exposes the APIs of both `dedalus-kotlin-core` and `dedalus-kotlin-client-okhttp`\n  - Does not have its own logic\n\nThis structure allows replacing the SDK\'s default HTTP client without pulling in unnecessary dependencies.\n\n#### Customized [`OkHttpClient`](https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html)\n\n> [!TIP]\n> Try the available [network options](#network-options) before replacing the default client.\n\nTo use a customized `OkHttpClient`:\n\n1. Replace your [`dedalus-kotlin` dependency](#installation) with `dedalus-kotlin-core`\n2. Copy `dedalus-kotlin-client-okhttp`\'s [`OkHttpClient`](dedalus-kotlin-client-okhttp/src/main/kotlin/com/dedalus/api/client/okhttp/OkHttpClient.kt) class into your code and        customize it\n3. Construct [`DedalusClientImpl`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/client/DedalusClientImpl.kt) or [`DedalusClientAsyncImpl`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/client/DedalusClientAsyncImpl.kt), similarly to        [`DedalusOkHttpClient`](dedalus-kotlin-client-okhttp/src/main/kotlin/com/dedalus/api/client/okhttp/DedalusOkHttpClient.kt) or [`DedalusOkHttpClientAsync`](dedalus-kotlin-client-okhttp/src/main/kotlin/com/dedalus/api/client/okhttp/DedalusOkHttpClientAsync.kt), using your        customized client\n\n### Completely custom HTTP client\n\nTo use a completely custom HTTP client:\n\n1. Replace your [`dedalus-kotlin` dependency](#installation) with `dedalus-kotlin-core`\n2. Write a class that implements the [`HttpClient`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/core/http/HttpClient.kt) interface\n3. Construct [`DedalusClientImpl`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/client/DedalusClientImpl.kt) or [`DedalusClientAsyncImpl`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/client/DedalusClientAsyncImpl.kt), similarly to        [`DedalusOkHttpClient`](dedalus-kotlin-client-okhttp/src/main/kotlin/com/dedalus/api/client/okhttp/DedalusOkHttpClient.kt) or [`DedalusOkHttpClientAsync`](dedalus-kotlin-client-okhttp/src/main/kotlin/com/dedalus/api/client/okhttp/DedalusOkHttpClientAsync.kt), using your new        client class\n\n## Undocumented API functionality\n\nThe SDK is typed for convenient usage of the documented API. However, it also supports working with undocumented or not yet supported parts of the API.\n\n### Parameters\n\nTo set undocumented parameters, call the `putAdditionalHeader`, `putAdditionalQueryParam`, or       `putAdditionalBodyProperty` methods on any `Params` class:\n\n```kotlin\nimport com.dedalus.api.core.JsonValue\nimport com.dedalus.api.models.machines.MachineCreateParams\n\nval params: MachineCreateParams = MachineCreateParams.builder()\n    .putAdditionalHeader("Secret-Header", "42")\n    .putAdditionalQueryParam("secret_query_param", "42")\n    .putAdditionalBodyProperty("secretProperty", JsonValue.from("42"))\n    .build()\n```\n\nThese can be accessed on the built object later using the `_additionalHeaders()`,       `_additionalQueryParams()`, and `_additionalBodyProperties()` methods.\n\nTo set a documented parameter or property to an undocumented or not yet supported _value_, pass a       [`JsonValue`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/core/Values.kt) object to its setter:\n\n```kotlin\nimport com.dedalus.api.models.machines.CreateParams\nimport com.dedalus.api.models.machines.MachineCreateParams\n\nval params: MachineCreateParams = MachineCreateParams.builder()\n    .createParams(CreateParams.builder()\n        .memoryMiB(0L)\n        .storageGiB(0L)\n        .vcpu(0.0)\n        .build())\n    .build()\n```\n\nThe most straightforward way to create a [`JsonValue`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/core/Values.kt) is using its       `from(...)` method:\n\n```kotlin\nimport com.dedalus.api.core.JsonValue\n\n// Create primitive JSON values\nval nullValue: JsonValue = JsonValue.from(null)\nval booleanValue: JsonValue = JsonValue.from(true)\nval numberValue: JsonValue = JsonValue.from(42)\nval stringValue: JsonValue = JsonValue.from("Hello World!")\n\n// Create a JSON array value equivalent to `["Hello", "World"]`\nval arrayValue: JsonValue = JsonValue.from(listOf(\n  "Hello", "World"\n))\n\n// Create a JSON object value equivalent to `{ "a": 1, "b": 2 }`\nval objectValue: JsonValue = JsonValue.from(mapOf(\n  "a" to 1, "b" to 2\n))\n\n// Create an arbitrarily nested JSON equivalent to:\n// {\n//   "a": [1, 2],\n//   "b": [3, 4]\n// }\nval complexValue: JsonValue = JsonValue.from(mapOf(\n  "a" to listOf(\n    1, 2\n  ), "b" to listOf(\n    3, 4\n  )\n))\n```\n\nNormally a `Builder` class\'s `build` method will throw         [`IllegalStateException`](https://docs.oracle.com/javase/8/docs/api/java/lang/IllegalStateException.html)         if any required parameter or property is unset.\n\nTo forcibly omit a required parameter or property, pass [`JsonMissing`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/core/Values.kt):\n\n```kotlin\nimport com.dedalus.api.core.JsonMissing\nimport com.dedalus.api.models.machines.CreateParams\nimport com.dedalus.api.models.machines.MachineCreateParams\n\nval params: MachineCreateParams = MachineCreateParams.builder()\n    .createParams(CreateParams.builder()\n        .memoryMiB(0L)\n        .storageGiB(0L)\n        .vcpu(0.0)\n        .build())\n    .memoryMiB(JsonMissing.of())\n    .build()\n```\n\n### Response properties\n\nTo access undocumented response properties, call the `_additionalProperties()` method:\n\n```kotlin\nimport com.dedalus.api.core.JsonBoolean\nimport com.dedalus.api.core.JsonNull\nimport com.dedalus.api.core.JsonNumber\nimport com.dedalus.api.core.JsonValue\n\nval additionalProperties: Map<String, JsonValue> = client.machines().create(params)._additionalProperties()\nval secretPropertyValue: JsonValue = additionalProperties.get("secretProperty")\n\nval result = when (secretPropertyValue) {\n    is JsonNull -> "It\'s null!"\n    is JsonBoolean -> "It\'s a boolean!"\n    is JsonNumber -> "It\'s a number!"\n    // Other types include `JsonMissing`, `JsonString`, `JsonArray`, and `JsonObject`\n    else -> "It\'s something else!"\n}\n```\n\nTo access a property\'s raw JSON value, which may be undocumented, call its `_` prefixed method:\n\n```kotlin\nimport com.dedalus.api.core.JsonField\n\nval field: JsonField<Any> = client.machines().create(params)._field()\n\nif (field.isMissing()) {\n  // The property is absent from the JSON response\n} else if (field.isNull()) {\n  // The property was set to literal null\n} else {\n  // Check if value was provided as a string\n  // Other methods include `asNumber()`, `asBoolean()`, etc.\n  val jsonString: String? = field.asString();\n\n  // Try to deserialize into a custom type\n  val myObject: MyClass = field.asUnknown()!!.convert(MyClass::class.java)\n}\n```\n\n### Response validation\n\nIn rare cases, the API may return a response that doesn\'t match the expected type. For example, the SDK     may expect a property to contain a `String`, but the API could return something else.\n\nBy default, the SDK will not throw an exception in this case. It will throw     [`DedalusInvalidDataException`](dedalus-kotlin-core/src/main/kotlin/com/dedalus/api/errors/DedalusInvalidDataException.kt) only if you directly access the property.\n\nValidating the response is _not_ forwards compatible with new types from the API for existing fields.\n\nIf you would still prefer to check that the response is completely well-typed upfront, then either call     `validate()`:\n\n```kotlin\nimport com.dedalus.api.models.machines.Machine\n\nval machine: Machine = client.machines().create(params).validate()\n```\n\nOr configure the method call to validate the response using the `responseValidation` method:\n\n```kotlin\nimport com.dedalus.api.models.machines.Machine\n\nval machine: Machine = client.machines().create(\n  params, RequestOptions.builder().responseValidation(true).build()\n)\n```\n\nOr configure the default for all method calls at the client level:\n\n```kotlin\nimport com.dedalus.api.client.DedalusClient\nimport com.dedalus.api.client.okhttp.DedalusOkHttpClient\n\nval client: DedalusClient = DedalusOkHttpClient.builder()\n    .fromEnv()\n    .responseValidation(true)\n    .build()\n```\n\n## FAQ\n\n### Why don\'t you use plain `enum` classes?\n\nKotlin `enum` classes are not trivially   [forwards compatible](https://www.stainless.com/blog/making-java-enums-forwards-compatible). Using them in   the SDK could cause runtime exceptions if the API is updated to respond with a new enum value.\n\n### Why do you represent fields using `JsonField<T>` instead of just plain `T`?\n\nUsing `JsonField<T>` enables a few features:\n\n- Allowing usage of [undocumented API functionality](#undocumented-api-functionality)\n- Lazily [validating the API response against the expected shape](#response-validation)\n- Representing absent vs explicitly null values\n\n### Why don\'t you use [`data` classes](https://kotlinlang.org/docs/data-classes.html)?\n\nIt is not [backwards compatible to add new fields to a data class](https://kotlinlang.org/docs/api-guidelines-backward-compatibility.html#avoid-using-data-classes-in-your-api)   and we don\'t want to introduce a breaking change every time we add a field to a class.\n\n### Why don\'t you use checked exceptions?\n\nChecked exceptions are widely considered a mistake in the Java programming language. In fact, they were   omitted from Kotlin for this reason.\n\nChecked exceptions:\n\n- Are verbose to handle\n- Encourage error handling at the wrong level of abstraction, where nothing can be done about the error\n- Are tedious to propagate due to the [function coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function)\n- Don\'t play well with lambdas (also due to the function coloring problem)\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/stainless-sdks/dedalus-kotlin/issues) with questions, bugs, or suggestions.\n',
  },
  {
    language: 'php',
    content:
      '# Dedalus PHP API Library\n\nThe Dedalus PHP library provides convenient access to the Dedalus REST API from any PHP 8.1.0+ application.\n\n## Installation\n\nTo use this package, install via Composer by adding the following to your application\'s `composer.json`:\n\n```json\n{\n  "repositories": [\n    {\n      "type": "vcs",\n      "url": "git@github.com:stainless-sdks/dedalus-php.git"\n    }\n  ],\n  "require": {\n    "org-placeholder/dedalus": "dev-main"\n  }\n}\n```\n\n## Usage\n\n```php\n<?php\n\n$client = new Client(apiKey: getenv(\'DEDALUS_API_KEY\') ?: \'My API Key\');\n\n$machine = $client->machines->create(memoryMiB: 2048, storageGiB: 10, vcpu: 1);\n\nvar_dump($machine->machine_id);\n```',
  },
  {
    language: 'python',
    content:
      '# Dedalus Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/dedalus-sdk.svg?label=pypi%20(stable))](https://pypi.org/project/dedalus-sdk/)\n\nThe Dedalus Python library provides convenient access to the Dedalus REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dedalus MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=dedalus-mcp&config=eyJuYW1lIjoiZGVkYWx1cy1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly9kZWRhbHVzLnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7IngtYXBpLWtleSI6Ik15IFggQVBJIEtleSIsIngtZGVkYWx1cy1hcGkta2V5IjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22dedalus-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fdedalus.stlmcp.com%22%2C%22headers%22%3A%7B%22x-api-key%22%3A%22My%20X%20API%20Key%22%2C%22x-dedalus-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [docs.dedaluslabs.ai](https://docs.dedaluslabs.ai). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install dedalus-sdk\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\n\nmachine = client.machines.create(\n    memory_mib=2048,\n    storage_gib=10,\n    vcpu=1,\n)\nprint(machine.machine_id)\n```\n\nWhile you can provide a `x_api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `DEDALUS_X_API_KEY="My X API Key"` to your `.env` file\nso that your X API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncDedalus` instead of `Dedalus` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom dedalus_sdk import AsyncDedalus\n\nclient = AsyncDedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  machine = await client.machines.create(\n      memory_mib=2048,\n      storage_gib=10,\n      vcpu=1,\n  )\n  print(machine.machine_id)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install dedalus-sdk[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom dedalus_sdk import DefaultAioHttpClient\nfrom dedalus_sdk import AsyncDedalus\n\nasync def main() -> None:\n  async with AsyncDedalus(\n    api_key=os.environ.get("DEDALUS_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    machine = await client.machines.create(\n        memory_mib=2048,\n        storage_gib=10,\n        vcpu=1,\n    )\n    print(machine.machine_id)\n\nasyncio.run(main())\n```\n\n## Streaming responses\n\nWe provide support for streaming responses using Server Side Events (SSE).\n\n```python\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus()\n\nstream = client.machines.watch(\n    machine_id="dm-3",\n)\nfor machine in stream:\n  print(machine.machine_id)\n```\n\nThe async client uses the exact same interface.\n\n```python\nfrom dedalus_sdk import AsyncDedalus\n\nclient = AsyncDedalus()\n\nstream = await client.machines.watch(\n    machine_id="dm-3",\n)\nasync for machine in stream:\n  print(machine.machine_id)\n```\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n## Pagination\n\nList methods in the Dedalus API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```python\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus()\n\nall_machines = []\n# Automatically fetches more pages as needed.\nfor machine in client.machines.list():\n    # Do something with machine here\n    all_machines.append(machine)\nprint(all_machines)\n```\n\nOr, asynchronously:\n\n```python\nimport asyncio\nfrom dedalus_sdk import AsyncDedalus\n\nclient = AsyncDedalus()\n\nasync def main() -> None:\n    all_machines = []\n    # Iterate through items across all pages, issuing requests as needed.\n    async for machine in client.machines.list():\n        all_machines.append(machine)\n    print(all_machines)\n\nasyncio.run(main())\n```\n\nAlternatively, you can use the `.has_next_page()`, `.next_page_info()`, or  `.get_next_page()` methods for more granular control working with pages:\n\n```python\nfirst_page = await client.machines.list()\nif first_page.has_next_page():\n    print(f"will fetch next page using these details: {first_page.next_page_info()}")\n    next_page = await first_page.get_next_page()\n    print(f"number of items we just fetched: {len(next_page.items)}")\n\n# Remove `await` for non-async usage.\n```\n\nOr just work directly with the returned data:\n\n```python\nfirst_page = await client.machines.list()\n\nprint(f"next page cursor: {first_page.next_cursor}") # => "next page cursor: ..."\nfor machine in first_page.items:\n    print(machine.machine_id)\n\n# Remove `await` for non-async usage.\n```\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `dedalus_sdk.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `dedalus_sdk.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `dedalus_sdk.APIError`.\n\n```python\nimport dedalus_sdk\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus()\n\ntry:\n    client.machines.create(\n        memory_mib=2048,\n        storage_gib=10,\n        vcpu=1,\n    )\nexcept dedalus_sdk.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept dedalus_sdk.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept dedalus_sdk.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom dedalus_sdk import Dedalus\n\n# Configure the default for all requests:\nclient = Dedalus(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).machines.create(\n    memory_mib=2048,\n    storage_gib=10,\n    vcpu=1,\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom dedalus_sdk import Dedalus\n\n# Configure the default for all requests:\nclient = Dedalus(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Dedalus(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).machines.create(\n    memory_mib=2048,\n    storage_gib=10,\n    vcpu=1,\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `DEDALUS_LOG` to `info`.\n\n```shell\n$ export DEDALUS_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom dedalus_sdk import Dedalus\n\nclient = Dedalus()\nresponse = client.machines.with_raw_response.create(\n    memory_mib=2048,\n    storage_gib=10,\n    vcpu=1,\n)\nprint(response.headers.get(\'X-My-Header\'))\n\nmachine = response.parse()  # get the object that `machines.create()` would have returned\nprint(machine.machine_id)\n```\n\nThese methods return an [`APIResponse`](https://github.com/dedalus-labs/dedalus-python/tree/main/src/dedalus_sdk/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/dedalus-labs/dedalus-python/tree/main/src/dedalus_sdk/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.machines.with_streaming_response.create(\n    memory_mib=2048,\n    storage_gib=10,\n    vcpu=1,\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom dedalus_sdk import Dedalus, DefaultHttpxClient\n\nclient = Dedalus(\n    # Or use the `DEDALUS_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom dedalus_sdk import Dedalus\n\nwith Dedalus() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/dedalus-labs/dedalus-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport dedalus_sdk\nprint(dedalus_sdk.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'ruby',
    content:
      '# Dedalus Ruby API library\n\nThe Dedalus Ruby library provides convenient access to the Dedalus REST API from any Ruby 3.2.0+ application. It ships with comprehensive types & docstrings in Yard, RBS, and RBI – [see below](https://github.com/dedalus-labs/dedalus-ruby#Sorbet) for usage with Sorbet. The standard library\'s `net/http` is used as the HTTP transport, with connection pooling via the `connection_pool` gem.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dedalus MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=dedalus-mcp&config=eyJuYW1lIjoiZGVkYWx1cy1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly9kZWRhbHVzLnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7IngtYXBpLWtleSI6Ik15IFggQVBJIEtleSIsIngtZGVkYWx1cy1hcGkta2V5IjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22dedalus-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fdedalus.stlmcp.com%22%2C%22headers%22%3A%7B%22x-api-key%22%3A%22My%20X%20API%20Key%22%2C%22x-dedalus-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nDocumentation for releases of this gem can be found [on RubyDoc](https://gemdocs.org/gems/dedalus).\n\nThe REST API documentation can be found on [docs.dedaluslabs.ai](https://docs.dedaluslabs.ai).\n\n## Installation\n\nTo use this gem, install via Bundler by adding the following to your application\'s `Gemfile`:\n\n<!-- x-release-please-start-version -->\n\n```ruby\ngem "dedalus", "~> 0.0.1"\n```\n\n<!-- x-release-please-end -->\n\n## Usage\n\n```ruby\nrequire "bundler/setup"\nrequire "dedalus"\n\ndedalus = Dedalus::Client.new(\n  api_key: ENV["DEDALUS_API_KEY"] # This is the default and can be omitted\n)\n\nmachine = dedalus.machines.create(memory_mib: 2048, storage_gib: 10, vcpu: 1)\n\nputs(machine.machine_id)\n```\n\n### Streaming\n\nWe provide support for streaming responses using Server-Sent Events (SSE).\n\n```ruby\nstream = dedalus.machines.watch_streaming\n\nstream.each do |machine|\n  puts(machine.machine_id)\nend\n```\n\n### Pagination\n\nList methods in the Dedalus API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```ruby\npage = dedalus.machines.list\n\n# Fetch single item from page.\nmachine = page.items[0]\nputs(machine.machine_id)\n\n# Automatically fetches more pages as needed.\npage.auto_paging_each do |machine|\n  puts(machine.machine_id)\nend\n```\n\nAlternatively, you can use the `#next_page?` and `#next_page` methods for more granular control working with pages.\n\n```ruby\nif page.next_page?\n  new_page = page.next_page\n  puts(new_page.items[0].machine_id)\nend\n```\n\n\n\n### Handling errors\n\nWhen the library is unable to connect to the API, or if the API returns a non-success status code (i.e., 4xx or 5xx response), a subclass of `Dedalus::Errors::APIError` will be thrown:\n\n```ruby\nbegin\n  machine = dedalus.machines.create(memory_mib: 2048, storage_gib: 10, vcpu: 1)\nrescue Dedalus::Errors::APIConnectionError => e\n  puts("The server could not be reached")\n  puts(e.cause)  # an underlying Exception, likely raised within `net/http`\nrescue Dedalus::Errors::RateLimitError => e\n  puts("A 429 status code was received; we should back off a bit.")\nrescue Dedalus::Errors::APIStatusError => e\n  puts("Another non-200-range status code was received")\n  puts(e.status)\nend\n```\n\nError codes are as follows:\n\n| Cause            | Error Type                 |\n| ---------------- | -------------------------- |\n| HTTP 400         | `BadRequestError`          |\n| HTTP 401         | `AuthenticationError`      |\n| HTTP 403         | `PermissionDeniedError`    |\n| HTTP 404         | `NotFoundError`            |\n| HTTP 409         | `ConflictError`            |\n| HTTP 422         | `UnprocessableEntityError` |\n| HTTP 429         | `RateLimitError`           |\n| HTTP >= 500      | `InternalServerError`      |\n| Other HTTP error | `APIStatusError`           |\n| Timeout          | `APITimeoutError`          |\n| Network error    | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\n\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict, 429 Rate Limit, >=500 Internal errors, and timeouts will all be retried by default.\n\nYou can use the `max_retries` option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\ndedalus = Dedalus::Client.new(\n  max_retries: 0 # default is 2\n)\n\n# Or, configure per-request:\ndedalus.machines.create(memory_mib: 2048, storage_gib: 10, vcpu: 1, request_options: {max_retries: 5})\n```\n\n### Timeouts\n\nBy default, requests will time out after 60 seconds. You can use the timeout option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\ndedalus = Dedalus::Client.new(\n  timeout: nil # default is 60\n)\n\n# Or, configure per-request:\ndedalus.machines.create(memory_mib: 2048, storage_gib: 10, vcpu: 1, request_options: {timeout: 5})\n```\n\nOn timeout, `Dedalus::Errors::APITimeoutError` is raised.\n\nNote that requests that time out are retried by default.\n\n## Advanced concepts\n\n### BaseModel\n\nAll parameter and response objects inherit from `Dedalus::Internal::Type::BaseModel`, which provides several conveniences, including:\n\n1. All fields, including unknown ones, are accessible with `obj[:prop]` syntax, and can be destructured with `obj => {prop: prop}` or pattern-matching syntax.\n\n2. Structural equivalence for equality; if two API calls return the same values, comparing the responses with == will return true.\n\n3. Both instances and the classes themselves can be pretty-printed.\n\n4. Helpers such as `#to_h`, `#deep_to_h`, `#to_json`, and `#to_yaml`.\n\n### Making custom or undocumented requests\n\n#### Undocumented properties\n\nYou can send undocumented parameters to any endpoint, and read undocumented response properties, like so:\n\nNote: the `extra_` parameters of the same name overrides the documented parameters.\n\n```ruby\nmachine =\n  dedalus.machines.create(\n    memory_mib: 2048,\n    storage_gib: 10,\n    vcpu: 1,\n    request_options: {\n      extra_query: {my_query_parameter: value},\n      extra_body: {my_body_parameter: value},\n      extra_headers: {"my-header": value}\n    }\n  )\n\nputs(machine[:my_undocumented_property])\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` under the `request_options:` parameter when making a request, as seen in the examples above.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints while retaining the benefit of auth, retries, and so on, you can make requests using `client.request`, like so:\n\n```ruby\nresponse = client.request(\n  method: :post,\n  path: \'/undocumented/endpoint\',\n  query: {"dog": "woof"},\n  headers: {"useful-header": "interesting-value"},\n  body: {"hello": "world"}\n)\n```\n\n### Concurrency & connection pooling\n\nThe `Dedalus::Client` instances are threadsafe, but are only are fork-safe when there are no in-flight HTTP requests.\n\nEach instance of `Dedalus::Client` has its own HTTP connection pool with a default size of 99. As such, we recommend instantiating the client once per application in most settings.\n\nWhen all available connections from the pool are checked out, requests wait for a new connection to become available, with queue time counting towards the request timeout.\n\nUnless otherwise specified, other classes in the SDK do not have locks protecting their underlying data structure.\n\n## Sorbet\n\nThis library provides comprehensive [RBI](https://sorbet.org/docs/rbi) definitions, and has no dependency on sorbet-runtime.\n\nYou can provide typesafe request parameters like so:\n\n```ruby\ndedalus.machines.create(memory_mib: 2048, storage_gib: 10, vcpu: 1)\n```\n\nOr, equivalently:\n\n```ruby\n# Hashes work, but are not typesafe:\ndedalus.machines.create(memory_mib: 2048, storage_gib: 10, vcpu: 1)\n\n# You can also splat a full Params class:\nparams = Dedalus::MachineCreateParams.new(memory_mib: 2048, storage_gib: 10, vcpu: 1)\ndedalus.machines.create(**params)\n```\n\n### Enums\n\nSince this library does not depend on `sorbet-runtime`, it cannot provide [`T::Enum`](https://sorbet.org/docs/tenum) instances. Instead, we provide "tagged symbols" instead, which is always a primitive at runtime:\n\n```ruby\n# :http\nputs(Dedalus::Machines::PreviewCreateParams::Protocol::HTTP)\n\n# Revealed type: `T.all(Dedalus::Machines::PreviewCreateParams::Protocol, Symbol)`\nT.reveal_type(Dedalus::Machines::PreviewCreateParams::Protocol::HTTP)\n```\n\nEnum parameters have a "relaxed" type, so you can either pass in enum constants or their literal value:\n\n```ruby\n# Using the enum constants preserves the tagged type information:\ndedalus.machines.previews.create(\n  protocol: Dedalus::Machines::PreviewCreateParams::Protocol::HTTP,\n  # …\n)\n\n# Literal values are also permissible:\ndedalus.machines.previews.create(\n  protocol: :http,\n  # …\n)\n```\n\n## Versioning\n\nThis package follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions. As the library is in initial development and has a major version of `0`, APIs may change at any time.\n\nThis package considers improvements to the (non-runtime) `*.rbi` and `*.rbs` type definitions to be non-breaking changes.\n\n## Requirements\n\nRuby 3.2.0 or higher.\n\n## Contributing\n\nSee [the contributing documentation](https://github.com/dedalus-labs/dedalus-ruby/tree/main/CONTRIBUTING.md).\n',
  },
  {
    language: 'terraform',
    content:
      '# Dedalus Terraform Provider\n\nThe [Dedalus Terraform provider](https://registry.terraform.io/providers/dedalus-labs/dedalus/latest/docs) provides convenient access to\nthe [Dedalus REST API](https://docs.dedaluslabs.ai) from Terraform.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## Requirements\n\nThis provider requires Terraform CLI 1.0 or later. You can [install it for your system](https://developer.hashicorp.com/terraform/install)\non Hashicorp\'s website.\n\n## Usage\n\nAdd the following to your `main.tf` file:\n\n<!-- x-release-please-start-version -->\n\n```hcl\n# Declare the provider and version\nterraform {\n  required_providers {\n    SDK_ProviderTypeName = {\n      source  = "dedalus-labs/dedalus"\n      version = "~> 0.0.1"\n    }\n  }\n}\n\n# Initialize the provider\nprovider "dedalus" {\n  # Dedalus API key sent as Authorization Bearer.\n  api_key = "My API Key" # or set DEDALUS_API_KEY env variable\n  # Dedalus API key sent as x-api-key header.\n  x_api_key = "My X API Key" # or set DEDALUS_X_API_KEY env variable\n  # Organization ID header for all DCS requests.\n  dedalus_org_id = "My Dedalus Org ID" # or set DEDALUS_ORG_ID env variable\n}\n\n# Configure a resource\nresource "dedalus_machine" "example_machine" {\n  memory_mib = 2048\n  storage_gib = 10\n  vcpu = 1\n  autosleep = "autosleep"\n}\n```\n\n<!-- x-release-please-end -->\n\nInitialize your project by running `terraform init` in the directory.\n\nAdditional examples can be found in the [./examples](./examples) folder within this repository, and you can\nrefer to the full documentation on [the Terraform Registry](https://registry.terraform.io/providers/dedalus-labs/dedalus/latest/docs).\n\n### Provider Options\nWhen you initialize the provider, the following options are supported. It is recommended to use environment variables for sensitive values like access tokens.\nIf an environment variable is provided, then the option does not need to be set in the terraform source.\n\n| Property       | Environment variable | Required | Default value |\n| -------------- | -------------------- | -------- | ------------- |\n| x_api_key      | `DEDALUS_X_API_KEY`  | false    | —             |\n| dedalus_org_id | `DEDALUS_ORG_ID`     | false    | —             |\n| api_key        | `DEDALUS_API_KEY`    | false    | —             |\n\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/dedalus-labs/terraform-provider-dedalus/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Dedalus TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/dedalus.svg?label=npm%20(stable))](https://npmjs.org/package/dedalus) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/dedalus)\n\nThis library provides convenient access to the Dedalus REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [docs.dedaluslabs.ai](https://docs.dedaluslabs.ai). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Dedalus MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=dedalus-mcp&config=eyJuYW1lIjoiZGVkYWx1cy1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly9kZWRhbHVzLnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7IngtYXBpLWtleSI6Ik15IFggQVBJIEtleSIsIngtZGVkYWx1cy1hcGkta2V5IjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22dedalus-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fdedalus.stlmcp.com%22%2C%22headers%22%3A%7B%22x-api-key%22%3A%22My%20X%20API%20Key%22%2C%22x-dedalus-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install dedalus\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst machine = await client.machines.create({\n  memory_mib: 2048,\n  storage_gib: 10,\n  vcpu: 1,\n});\n\nconsole.log(machine.machine_id);\n```\n\n## Streaming responses\n\nWe provide support for streaming responses using Server Sent Events (SSE).\n\n```ts\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus();\n\nconst stream = await client.machines.watch({ machine_id: 'dm-3' });\nfor await (const machine of stream) {\n  console.log(machine.machine_id);\n}\n```\n\nIf you need to cancel a stream, you can `break` from the loop\nor call `stream.controller.abort()`.\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  apiKey: process.env['DEDALUS_API_KEY'], // This is the default and can be omitted\n});\n\nconst params: Dedalus.MachineCreateParams = {\n  memory_mib: 2048,\n  storage_gib: 10,\n  vcpu: 1,\n};\nconst machine: Dedalus.Machine = await client.machines.create(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst machine = await client.machines\n  .create({\n    memory_mib: 2048,\n    storage_gib: 10,\n    vcpu: 1,\n  })\n  .catch(async (err) => {\n    if (err instanceof Dedalus.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.error?.error_code); // IDEMPOTENCY_KEY_REUSED\n      console.log(err.error?.message); // idempotency key reused with different request parameters\n      console.log(err.error?.retryable); // false\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Dedalus({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.machines.create({\n  memory_mib: 2048,\n  storage_gib: 10,\n  vcpu: 1,\n}, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Dedalus({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.machines.create({\n  memory_mib: 2048,\n  storage_gib: 10,\n  vcpu: 1,\n}, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the Dedalus API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllMachineListItems(params) {\n  const allMachineListItems = [];\n  // Automatically fetches more pages as needed.\n  for await (const machineListItem of client.machines.list()) {\n    allMachineListItems.push(machineListItem);\n  }\n  return allMachineListItems;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.machines.list();\nfor (const machineListItem of page.items) {\n  console.log(machineListItem);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Dedalus();\n\nconst response = await client.machines\n  .create({\n    memory_mib: 2048,\n    storage_gib: 10,\n    vcpu: 1,\n  })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: machine, response: raw } = await client.machines\n  .create({\n    memory_mib: 2048,\n    storage_gib: 10,\n    vcpu: 1,\n  })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(machine.machine_id);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `DEDALUS_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Dedalus from 'dedalus';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Dedalus({\n  logger: logger.child({ name: 'Dedalus' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.machines.create({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Dedalus from 'dedalus';\nimport fetch from 'my-fetch';\n\nconst client = new Dedalus({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Dedalus from 'dedalus';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Dedalus({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Dedalus from 'dedalus';\n\nconst client = new Dedalus({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Dedalus from 'npm:dedalus';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Dedalus({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/dedalus-labs/dedalus-typescript/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\n> [!WARNING]\n> Web browser runtimes aren't supported. The SDK will throw an error if used in a browser environment.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
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
