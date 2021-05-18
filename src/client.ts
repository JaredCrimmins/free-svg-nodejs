import * as errors from './errors';
import * as http from 'http';
import * as https from 'https';

const BASE_REQUEST_HEADERS = {
  'content-length': 0,
};

const BASE_REQUEST_OPTIONS = {
  method: 'GET',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ResponseBody = any;

type ClientOptions = https.RequestOptions & {
  timeout?: number;
};

export function request(options: ClientOptions): Promise<ResponseBody> {
  return new Promise((resolve, reject) => {
    const headers = Object.assign({}, BASE_REQUEST_HEADERS, options.headers);
    const requestOptions = Object.assign({}, BASE_REQUEST_OPTIONS, options, {
      headers,
    });
    const request = https.request(requestOptions, response => {
      const data: Uint8Array[] = [];

      response
        .on('data', (chunk: Uint8Array) => {
          data.push(chunk);
        })
        .on('end', () => {
          const rawData = parseResponseData(data);

          if (rawData instanceof Error) {
            reject(
              new errors.FreeSVGInvalidResponseError({
                original: rawData,
              })
            );
          } else if (response.statusCode === 200 && !rawData.error) {
            resolve(rawData);
          } else {
            reject(handleError(response, rawData));
          }
        });
    });

    if (options.timeout) {
      request.setTimeout(options.timeout);
    }

    request.on('error', error => {
      reject(
        new errors.FreeSVGConnectionError({
          original: error,
        })
      );
    });

    request.end();
  });
}

function parseResponseData(data: Uint8Array[]): ResponseBody | Error {
  const buffer = Buffer.concat(data);

  try {
    return JSON.parse(buffer.toString());
  } catch (error) {
    return error;
  }
}

function handleError(response: http.IncomingMessage, rawData: ResponseBody) {
  const error = rawData?.error;
  const statusCode: number = error.status_code
    ? error.status_code
    : <number>response.statusCode;
  let ErrorClass;

  if (statusCode <= 400 && statusCode >= 499) {
    ErrorClass = errors.FreeSVGInvalidRequestError;
  } else {
    ErrorClass = errors.FreeSVGAPIError;
  }

  return new ErrorClass({
    message: error.message,
    original: error.original,
    statusCode,
  });
}
