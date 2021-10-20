import {ExportModel} from "./export.model";
import {ReportPart} from "../../models/reportPart.model";
import {ReportTag} from "../../models/reportTag.model";
import {ExporterSelection} from "./exporterSelection.model";

export class ReportExport implements ExportModel {


  constructor() {
  }

  getExporterSelection(reportPart: ReportPart, tags: ReportTag[]): ExporterSelection {
    const exporterSelection = ExporterSelection.recursivlyFromReportPart(reportPart);
    this.markSelected(exporterSelection, tags);
    this.markExported(exporterSelection);
    return exporterSelection;
  }

  markSelected(exporterSelection: ExporterSelection, tags: ReportTag[]) {
    if (!tags || tags.length === 0) {
      exporterSelection.selected = true;
      this.propagateSelection(exporterSelection, tags);
    }
    tags.forEach(tag => {
      if (!exporterSelection.selected) {
        if (exporterSelection.reportPart.noTag() || exporterSelection.reportPart.hasTag(tag)) {
          exporterSelection.selected = true;
        }
        this.propagateSelection(exporterSelection, tags);
      }
    });
  }

  private propagateSelection(exporterSelection: ExporterSelection, tags: ReportTag[]) {
    exporterSelection.children.forEach(c => {
      this.markSelected(c, tags);
    });
  }

  markExported(exporterSelection: ExporterSelection) {
    if (exporterSelection.selected) {
      exporterSelection.exported = true;
      this.markParentsForExport(exporterSelection);
    }
    exporterSelection.children.forEach(c => {
      this.markExported(c);
    });
  }

  markParentsForExport(exporterSelection: ExporterSelection) {
    const parent = exporterSelection.parent;
    if (parent) {
      parent.exported = true;
      this.markParentsForExport(parent);
    }
  }



}
