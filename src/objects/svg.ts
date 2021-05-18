import {BaseFreeSVG} from './base-free-svg';

export type RawSVG = {
  id: number;
  thumb: string;
  svg: string;
  publish_datetime: string;
  status: string;
  created_at: string;
  created_by: string;
};

export class SVG extends BaseFreeSVG {
  id: number;
  thumb: string;
  svg: string;
  publishDatetime: string;
  status: string;
  createdAt: Date;
  createdBy: string;

  constructor(raw: RawSVG) {
    super();

    this.id = raw.id;
    this.thumb = raw.thumb;
    this.svg = raw.svg;
    this.publishDatetime = raw.publish_datetime;
    this.status = raw.status;
    this.createdAt = new Date(raw.created_at);
    this.createdBy = raw.created_by;
  }
}
