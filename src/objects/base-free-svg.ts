export type RawLinkDictionary = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type RawMetaDictionary = {
  current_page: number;
  from: number | null;
  last_page: number;
  path: string;
  per_page: number;
  to: number | null;
  total: number;
};

export type LinkDictionary = RawLinkDictionary;

export type MetaDictionary = Omit<
  RawMetaDictionary,
  'current_page' | 'last_page' | 'per_page'
> & {
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export abstract class BaseFreeSVG {}
