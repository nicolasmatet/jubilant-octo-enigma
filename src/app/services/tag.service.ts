import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {ReportTag, StringTagModel} from "../models/reportTag.model";

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
  public subjectAllTags = this._subjectAllTags.asObservable();

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
  }

  getAllTags(): ReportTag[] {
    return this._subjectAllTags.getValue();
  }
}
