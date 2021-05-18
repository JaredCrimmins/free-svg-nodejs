import {BaseFreeSVG} from './base-free-svg';
import {SVG} from './svg';
import {
  RawLinkDictionary,
  RawMetaDictionary,
  LinkDictionary,
  MetaDictionary,
} from './base-free-svg';
import type {RawSVG} from './svg';

export type RawSVGList = {
  data: RawSVG[];
  links: RawLinkDictionary;
  meta: RawMetaDictionary;
};

export class SVGList extends BaseFreeSVG {
  data: SVG[];
  links: LinkDictionary;
  meta: MetaDictionary;

  constructor(raw: RawSVGList) {
    const {meta} = raw;

    super();

    this.data = raw.data.map(item => {
      return new SVG(item);
    });
    this.links = raw.links;
    this.meta = {
      currentPage: meta.current_page,
      from: meta.from,
      lastPage: meta.last_page,
      path: meta.path,
      perPage: meta.per_page,
      to: meta.to,
      total: meta.total,
    };
  }
}
