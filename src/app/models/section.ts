import {ReportComponent, ReportPart} from "./reportPart.model";
import {Type} from "@angular/core";
import {ReportSectionComponent} from "../render/report-section/report-section.component";

export class Section extends ReportPart {
  icon = 'topic'
  component: Type<ReportComponent> = ReportSectionComponent;
  isContainer = true;
}
