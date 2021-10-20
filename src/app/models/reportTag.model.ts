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
