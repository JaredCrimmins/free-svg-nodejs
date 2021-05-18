import {Agent} from 'http';
import * as controllers from './controllers';
import * as https from 'https';
import {request} from './client';

export type FreeSVGOptions = {
  agent?: Agent;

  /** The hostname that the client connects to. Setting this may be valueable for
   * debugging/testing or if FreeSVG changes its API address.
   */
  hostname?: string;
  port?: number | string;
  protocol?: 'https:' | 'http:';
  /** Milliseconds before a request times out. */
  timeout?: number;
};

export class FreeSVG implements FreeSVGOptions {
  agent?: Agent;
  hostname: string;
  token: string;
  port: number | string;
  protocol: 'https:' | 'http:';
  timeout?: number;

  constructor(token: string, options: FreeSVGOptions = {}) {
    this.token = token;
    this.agent = options.agent;
    this.hostname = options.hostname || 'reserve.freesvg.org';
    this.protocol = options.protocol || 'https:';
    this.port = options.port || this.protocol === 'https:' ? 443 : 80;
    this.timeout = options.timeout;
  }

  _getAuthorizationHeader() {
    return {
      Authorization: 'Bearer ' + this.token,
    };
  }

  _request(options: https.RequestOptions) {
    return request(
      Object.assign(
        {
          headers: this._getAuthorizationHeader(),
          hostname: this.hostname,
          port: this.port,
          protocol: this.protocol,
          timeout: this.timeout,
        },
        options
      )
    );
  }

  list = controllers.list;
  retrieve = controllers.retrieve;
  search = controllers.search;
}
