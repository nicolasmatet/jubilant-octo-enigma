import {Type} from "@angular/core";
import {Subject} from "rxjs";

export interface ReportPartContent {
  component: Type<ReportContentComponent>;
  value: any;
}

export interface ReportContentComponent {
  value: any;
  selected: Subject<boolean>;
  caret: number[];
}
