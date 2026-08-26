// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from '../../resource';
import { APIPromise } from '../../api-promise';
import type { RequestOptions } from '../../internal/request-options';
import { path as __scalarPath } from '../../internal/utils/path';

export class Network extends APIResource {
  /**
   * Get machine network identity
   *
   * @param {NetworkRetrieveParams} params - The parameters to send with the request.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<MachineNetwork>} OK
   *
   * @example
   * ```ts
   * const machineNetwork = await client.machines.network.retrieve({
   *   machine_id: 'machineID',
   * });
   * ```
   */
  retrieve(params: NetworkRetrieveParams, options?: RequestOptions): APIPromise<MachineNetwork> {
    const { machine_id } = params;
    return this._client.get(__scalarPath`/v1/machines/${machine_id}/network`, options);
  }
}

export interface MachineNetwork {
  hostname: string;
  machine_id: string;
  network_id: string;
  network_name: string;
  private_ipv4: string;
  private_ipv6: string;
}

export interface NetworkRetrieveParams {
  /**
   * @minLength 4
   * @maxLength 253
   * @pattern ^dm-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$
   */
  machine_id: string;
}
export declare namespace Network {
  export { type MachineNetwork as MachineNetwork, type NetworkRetrieveParams as NetworkRetrieveParams };
}
