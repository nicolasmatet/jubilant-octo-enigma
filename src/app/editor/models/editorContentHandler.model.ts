import {PartHostDirective} from "../../directives/part-host.directive";
import {ComponentRef, Type} from "@angular/core";
import {ReportContentEditorComponent, ReportPartContent} from "../../models/reportPartContent";
import {Subject} from "rxjs";
import {VariableRendererComponent} from "../../report-content/renderers/variable-renderer/variable-renderer.component";
import {EditorVariableComponent} from "../../report-content/editors/editor-variable/editor-variable.component";
import {EditorTextInterface, EditorVariableInterface} from "../interfaces/editorVariable.interface";
import {ReportTag} from "../../models/reportTag.model";
import {VariableValueGetterModel} from "../../report-content/variableValueGetter.model";
import {EditorTextComponent} from "../../report-content/editors/editor-text/editor-text.component";
import {TextRendrerComponent} from "../../report-content/renderers/text-rendrer/text-rendrer.component";

export class EditorContentHandlerModel {
  currentComponentRef: ComponentRef<ReportContentEditorComponent> | null = null;
  content: ReportPartContent<any>[];

  constructor(content: ReportPartContent<any>[]) {
    this.content = content;
  }

  createComponent(host: PartHostDirective,
                  componentType: Type<ReportContentEditorComponent>,
                  value: any, index?: number): ComponentRef<ReportContentEditorComponent> {
    const componentRef = host.createComponent(componentType, index);
    componentRef.instance.value = value;
    this.subscribeToSelectionEvent(componentRef);
    this.subscribeToDelteEvent(componentRef, host);

    return componentRef;
  }

  private subscribeToDelteEvent(componentRef: ComponentRef<ReportContentEditorComponent>, host: PartHostDirective) {
    componentRef.instance.deleted = new Subject<boolean>();
    componentRef.instance.deleted.subscribe(deleted => {
      if (deleted) {
        this.deleteComponent(host, componentRef, this.content);
      }
    });
  }

  private subscribeToSelectionEvent(componentRef: ComponentRef<ReportContentEditorComponent>) {
    componentRef.instance.selected = new Subject<boolean>();
    componentRef.instance.selected.subscribe((isSelected) => {
      if (isSelected) {
        this.currentComponentRef = componentRef;
      }
    });
  }

  deleteComponent(host: PartHostDirective, componentRef: ComponentRef<ReportContentEditorComponent>, content: ReportPartContent<any>[]) {
    const idx = this.getIndex(host, componentRef);
    host.delete(idx);
    content.splice(idx, 1);

  }

  getIndex(host: PartHostDirective, componentRef: ComponentRef<ReportContentEditorComponent>) {
    return host.viewContainerRef.indexOf(componentRef.hostView);
  }

  splitComponent(host: PartHostDirective,
                 componentRef: ComponentRef<ReportContentEditorComponent>,
                 content: ReportPartContent<EditorTextInterface>[]): ComponentRef<ReportContentEditorComponent>[] {
    const idx = this.getIndex(host, componentRef);
    console.log("splitComponent idx", idx);
    const value = componentRef.instance.value;
    const caret = componentRef.instance.caret[1];
    if (caret === value.length) {
      return [componentRef];
    }
    const valueBefore = {text: value.text.slice(0, caret - 1)};
    const valueAfter = {text: value.text.slice(caret - 1, value.length)};

    host.viewContainerRef.remove(idx);

    const ref1 = this.createComponent(host, componentRef.componentType, valueBefore, idx);
    const ref2 = this.createComponent(host, componentRef.componentType, valueAfter, idx + 1);
    const previousContent = content[idx];
    content.splice(idx, 2,
      {editor: previousContent.editor, renderer: previousContent.renderer, value: valueBefore},
      {editor: previousContent.editor, renderer: previousContent.renderer, value: valueAfter});
    return [ref1, ref2];
  }

  createVariable(host: PartHostDirective, componentRef: ComponentRef<ReportContentEditorComponent>) {
    const refs = this.splitComponent(host, componentRef, this.content);
    const idx = this.getIndex(host, refs[0]);
    const editor = EditorVariableComponent;
    const value: EditorVariableInterface = {tag: null, varName: null};
    this.createComponent(host, editor, value, idx + 1);
    this.content.splice(idx + 1, 0, this.getVariable(value));
  }

  getVariable(value: EditorVariableInterface): ReportPartContent<EditorVariableInterface> {
    return {
      editor: EditorVariableComponent,
      renderer: VariableRendererComponent,
      valueGetter: new VariableValueGetterModel(),
      value: value
    };
  }
}
