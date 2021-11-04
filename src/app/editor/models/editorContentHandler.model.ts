import {PartHostDirective} from "../../directives/part-host.directive";
import {ComponentRef, Type} from "@angular/core";
import {
  ReportContentEditorComponent,
  ReportContentSettings,
  ReportContentType,
  ReportPartContent
} from "../../models/reportPartContent";
import {Subject} from "rxjs";
import {EditorTextInterface, EditorVariableInterface} from "../interfaces/editorVariable.interface";

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
      {type: previousContent.type, value: valueBefore}, {type: previousContent.type, value: valueAfter});
    return [ref1, ref2];
  }

  createVariable(host: PartHostDirective, componentRef: ComponentRef<ReportContentEditorComponent>) {
    const refs = this.splitComponent(host, componentRef, this.content);
    const idx = this.getIndex(host, refs[0]);
    const editor = ReportContentSettings[ReportContentType.variable].editor;
    const value: EditorVariableInterface = {tag: null, varName: null};
    this.createComponent(host, editor, value, idx + 1);
    this.content.splice(idx + 1, 0, {type: ReportContentType.variable, value: value});
  }

}
