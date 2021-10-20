import {PartHostDirective} from "../../directives/part-host.directive";
import {ReportTag} from "../../models/reportTag.model";
import {ExporterSelection} from "./exporterSelection.model";
import {ReportPart} from "../../models/reportPart.model";

export abstract class ExportModel {

  abstract getExporterSelection(reportPart:ReportPart, tags: ReportTag[]): ExporterSelection;
}
