import {EditableReportPart, ReportComponent, ReportPart} from "./reportPart.model";
import {Type} from "@angular/core";
import {ReportParagraphComponent} from "../report-paragraph/report-paragraph.component";

export class Paragraph extends ReportPart implements EditableReportPart {
  component: Type<ReportComponent> = ReportParagraphComponent;
  icon = 'segment'
}
