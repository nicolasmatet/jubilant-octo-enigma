import {ExportModel} from "./export.model";
import {ReportPart} from "../../models/reportPart.model";
import {ReportTag} from "../../models/reportTag.model";
import {ExporterSelection} from "./exporterSelection.model";
import {TagSelectionModel} from "./tagSelection.model";

export class ReportExport implements ExportModel {


  constructor() {
  }

  getExporterSelection(reportPart: ReportPart, tagSelectionModel: TagSelectionModel): ExporterSelection {
    const exporterSelection = ExporterSelection.recursivlyFromReportPart(reportPart);
    this.markSelected(exporterSelection, tagSelectionModel);
    this.markExported(exporterSelection);
    return exporterSelection;
  }

  markSelected(exporterSelection: ExporterSelection, tagSelectionModel: TagSelectionModel) {
    if (tagSelectionModel.isEmpty()) {
      exporterSelection.selected = true;
      this.propagateSelection(exporterSelection, tagSelectionModel);
    }
    tagSelectionModel.selectedTags().forEach(selectorTag => {
      if (!exporterSelection.selected) {
        if (exporterSelection.reportPart.noTag() ||
          tagSelectionModel.isMatched(selectorTag, exporterSelection.reportPart.tags)) {
          exporterSelection.selected = true;
          exporterSelection.tag = selectorTag;
        }
        this.propagateSelection(exporterSelection, tagSelectionModel);
      }
    });
  }

  private propagateSelection(exporterSelection: ExporterSelection, tagSelectionModel: TagSelectionModel) {
    exporterSelection.children.forEach(c => {
      this.markSelected(c, tagSelectionModel);
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
      if (parent.tag === null) {
        parent.tag = exporterSelection.tag;
      }
      this.markParentsForExport(parent);
    }
  }


}
