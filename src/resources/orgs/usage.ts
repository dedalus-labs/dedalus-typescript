// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Usage extends APIResource {
  /**
   * Get org billed machine usage
   */
  retrieve(params: UsageRetrieveParams, options?: RequestOptions): APIPromise<OrgUsage> {
    const { org_id, ...query } = params;
    return this._client.get(path`/v1/orgs/${org_id}/usage`, { query, ...options });
  }

  /**
   * List machine storage usage evidence
   */
  getMachineStorageUsage(
    params: UsageGetMachineStorageUsageParams,
    options?: RequestOptions,
  ): APIPromise<MachineStorageUsage> {
    const { org_id, ...query } = params;
    return this._client.get(path`/v1/orgs/${org_id}/usage/storage/machines`, { query, ...options });
  }

  /**
   * List machine usage evidence
   */
  getMachineUsage(params: UsageGetMachineUsageParams, options?: RequestOptions): APIPromise<MachineUsage> {
    const { org_id, ...query } = params;
    return this._client.get(path`/v1/orgs/${org_id}/usage/machines`, { query, ...options });
  }
}

export interface MachineStorageUsage {
  /**
   * Exclusive evidence period end.
   */
  period_end: string;

  /**
   * Inclusive evidence period start.
   */
  period_start: string;

  /**
   * Machine-level storage usage evidence rows.
   */
  rows: Array<MachineStorageUsageEvidence> | null;
}

export interface MachineStorageUsageEvidence {
  /**
   * Exclusive evidence bucket end.
   */
  bucket_end: string;

  /**
   * Inclusive evidence bucket start.
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
   * Org storage bucket ID this evidence row contributes to.
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

export interface MachineUsage {
  /**
   * Evidence granularity used for rows: hour or day.
   */
  granularity: string;

  /**
   * Exclusive evidence period end.
   */
  period_end: string;

  /**
   * Inclusive evidence period start.
   */
  period_start: string;

  /**
   * Machine-level usage evidence rows.
   */
  rows: Array<MachineUsageEvidence> | null;
}

export interface MachineUsageEvidence {
  /**
   * Machine-awake seconds in this bucket.
   */
  awake_seconds: number;

  /**
   * Exclusive evidence bucket end.
   */
  bucket_end: string;

  /**
   * Inclusive evidence bucket start.
   */
  bucket_start: string;

  /**
   * Requested vCPU millicores multiplied by active CPU seconds.
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
   * Requested memory MiB multiplied by awake seconds.
   */
  memory_mib_seconds: number;

  /**
   * Org compute bucket IDs this evidence row contributes to.
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
   * Raw usage windows compacted into this evidence row.
   */
  window_count: number;

  /**
   * Latest Stripe emission timestamp for linked org buckets, when emitted.
   */
  latest_stripe_emitted_at?: string;
}

export interface OrgUsage {
  /**
   * Closed awake seconds in billed org buckets for the period.
   */
  billed_awake_seconds: number;

  /**
   * Closed requested vCPU millicores multiplied by active CPU seconds for the
   * period.
   */
  billed_cpu_millicore_seconds: number;

  /**
   * Closed billable logical MiB-seconds for the period, matching the Stripe storage
   * meter.
   */
  billed_logical_storage_mib_seconds: number;

  /**
   * Closed requested memory MiB multiplied by awake seconds for the period.
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
   * Path param: Organization ID.
   */
  org_id: string;

  /**
   * Query param: Billing period start (YYYY-MM-DD). Defaults to first of current
   * month.
   */
  period_start?: string;
}

export interface UsageGetMachineStorageUsageParams {
  /**
   * Path param: Organization ID.
   */
  org_id: string;

  /**
   * Query param: Optional machine ID filter.
   */
  machine_id?: string;

  /**
   * Query param: Last UTC evidence date to include (YYYY-MM-DD). Defaults to current
   * time.
   */
  period_end?: string;

  /**
   * Query param: Evidence period start (YYYY-MM-DD). Defaults to first of current
   * month.
   */
  period_start?: string;
}

export interface UsageGetMachineUsageParams {
  /**
   * Path param: Organization ID.
   */
  org_id: string;

  /**
   * Query param: Evidence granularity: hour or day. Defaults to hour.
   */
  granularity?: string;

  /**
   * Query param: Optional machine ID filter.
   */
  machine_id?: string;

  /**
   * Query param: Last UTC evidence date to include (YYYY-MM-DD). Defaults to current
   * time.
   */
  period_end?: string;

  /**
   * Query param: Evidence period start (YYYY-MM-DD). Defaults to first of current
   * month.
   */
  period_start?: string;
}

export declare namespace Usage {
  export {
    type MachineStorageUsage as MachineStorageUsage,
    type MachineStorageUsageEvidence as MachineStorageUsageEvidence,
    type MachineUsage as MachineUsage,
    type MachineUsageEvidence as MachineUsageEvidence,
    type OrgUsage as OrgUsage,
    type UsageRetrieveParams as UsageRetrieveParams,
    type UsageGetMachineStorageUsageParams as UsageGetMachineStorageUsageParams,
    type UsageGetMachineUsageParams as UsageGetMachineUsageParams,
  };
}
