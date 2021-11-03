import {ReportContentValueGetter} from "../models/reportPartContent";
import {DataframeModel} from "../models/dataframe.model";
import {ExporterSelection} from "../export/model/exporterSelection.model";
import {EditorVariableInterface} from "../editor/interfaces/editorVariable.interface";

export class VariableValueGetterModel implements ReportContentValueGetter<{ data: DataframeModel, selection: ExporterSelection }> {
  transform(value: EditorVariableInterface, context: { data: DataframeModel; selection: ExporterSelection }): any {
    const df = context.data;
    const tagFromSelection = context.selection.tag;
    const tag = value.tag ? value.tag : tagFromSelection;
    const varName = value.varName;
    if (tag === null) {
      return 'NOT FOUND';
    }
    if (varName !== null) {
      return df.loc(tag.getId(), varName.getId());
    }
    return tag.getTitle();
  }

}
