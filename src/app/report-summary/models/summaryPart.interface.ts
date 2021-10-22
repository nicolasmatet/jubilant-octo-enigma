import {ReportPart} from "../../models/reportPart.model";
import * as uuid from 'uuid';

export class SummaryPart {
  expended: boolean;
  selected: boolean = false;
  reportPart: ReportPart;
  children: SummaryPart[];
  parent: SummaryPart | null = null;
  uId: string;

  parentDropList!: string;
  childDropList!: string;
  connectedDropList!: string[];

  static moveChildren(target: SummaryPart, child: SummaryPart) {
    const previousParent = child.parent;
    target.children.push(child);
    child.parent = target;
    if (previousParent) {
      previousParent.children = previousParent.children.filter((c: SummaryPart) => c.uId !== child.uId);
    }
  }

  constructor(reportPart: ReportPart, options: any) {
    this.reportPart = reportPart;
    this.uId = uuid.v4();
    this.expended = options.expended;
    this.children = this.reportPart.children.map(c => {
      const newPart = new SummaryPart(c, options);
      newPart.parent = this;
      return newPart;
    });
  }

  deleteChild(summaryPart: SummaryPart) {
    const idx = this.children.findIndex(c => c.uId === summaryPart.uId);
    console.log("deleting child ", idx);
    if (idx >= 0) {
      this.children.splice(idx, 1);
    }
  }

  addChildren(...reportParts: ReportPart[]) {
    reportParts.forEach(reportPart => {
      const newSummaryPart = new SummaryPart(reportPart, {});
      this.children.push(newSummaryPart);
      newSummaryPart.parent = this;
    });
  }


}
