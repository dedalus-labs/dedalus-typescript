// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as UsageAPI from './usage';
import {
  MachineStorageUsage,
  MachineStorageUsageEvidence,
  MachineUsage,
  MachineUsageEvidence,
  OrgUsage,
  Usage,
  UsageGetMachineStorageUsageParams,
  UsageGetMachineUsageParams,
  UsageRetrieveParams,
} from './usage';

export class Orgs extends APIResource {
  usage: UsageAPI.Usage = new UsageAPI.Usage(this._client);
}

Orgs.Usage = Usage;

export declare namespace Orgs {
  export {
    Usage as Usage,
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
