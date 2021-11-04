import {ReportComponent, ReportPart, SerializedReportPart} from "./reportPart.model";
import {Type} from "@angular/core";
import {ReportSectionComponent} from "../render/report-section/report-section.component";

export class Section extends ReportPart {
  partType = 'section';
  icon = 'topic'
  component: Type<ReportComponent> = ReportSectionComponent;
  isContainer = true;

  serialize(): SerializedReportPart {
    return super.serialize();
  }
}
