import {ReportTag} from "./reportTag.model";
import {Input, Type} from "@angular/core";
import * as uuid from 'uuid';
import {ExporterSelection} from "../export/model/exporterSelection.model";
import {ReportPartContent} from "./reportPartContent";
import {DataframeModel} from "./dataframe.model";

export interface ReportComponent {
  selection: ExporterSelection;
  finData: DataframeModel;
}

export interface SerializedReportPart {
  type: string;
  title: string;
  tags: any[];
  content: ReportPartContent<any>[];
  children: SerializedReportPart[]
}

export abstract class ReportPart {
  set children(children: ReportPart[]) {
    this._children = [];
    this.addChildren(...children);
  }

  get children() {
    return this._children;
  }

  partType: string = '';
  component!: Type<ReportComponent>;
  icon: string = '';
  content: ReportPartContent<any>[] = [];
  tags: ReportTag[] = [];
  uId: string = uuid.v4();
  title: string = "Untitled";
  parent: ReportPart | null = null;
  _children: ReportPart[] = [];
  isContainer = false;

  constructor(title: string) {
    this.title = title;
    this.uId = uuid.v4();
  }

  addChildren(...children: ReportPart[]) {
    children.forEach((c) => {
      this._children.push(c);
      c.parent = this;
    });
  }

  static moveChildren(target: ReportPart, child: ReportPart) {
    const previousParent = child.parent;
    target.addChildren(child);
    if (previousParent) {
      console.log("previous children", [...previousParent.children]);
      previousParent.children = previousParent.children.filter((c: ReportPart) => c.uId !== child.uId);
      console.log("new children", [...previousParent.children]);
    }
  }

  deleteChild(child: ReportPart) {
    const idx = this._children.findIndex(c => c.uId === child.uId);
    console.log("deleting child ", idx);
    if (idx >= 0) {
      this._children.splice(idx, 1);
    }
  }

  noTag(): boolean {
    return this.tags.length === 0;
  }

  hasTag(tag: ReportTag) {
    const idx = this.tags.findIndex(t => t.getId() === tag.getId());
    return idx >= 0;
  }

  addTag(tag: ReportTag) {
    if (!this.hasTag(tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag: ReportTag) {
    if (this.hasTag(tag)) {
      const idx = this.tags.findIndex(t => t.getId() === tag.getId());
      if (idx >= 0) {
        this.tags.splice(idx, 1);
      }
    }
  }

  serialize(): SerializedReportPart {
    const current: any = {};
    current['type'] = this.partType;
    current['title'] = this.title;
    current['tags'] = this.tags;
    current['content'] = this.content;
    current['children'] = this._children.map(c => c.serialize());
    return current;
  }
}

export class ReportRoot extends ReportPart {
  partType = 'root';

  constructor() {
    super('');
  }

}
