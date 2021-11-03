import {ReportPart} from "../../models/reportPart.model";
import {ReportTag} from "../../models/reportTag.model";

export class ExporterSelection {
  selected = false;
  exported = false;
  tag: ReportTag | null = null; // tag that explain why this part is exported;
  reportPart: ReportPart;
  parent: ExporterSelection | null = null;
  children: ExporterSelection[] = [];

  static recursivlyFromReportPart(reportPart: ReportPart) {
    const exporterSelection = new ExporterSelection(reportPart);
    exporterSelection.children = reportPart._children.map(c => {
      const es = ExporterSelection.recursivlyFromReportPart(c);
      es.parent = exporterSelection;
      return es;
    });
    return exporterSelection;
  }

  constructor(reportPart: ReportPart) {
    this.reportPart = reportPart;
  }
}
