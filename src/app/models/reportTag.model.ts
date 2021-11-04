import {ReportPart} from "./reportPart.model";

export abstract class ReportTag {
  data: any;

  constructor(data: unknown) {
    this.data = data;
  }

  abstract getTitle(): string

  abstract getId(): any


  toJSON() {
    return this.getId();
  }
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

  abstract getChildren(parentTag: ReportTag): ReportTag[];

  abstract getParents(parentTag: ReportTag): ReportTag[];

  abstract has(tag: ReportTag): boolean;

  abstract has(tagId: any): boolean;

  abstract rootTags(): ReportTag[];
  abstract leafTags(): ReportTag[];

}

export class TagTree implements TagGraph {
  getChildren(parentTag: ReportTag): ReportTag[] {
    const children = this.childrenOf(parentTag);
    if (!children) {
      return [];
    }
    // @ts-ignore
    return Array.from(children.entries())
      .filter(c => c[1] === 1)
      .map(c => this.tags.get(c[0]));
  }

  getParents(parentTag: ReportTag): ReportTag[] {
    const parents = this.childrenOf(parentTag);
    if (!parents) {
      return [];
    }
    return Array.from(parents.entries()).filter(c => c[1] === 1).map(c => c[0]);
  }


  private tags: Map<any, ReportTag> = new Map<any, ReportTag>();
  private _children: Map<any, Map<any, number>> = new Map<any, Map<any, number>>();
  private _parents: Map<any, Map<any, number>> = new Map<any, Map<any, number>>();

  rootTags() {
    return Array.from(this.tags.values()).filter(t => {
      const parents = this.parentsOf(t);
      return parents === undefined || parents.size === 0;
    });
  }

  leafTags() {
    return Array.from(this.tags.values()).filter(t => {
      const children = this.childrenOf(t);
      return children === undefined || children.size === 0;
    });
  }

  addTags(...tags: ReportTag[]) {
    tags.forEach(tag => {
      this.tags.set(tag.getId(), tag);
      this._children.set(tag.getId(), new Map());
      this._parents.set(tag.getId(), new Map());
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
    if (!this._children.has(node.getId())) {
      return undefined;
    }
    return this._children.get(node.getId());
  }

  parentsOf(node: ReportTag): Map<any, number> | undefined {
    if (!this._parents.has(node.getId())) {
      return undefined;
    }
    return this._parents.get(node.getId());
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


  has(tagId: any): boolean {
    return this.tags.has(tagId);
  }
}
