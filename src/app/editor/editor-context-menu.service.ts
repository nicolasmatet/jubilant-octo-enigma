import {ComponentFactoryResolver, ComponentRef, ElementRef, Injectable, Renderer2, Type} from '@angular/core';
import {ContextMenu} from "../context-menu/models/context-menu.model";
import {SummaryPart} from "../report-summary/models/summaryPart.interface";
import {EditorContextMenu} from "./models/editorContextMenu";
import {ReportComponent} from "../models/reportPart.model";
import {EditorVariableComponent} from "./editor-variable/editor-variable.component";
import {PartHostDirective} from "../directives/part-host.directive";
import {EditorContextMenuData} from "./interfaces/editor-context-menu-data.interface";
import {ReportContentComponent} from "../models/reportPartContent";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditorContextMenuService {
  currentComponentRef: ComponentRef<ReportContentComponent> | null = null;

  getEditorContextMenu(): ContextMenu<EditorContextMenuData> {
    const newMenu = new EditorContextMenu();
    newMenu.menuItems = [
      {title: 'Insert Variable', icon: 'edit_note', callback: (editor) => this.onClickInsert(editor)},
    ];
    return newMenu;
  }

  constructor() {
  }


  onClickInsert(editor: EditorContextMenuData) {
    console.log("onClickInsert", editor);
    if (editor.contentHandler.currentComponentRef === null) {
      return;
    }
    editor.contentHandler.createVariable(
      editor.host,
      editor.contentHandler.currentComponentRef,
      editor.contentHandler.content);
  }


}
