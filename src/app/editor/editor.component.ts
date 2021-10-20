import {Component, OnInit} from '@angular/core';
import {EditorService} from "./editor.service";
import {FormControl} from "@angular/forms";
import {ReportPart} from "../models/reportPart.model";
import {ReportTag} from "../models/reportTag.model";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  editing: ReportPart[] = [];
  selected = new FormControl(0);

  constructor(private editorService: EditorService) {

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
    this.editorService.closeTab(idx)
  }
}
