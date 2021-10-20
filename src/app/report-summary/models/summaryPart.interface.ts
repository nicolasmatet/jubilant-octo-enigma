import {ReportPart} from "../../models/reportPart.model";
import * as uuid from 'uuid';

export class SummaryPart {
  expended: boolean;
  selected: boolean = false;
  reportPart: ReportPart;
  children: SummaryPart[];
  parent: SummaryPart | null = null;
  uId: string;

  constructor(reportPart: ReportPart, options: any) {
    this.reportPart = reportPart;
    this.uId = uuid.v4();
    this.expended = options.expended;
    this.children = this.reportPart.getChildren().map(c => {
      const newPart = new SummaryPart(c, options);
      newPart.parent = this;
      return newPart;
    });
  }

  deleteChild(summaryPart: SummaryPart) {
    const idx = this.children.findIndex(c => c.uId === summaryPart.uId);
    if (idx >= 0) {
      this.children.splice(idx, 1);
    }
  }

  addChildren(...reportParts: ReportPart[]) {
    reportParts.forEach(reportPart =>
      this.children.push(new SummaryPart(reportPart, {}))
    );
  }
}
