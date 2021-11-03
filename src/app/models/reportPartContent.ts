import {Type} from "@angular/core";
import {Subject} from "rxjs";
import {DataframeModel} from "./dataframe.model";
import {ExporterSelection} from "../export/model/exporterSelection.model";

export interface ReportPartContent<T> {
  valueGetter?: ReportContentValueGetter<{ data: DataframeModel, selection: ExporterSelection }>;
  editor: Type<ReportContentEditorComponent>;
  renderer: Type<ReportContentRendererComponent>;
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

