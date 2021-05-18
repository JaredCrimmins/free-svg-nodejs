import {FreeSVG} from '../free-svg';
import {ListResult} from '../objects';
import type {RawSVGList} from '../objects/svg-list';

export type ListOptions = {
  page?: number;
};

export function list(
  this: FreeSVG,
  options: ListOptions = {}
): Promise<ListResult> {
  const page = encodeURIComponent(options.page || 1);
  const requestOptions = {
    path: `/api/v1/svgs?query=${page}`,
  };

  return this._request(requestOptions).then(rawData => {
    return new ListResult(<RawSVGList>rawData);
  });
}
