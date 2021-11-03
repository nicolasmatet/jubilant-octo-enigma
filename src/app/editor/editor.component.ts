import {Component, ElementRef, OnInit} from '@angular/core';
import {EditorService} from "./services/editor.service";
import {FormControl} from "@angular/forms";
import {ReportPart} from "../models/reportPart.model";
import {ContextMenu} from "../context-menu/models/context-menu.model";
import {EditorContextMenuService} from "./services/editor-context-menu.service";
import {PartHostDirective} from "../directives/part-host.directive";
import {EditorContextMenuData} from "./interfaces/editor-context-menu-data.interface";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  editing: ReportPart[] = [];
  selected = new FormControl(0);

  contextMenu: ContextMenu<EditorContextMenuData>;

  constructor(private editorService: EditorService, private editorContextMenuService: EditorContextMenuService) {
    this.contextMenu = editorContextMenuService.getEditorContextMenu();
  }

  ngOnInit(): void {
    this.editorService.subjectReportPartEditing.subscribe(reportParts => {
      this.editing = reportParts;
      if (this.editing.length) {
        this.selected.setValue(this.editing.length - 1);
      }
    });
    this.editorService.subjectReportPartFocus.subscribe(reportPart => {
      const idx = this.editing.findIndex(p => p.uId === reportPart.uId);
      if (idx >= 0) {
        this.selected.setValue(idx);
      }
    });
  }

  closeTab(idx: number) {
    this.editorService.closeTab(idx);
  }
}
