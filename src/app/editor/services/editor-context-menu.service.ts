import { ComponentRef,  Injectable} from '@angular/core';
import {ContextMenu} from "../../context-menu/models/context-menu.model";
import {EditorContextMenu} from "../models/editorContextMenu";
import {EditorContextMenuData} from "../interfaces/editor-context-menu-data.interface";
import {ReportContentEditorComponent} from "../../models/reportPartContent";

@Injectable({
  providedIn: 'root'
})
export class EditorContextMenuService {
  currentComponentRef: ComponentRef<ReportContentEditorComponent> | null = null;

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
