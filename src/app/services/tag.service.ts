import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {ReportTag, StringTagModel, StringVarModel} from "../models/reportTag.model";

@Pipe({
  name: 'tagTitlePipe'
})
export class TagTitlePipe implements PipeTransform {
  transform(tag: ReportTag): any {
    return tag.getTitle();
  }
}


@Injectable({
  providedIn: 'root'
})
export class TagService {

  private _subjectAllTags: BehaviorSubject<ReportTag[]> = new BehaviorSubject<ReportTag[]>([]);
  private _subjectAllVars: BehaviorSubject<ReportTag[]> = new BehaviorSubject<ReportTag[]>([]);

  public subjectAllTags = this._subjectAllTags.asObservable();
  public subjectAllVars = this._subjectAllVars.asObservable();

  constructor() {
    this._subjectAllTags.next(
      [
        new StringTagModel('france'),
        new StringTagModel('allemagne'),
        new StringTagModel('espagne'),
        new StringTagModel('belgique'),
        new StringTagModel('italie'),
        new StringTagModel('luxembourg'),
        new StringTagModel('pays-bas'),
        new StringTagModel('suisse'),
        new StringTagModel('republique tcheque'),
        new StringTagModel('slovaquie'),
        new StringTagModel('danemark'),
        new StringTagModel('suede')
      ]
    );

    this._subjectAllVars.next(
      [
        new StringVarModel('Revenue Related Parties'),
        new StringVarModel('Revenue Unrelated Parties'),
        new StringVarModel('Revenue Total'),
        new StringVarModel('Profit Before Tax'),
        new StringVarModel('Income Tax Due'),
        new StringVarModel('Income Tax Accrued'),
        new StringVarModel('Tangible Assets'),
        new StringVarModel('Accumulated earnings'),
        new StringVarModel('Number of Employees'),
      ]
    );
  }

  getAllTags(): ReportTag[] {
    return this._subjectAllTags.getValue();
  }

  getAllVars(): ReportTag[] {
    return this._subjectAllVars.getValue()
  }
}
