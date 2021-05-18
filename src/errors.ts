type BaseErrorCreationAttrs = {
  /** A human-readable description of the error. */
  message?: string;

  /** The original error that triggered this wrapper error. */
  original?: Error;

  /** The HTTP status code, if applicable. */
  statusCode?: number;
};

type FreeSVGErrorCreationAttrs = BaseErrorCreationAttrs & {
  type: string;
};

export class FreeSVGError implements FreeSVGErrorCreationAttrs {
  readonly message?: string;
  readonly original?: Error;
  readonly statusCode?: number;
  readonly type: string;

  constructor(attrs: FreeSVGErrorCreationAttrs) {
    this.message = attrs.message;
    this.original = attrs.original;
    this.statusCode = attrs.statusCode;
    this.type = attrs.type;
  }
}

type APIErrorCreationAttrs = BaseErrorCreationAttrs;

export class FreeSVGAPIError
  extends FreeSVGError
  implements APIErrorCreationAttrs
{
  constructor(attrs: ConnectionErrorCreationAttrs) {
    super({
      message: attrs.message,
      original: attrs.original,
      type: 'connection-error',
      statusCode: attrs.statusCode,
    });
  }
}

type ConnectionErrorCreationAttrs = BaseErrorCreationAttrs;

export class FreeSVGConnectionError
  extends FreeSVGError
  implements ConnectionErrorCreationAttrs
{
  constructor(attrs: ConnectionErrorCreationAttrs) {
    super({
      message: attrs.message,
      original: attrs.original,
      type: 'connection-error',
      statusCode: attrs.statusCode,
    });
  }
}

type InvalidRequestErrorCreationAttrs = BaseErrorCreationAttrs;

export class FreeSVGInvalidRequestError
  extends FreeSVGError
  implements InvalidRequestErrorCreationAttrs
{
  /**
   *
   * @param {object} attrs
   * @param {string} attrs.message - A human-readable description of the error.
   * @param {object} attrs.original - The original error that triggered this wrapper error.
   */
  constructor(attrs: InvalidRequestErrorCreationAttrs) {
    super({
      message: attrs.message,
      original: attrs.original,
      type: 'invalid-request-error',
      statusCode: attrs.statusCode,
    });
  }
}

type InvalidResponseErrorCreationAttrs = BaseErrorCreationAttrs;

export class FreeSVGInvalidResponseError
  extends FreeSVGError
  implements InvalidResponseErrorCreationAttrs
{
  constructor(attrs: InvalidResponseErrorCreationAttrs) {
    super({
      message: attrs.message,
      original: attrs.original,
      type: 'invalid-response-error',
      statusCode: attrs.statusCode,
    });
  }
}
