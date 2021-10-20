import {PartHostDirective} from "../../directives/part-host.directive";
import {ReportTag} from "../../models/reportTag.model";
import {ExporterSelection} from "./reportExport.model";

export abstract class ExportModel {

  abstract export(tags: ReportTag[]): ExporterSelection;
}
