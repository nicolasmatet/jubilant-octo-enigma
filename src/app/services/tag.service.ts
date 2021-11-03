import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {ReportTag, StringTagModel, StringVarModel, TagGraph, TagTree} from "../models/reportTag.model";

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

  private countryTags = [
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
  ];

  private buTags = [
    new StringTagModel('BU1'),
    new StringTagModel('BU2'),
    new StringTagModel('BU3'),
  ];

  private parentsTags = [
    [this.countryTags[0], this.buTags[0]],
    [this.countryTags[0], this.buTags[1]],
    [this.countryTags[0], this.buTags[2]],
    [this.countryTags[1], this.buTags[0]],
    [this.countryTags[1], this.buTags[1]],
    [this.countryTags[1], this.buTags[2]],
  ];

  private childrenTags = this.parentsTags.map(parents => this.tagFromParents(parents));

  allTags: ReportTag[];
  tagTree: TagGraph;
  allVariables = [
    new StringVarModel('Revenue Related Parties'),
    new StringVarModel('Revenue Unrelated Parties'),
    new StringVarModel('Revenue Total'),
    new StringVarModel('Profit Before Tax'),
    new StringVarModel('Income Tax Due'),
    new StringVarModel('Income Tax Accrued'),
    new StringVarModel('Tangible Assets'),
    new StringVarModel('Accumulated earnings'),
    new StringVarModel('Number of Employees'),
  ];


  constructor() {
    this.allTags = [...this.countryTags, ...this.buTags, ...this.childrenTags];
    this.tagTree = new TagTree();
    this.tagTree.addTags(...this.allTags);
    this.childrenTags.forEach((c, idx) => {
      const parents = this.parentsTags[idx];
      parents.forEach(p => {
        this.tagTree.addRelation(p, c);
      });
    });

    this._subjectAllTags.next(this.allTags);

    this._subjectAllVars.next(this.allVariables);
  }


  getAllTags(): ReportTag[] {
    return this._subjectAllTags.getValue();
  }

  getAllVars(): ReportTag[] {
    return this._subjectAllVars.getValue();
  }

  getTagTree(): TagGraph {
    return this.tagTree;
  }

  tagFromParents(parents: ReportTag[]) {
    return new StringTagModel(parents.map(p => p.getId()).join(' - '));
  }
}
