import {Section} from "./section";
import {Paragraph} from "./paragraph.model";

export class ReportPartFactory {
  getNewSection(title: string) {
    return new Section(title);
  }

  getNewParagraph(title: string) {
    return new Paragraph(title);
  }
}
