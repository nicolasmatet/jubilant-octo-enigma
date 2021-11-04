import {Type} from "@angular/core";
import {Subject} from "rxjs";
import {DataframeModel} from "./dataframe.model";
import {ExporterSelection} from "../export/model/exporterSelection.model";
import {EditorTextComponent} from "../report-content/editors/editor-text/editor-text.component";
import {TextRendrerComponent} from "../report-content/renderers/text-rendrer/text-rendrer.component";
import {EditorVariableComponent} from "../report-content/editors/editor-variable/editor-variable.component";
import {VariableRendererComponent} from "../report-content/renderers/variable-renderer/variable-renderer.component";
import {VariableValueGetterModel} from "../report-content/variableValueGetter.model";

export enum ReportContentType {
  text = 'text',
  variable = 'variable'
}


export interface ReportContentDef {
  valueGetter?: ReportContentValueGetter<{ data: DataframeModel, selection: ExporterSelection }>;
  editor: Type<ReportContentEditorComponent>;
  renderer: Type<ReportContentRendererComponent>;
}

export const ReportContentSettings: { [t: string]: ReportContentDef } = {
  text: {
    editor: EditorTextComponent,
    renderer: TextRendrerComponent,
  },
  variable: {
    valueGetter: new VariableValueGetterModel(),
    editor: EditorVariableComponent,
    renderer: VariableRendererComponent,
  }
};

export interface ReportPartContent<T> {
  type: ReportContentType;
  value: T;
}

export interface ReportContentValueGetter<T> {
  transform: (value: any, context: T) => any;
}

export interface ReportContentEditorComponent {
  value: any;
  selected: Subject<boolean>;
  deleted?: Subject<boolean>;
  caret: number[];
}

export interface RendererParams {
  value: any;
  dataSource: DataframeModel;
  selection: ExporterSelection;
  content: ReportPartContent<any>;
}

export interface ReportContentRendererComponent {
  init: (params: RendererParams) => void;
}

