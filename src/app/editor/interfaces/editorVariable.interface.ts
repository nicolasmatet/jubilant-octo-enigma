import {ReportTag} from "../../models/reportTag.model";

export interface EditorVariableInterface {
  tag: ReportTag | null;
  varName: ReportTag | null;
}

export interface EditorTextInterface {
  text: string;
}
