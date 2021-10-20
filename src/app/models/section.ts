import {ReportComponent, ReportPart} from "./reportPart.model";
import {Type} from "@angular/core";
import {ReportSectionComponent} from "../report-section/report-section.component";

export class Section extends ReportPart {
  component: Type<ReportComponent> = ReportSectionComponent;
  isContainer = true;
}