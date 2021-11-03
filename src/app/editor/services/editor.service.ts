import {Injectable} from '@angular/core';
import {ReportPart} from "../../models/reportPart.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private _reportPartEditing: ReportPart[] = [];
  subjectReportPartEditing = new Subject<ReportPart[]>();
  subjectReportPartFocus = new Subject<ReportPart>();

  constructor() {
  }

  registerForEdition(reportPart: ReportPart) {
    const idx = this._reportPartEditing.findIndex(r => r.uId === reportPart.uId);
    if (idx >= 0) {
      this.subjectReportPartFocus.next(reportPart);
    } else {
      this._reportPartEditing.push(reportPart);
      this.subjectReportPartEditing.next(this._reportPartEditing);
    }
  }

  closeTab(idx: number) {
    this._reportPartEditing.splice(idx, 1);
    this.subjectReportPartEditing.next(this._reportPartEditing);
  }
}
