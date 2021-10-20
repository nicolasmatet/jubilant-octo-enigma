import {ExportModel} from "./export.model";
import {ReportComponent, ReportPart} from "../../models/reportPart.model";
import {ReportTag} from "../../models/reportTag.model";
import {ComponentFactoryResolver, ElementRef} from "@angular/core";
import {PartHostDirective} from "../../directives/part-host.directive";

export class ExporterSelection {
  selected = false;
  exported = false;
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

export class ReportExport implements ExportModel {

  reportPart: ReportPart;

  constructor(reportPart: ReportPart) {
    this.reportPart = reportPart;
  }

  export(tags: ReportTag[]) {
    const exporterSelection = ExporterSelection.recursivlyFromReportPart(this.reportPart);
    this.markSelected(exporterSelection, tags);
    this.markExported(exporterSelection);
  }

  markSelected(exporterSelection: ExporterSelection, tags: ReportTag[]) {
    tags.forEach(tag => {
      if (!exporterSelection.selected) {
        if (exporterSelection.reportPart.noTag() || exporterSelection.reportPart.hasTag(tag)) {
          exporterSelection.selected = true;
        }
        exporterSelection.children.forEach(c => {
          this.markSelected(c, tags);
        });
      }
    });
  }

  markExported(exporterSelection: ExporterSelection) {
    if (exporterSelection.selected) {
      exporterSelection.exported = true;
      this.markChildrenForExport(exporterSelection);
      this.markParentsForExport(exporterSelection);
    }
  }

  markParentsForExport(exporterSelection: ExporterSelection) {
    const parent = exporterSelection.parent;
    if (parent) {
      parent.exported = true;
      this.markParentsForExport(parent);
    }
  }


  markChildrenForExport(exporterSelection: ExporterSelection) {
    exporterSelection.children.forEach(c => {
      c.exported = true;
      this.markChildrenForExport(c);
    });
  }



}
