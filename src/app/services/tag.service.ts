import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {ReportTag, StringTagModel, StringVarModel, TagGraph, TagTree} from "../models/reportTag.model";

@Pipe({
  name: 'tagIdPipe'
})
export class TagIdPipe implements PipeTransform {
  transform(tag: ReportTag): any {
    return tag.getId();
  }
}

@Pipe({
  name: 'tagTitlePipe'
})
export class TagTitlePipe implements PipeTransform {
  transform(tag: ReportTag): any {
    return tag.getTitle();
  }
}

@Pipe({
  name: 'tagTreeDirectChildren'
})
export class TagTreeDirectChildrenPipe implements PipeTransform {
  transform(tagTree: TagGraph, tag: ReportTag): any {
    console.log("TagTreeDirectChildrenPipe", tagTree, tag);
    const children = tagTree.getChildren(tag);
    console.log("TagTreeDirectChildrenPipe children", children);
    return children;

  }
}

@Pipe({
  name: 'tagTreeDirectParents'
})
export class TagTreeDirectParentsPipe implements PipeTransform {
  transform(tagTree: TagGraph, tag: ReportTag): any {
    return tagTree.getParents(tag);
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

  private allTagIds = [
    'france',
    'allemagne',
    'espagne',
    'belgique',
    'italie',
    'luxembourg',
    'pays-bas',
    'suisse',
    'republique tcheque',
    'slovaquie',
    'danemark',
    'suede',
    'BU1',
    'BU2',
    'BU3',
    'france - BU1',
    'france - BU2',
    'allemagne - BU1',
    'allemagne - BU2'
  ];

  private allTagsRelations = [
    {parent: 'france', child: 'france - BU1'},
    {parent: 'france', child: 'france - BU2'},
    {parent: 'allemagne', child: 'allemagne - BU1'},
    {parent: 'allemagne', child: 'allemagne - BU2'}
  ];

  allTags: ReportTag[];
  allVariables: ReportTag[];
  private allVariablesIds = [
    'Revenue Related Parties',
    'Revenue Unrelated Parties',
    'Revenue Total',
    'Profit Before Tax',
    'Income Tax Due',
    'Income Tax Accrued',
    'Tangible Assets',
    'Accumulated earnings',
    'Number of Employees'
  ];

  tagTree: TagGraph;

  private tagMap: Map<any, ReportTag> = new Map<any, ReportTag>();

  constructor() {
    this.allTags = this.allTagIds.map(t => new StringTagModel(t));
    this.allTags.forEach(t => this.tagMap.set(t.getId(), t));
    this.allVariables = this.allVariablesIds.map(t => new StringVarModel(t));

    this.tagTree = new TagTree();
    this.tagTree.addTags(...this.allTags);
    this.allTagsRelations.forEach(({parent, child}) => {
      const parentTag = this.tagMap.get(parent);
      const childTag = this.tagMap.get(child);
      if (parentTag && childTag) {
        this.tagTree.addRelation(parentTag, childTag);
      }
    });

    this._subjectAllTags.next(this.allTags);

    this._subjectAllVars.next(this.allVariables);
  }

  load(tagId: any) {
    return this.allTags.find(t => t.getId() === tagId);
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

  createTag(tagId: any): ReportTag {
    return new StringTagModel(tagId);
  }

  tagFromParents(parents: ReportTag[]) {
    return new StringTagModel(parents.map(p => p.getId()).join(' - '));
  }
}
