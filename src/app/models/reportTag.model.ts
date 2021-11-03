import {ReportPart} from "./reportPart.model";

export abstract class ReportTag {
  data: any;

  constructor(data: unknown) {
    this.data = data;
  }

  abstract getTitle(): string

  abstract getId(): any

}

export class StringTagModel extends ReportTag {
  constructor(title: string) {
    super(title);
  }

  getTitle(): string {
    return this.data;
  }

  getId(): string {
    return this.getTitle();
  }
}

export class StringVarModel extends ReportTag {
  constructor(title: string) {
    super(title);
  }

  getTitle(): string {
    return this.data;
  }

  getId(): string {
    return this.getTitle();
  }
}

export abstract class TagGraph {
  abstract addTags(...tags: ReportTag[]): void;

  abstract addRelation(parentTag: ReportTag, childTag: ReportTag): void;

  abstract hasParent(childTag: ReportTag, parentTag: ReportTag): boolean;

  abstract hasChild(parentTag: ReportTag, childTag: ReportTag): boolean;

}

export class TagTree implements TagGraph {

  private tags: Map<any, ReportTag> = new Map<any, ReportTag>();
  private children: Map<any, Map<any, number>> = new Map<any, Map<any, number>>();
  private parents: Map<any, Map<any, number>> = new Map<any, Map<any, number>>();

  addTags(...tags: ReportTag[]) {
    tags.forEach(tag => {
      this.tags.set(tag.getId(), tag);
      this.children.set(tag.getId(), new Map());
      this.parents.set(tag.getId(), new Map());
    });
  }

  addRelation(parentTag: ReportTag, childTag: ReportTag) {
    this.childrenOf(parentTag)?.set(childTag.getId(), 1);
    this.parentsOf(childTag)?.set(parentTag.getId(), 1);

    const greatChildren = this.childrenOf(childTag);
    if (greatChildren) {
      for (let greatChild of greatChildren.entries()) {
        const greatChildId = greatChild[0];
        const greatChildLevel = greatChild[1] + 1;
        this.childrenOf(parentTag)?.set(greatChildId, greatChildLevel);
      }
    }

    const greatParents = this.parentsOf(parentTag);
    if (greatParents) {
      for (let greatParent of greatParents.entries()) {
        const greatParentId = greatParent[0];
        const greatParentLevel = greatParent[1] + 1;
        this.parentsOf(childTag)?.set(greatParentId, greatParentLevel);
      }
    }
  }

  childrenOf(node: ReportTag): Map<any, number> | undefined {
    return this.children.get(node.getId());
  }

  parentsOf(node: ReportTag): Map<any, number> | undefined {
    return this.parents.get(node.getId());
  }

  hasChild(parentTag: ReportTag, childTag: ReportTag): boolean {
    const childrens = this.childrenOf(parentTag);
    if (!childrens) {
      return false;
    }
    return childrens.has(childTag.getId());
  }

  hasParent(childTag: ReportTag, parentTag: ReportTag): boolean {
    const parents = this.parentsOf(childTag);
    if (!parents) {
      return false;
    }
    return parents.has(parentTag.getId());
  }
}
