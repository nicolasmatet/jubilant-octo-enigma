import {ReportComponent, ReportPart} from "./reportPart.model";
import {Type} from "@angular/core";
import {ReportParagraphComponent} from "../render/report-paragraph/report-paragraph.component";

export class Paragraph extends ReportPart implements ReportPart {
  partType = 'paragraph';
  component: Type<ReportComponent> = ReportParagraphComponent;
  icon = 'segment'
}
