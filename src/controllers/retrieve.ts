import {FreeSVG} from '../free-svg';
import {RawSVG, RetrieveResult} from '../objects';

export function retrieve(
  this: FreeSVG,
  id: number | string
): Promise<RetrieveResult> {
  const _id = encodeURIComponent(id);
  const options = {
    path: `/api/v1/svg/${_id}`,
  };

  return this._request(options).then(rawData => {
    return new RetrieveResult(<RawSVG>rawData.data);
  });
}
