import {FreeSVG} from '../free-svg';
import {SearchResult} from '../objects';
import type {RawSVGList} from '../objects/svg-list';

export type SearchOptions = {
  query?: string;
  page?: number;
};

export function search(
  this: FreeSVG,
  options: SearchOptions = {}
): Promise<SearchResult> {
  const query = encodeURIComponent(options.query || '');
  const page = encodeURIComponent(options.page || 1);
  const requestOptions = {
    path: `/api/v1/search?query=${query}&page=${page}`,
  };

  return this._request(requestOptions).then(rawData => {
    return new SearchResult(<RawSVGList>rawData);
  });
}
