// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Usage extends APIResource {
  /**
   * Get usage summary
   */
  retrieve(
    query: UsageRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrgUsage> {
    return this._client.get('/v1/usage', { query, ...options });
  }

  /**
   * List machine compute usage breakdown
   */
  machineCompute(
    query: UsageMachineComputeParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MachineComputeUsage> {
    return this._client.get('/v1/usage/machines/compute', { query, ...options });
  }

  /**
   * List machine storage usage breakdown
   */
  machineStorage(
    query: UsageMachineStorageParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MachineStorageUsage> {
    return this._client.get('/v1/usage/machines/storage', { query, ...options });
  }
}

export interface MachineComputeUsage {
  /**
   * Usage breakdown granularity used for rows: hour or day.
   */
  granularity: string;

  /**
   * Exclusive usage period end.
   */
  period_end: string;

  /**
   * Inclusive usage period start.
   */
  period_start: string;

  /**
   * Machine-level compute usage breakdown rows.
   */
  rows: Array<MachineComputeUsageRow> | null;
}

export interface MachineComputeUsageRow {
  /**
   * Machine-awake seconds in this bucket.
   */
  awake_seconds: number;

  /**
   * Exclusive usage bucket end.
   */
  bucket_end: string;

  /**
   * Inclusive usage bucket start.
   */
  bucket_start: string;

  /**
   * Requested vCPU millicores multiplied by guest-owned active CPU seconds.
   */
  cpu_millicore_seconds: number;

  /**
   * Latest raw window_end represented by this row.
   */
  last_window_end: string;

  /**
   * Machine identifier.
   */
  machine_id: string;

  /**
   * Requested memory MiB multiplied by running allocation seconds.
   */
  memory_mib_seconds: number;

  /**
   * Org compute bucket IDs this row contributes to.
   */
  org_metering_bucket_ids: Array<string> | null;

  /**
   * Requested memory for this shape, in MiB.
   */
  requested_memory_mib: number;

  /**
   * Requested storage for this shape, in GiB.
   */
  requested_storage_gib: number;

  /**
   * Requested vCPU for this shape.
   */
  requested_vcpu: number;

  /**
   * Stable fingerprint for the requested machine shape.
   */
  spec_fingerprint: string;

  /**
   * Stripe CPU meter event identifiers linked to those org buckets.
   */
  stripe_cpu_identifiers: Array<string> | null;

  /**
   * Stripe memory meter event identifiers linked to those org buckets.
   */
  stripe_memory_identifiers: Array<string> | null;

  /**
   * Raw usage windows compacted into this row.
   */
  window_count: number;

  /**
   * Latest Stripe emission timestamp for linked org buckets, when emitted.
   */
  latest_stripe_emitted_at?: string;
}

export interface MachineStorageUsage {
  /**
   * Exclusive usage period end.
   */
  period_end: string;

  /**
   * Inclusive usage period start.
   */
  period_start: string;

  /**
   * Machine-level storage usage breakdown rows.
   */
  rows: Array<MachineStorageUsageRow> | null;
}

export interface MachineStorageUsageRow {
  /**
   * Exclusive usage bucket end.
   */
  bucket_end: string;

  /**
   * Inclusive usage bucket start.
   */
  bucket_start: string;

  /**
   * Machine logical bytes observed for storage allocation.
   */
  logical_storage_bytes: number;

  /**
   * Machine identifier.
   */
  machine_id: string;

  /**
   * Org storage bucket ID this row contributes to.
   */
  org_metering_bucket_id: string;

  /**
   * Allocated logical MiB-seconds for this machine.
   */
  storage_mib_seconds: number;

  /**
   * Stripe storage meter event identifier linked to that org bucket.
   */
  stripe_storage_identifier: string;

  /**
   * Latest Stripe emission timestamp for the linked org bucket, when emitted.
   */
  latest_stripe_emitted_at?: string;
}

export interface OrgUsage {
  /**
   * Closed awake seconds in billed org buckets for the period.
   */
  billed_awake_seconds: number;

  /**
   * Closed requested vCPU millicores multiplied by guest-owned active CPU seconds
   * for the period.
   */
  billed_cpu_millicore_seconds: number;

  /**
   * Closed billable logical MiB-seconds for the period, matching the Stripe storage
   * meter.
   */
  billed_logical_storage_mib_seconds: number;

  /**
   * Closed requested memory MiB multiplied by running allocation seconds for the
   * period.
   */
  billed_memory_mib_seconds: number;

  /**
   * Plan-included storage in GiB, used as a local guardrail only.
   */
  included_storage_gib: number;

  /**
   * Billing plan in effect for the organization.
   */
  plan_slug: string;

  /**
   * Current provisioned storage summed across machines in GiB.
   */
  provisioned_storage_gib: number;
}

export interface UsageRetrieveParams {
  /**
   * Billing period start (YYYY-MM-DD). Defaults to first of current month.
   */
  period_start?: string;
}

export interface UsageMachineComputeParams {
  /**
   * Usage breakdown granularity: hour or day. Defaults to hour.
   */
  granularity?: string;

  /**
   * Optional machine ID filter.
   */
  machine_id?: string;

  /**
   * Last UTC usage date to include (YYYY-MM-DD). Defaults to current time.
   */
  period_end?: string;

  /**
   * Usage period start (YYYY-MM-DD). Defaults to first of current month.
   */
  period_start?: string;
}

export interface UsageMachineStorageParams {
  /**
   * Optional machine ID filter.
   */
  machine_id?: string;

  /**
   * Last UTC usage date to include (YYYY-MM-DD). Defaults to current time.
   */
  period_end?: string;

  /**
   * Usage period start (YYYY-MM-DD). Defaults to first of current month.
   */
  period_start?: string;
}

export declare namespace Usage {
  export {
    type MachineComputeUsage as MachineComputeUsage,
    type MachineComputeUsageRow as MachineComputeUsageRow,
    type MachineStorageUsage as MachineStorageUsage,
    type MachineStorageUsageRow as MachineStorageUsageRow,
    type OrgUsage as OrgUsage,
    type UsageRetrieveParams as UsageRetrieveParams,
    type UsageMachineComputeParams as UsageMachineComputeParams,
    type UsageMachineStorageParams as UsageMachineStorageParams,
  };
}
