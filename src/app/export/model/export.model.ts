import {ExporterSelection} from "./exporterSelection.model";
import {ReportPart} from "../../models/reportPart.model";
import {TagSelectionModel} from "./tagSelection.model";

export abstract class ExportModel {

  abstract getExporterSelection(reportPart: ReportPart, tagSelectionModel: TagSelectionModel): ExporterSelection;
}
