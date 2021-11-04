import {ReportTag, TagGraph} from "../../models/reportTag.model";

export abstract class TagSelectionModel {
  abstract isEmpty(): boolean;

  abstract selectedTags(): ReportTag[];

  abstract isMatched(selectorTag: ReportTag, candidateTags: ReportTag[]): boolean;

  abstract match(selectorTag: ReportTag, candidateTags: ReportTag[]): ReportTag | null;

}

export class IdentityTagSelectionModel implements TagSelectionModel {

  private _selectedTags: ReportTag[];

  constructor(selectedTags: ReportTag[]) {
    this._selectedTags = selectedTags;
  }

  selectedTags(): ReportTag[] {
    return this._selectedTags;
  }

  isEmpty(): boolean {
    return !this._selectedTags || this._selectedTags.length === 0;
  }

  isMatched(selectorTag: ReportTag, candidateTags: ReportTag[]): boolean {
    const selectorId = selectorTag.getId();
    const idx = candidateTags.findIndex(t => t.getId() === selectorId);
    return idx >= 0;
  }

  match(selectorTag: ReportTag, candidateTags: ReportTag[]): ReportTag | null {
    const selectorId = selectorTag.getId();
    const res = candidateTags.find(t => t.getId() === selectorId);
    return res ? res : null;
  }

}


export class HierarchicalTagSelectionModel implements TagSelectionModel {

  private _selectedTags: ReportTag[];
  private tagTree !: TagGraph;

  constructor(selectedTags: ReportTag[]) {
    this._selectedTags = selectedTags;
  }

  setTagTree(tagTree: TagGraph) {
    this.tagTree = tagTree;
  }

  selectedTags(): ReportTag[] {
    return this._selectedTags;
  }

  isEmpty(): boolean {
    return !this._selectedTags || this._selectedTags.length === 0;
  }

  isMatched(selectorTag: ReportTag, candidateTags: ReportTag[]): boolean {
    return candidateTags.some(tag => this._match(selectorTag, tag));
  }

  match(selectorTag: ReportTag, candidateTags: ReportTag[]): ReportTag | null {
    const res = candidateTags.find(tag => this._match(selectorTag, tag));
    return res ? res : null;
  }

  private _match(selectorTag: ReportTag, otherTag: ReportTag) {
    return selectorTag.getId() === otherTag.getId() || this.tagTree.hasParent(otherTag, selectorTag);
  }
}
