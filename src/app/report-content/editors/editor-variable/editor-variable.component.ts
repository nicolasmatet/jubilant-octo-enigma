import {Component, Input, OnInit, Output} from '@angular/core';
import {SummaryPart} from "../../../report-summary/models/summaryPart.interface";
import {ReportPartFactory} from "../../../models/reportPartFactory.model";
import {ReportContentEditorComponent} from "../../../models/reportPartContent";
import {Subject} from "rxjs";
import {TagService} from "../../../services/tag.service";
import {ReportTag} from "../../../models/reportTag.model";
import {EditorVariableInterface} from "../../../editor/interfaces/editorVariable.interface";

@Component({
  selector: 'app-editor-variable',
  templateUrl: './editor-variable.component.html',
  styleUrls: ['./editor-variable.component.scss']
})
export class EditorVariableComponent implements OnInit, ReportContentEditorComponent {
  @Input() value!: EditorVariableInterface;
  selected!: Subject<boolean>;
  deleted!: Subject<boolean>;
  caret = [0, 0];
  allTags: ReportTag[] = [];
  allVars: ReportTag[] = [];
  showDelete = false;
  tagSelectionEnabled = false;

  constructor(private tagService: TagService) {
    this.allTags = this.tagService.getAllTags();
    this.allVars = this.tagService.getAllVars();
  }

  toogleTagSelection() {
    this.tagSelectionEnabled = !this.tagSelectionEnabled;
    this.value.tag = null;
  }

  ngOnInit(): void {
    this.tagSelectionEnabled = !!this.value.tag;
  }

  delete() {
    this.deleted.next(true);
  }

  showDeleteButton() {
    this.showDelete = true;
  }

  hideDeleteButton() {
    this.showDelete = false;
  }
}
