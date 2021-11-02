import {Component, Input, OnInit} from '@angular/core';
import {SummaryPart} from "../../report-summary/models/summaryPart.interface";
import {ReportPartFactory} from "../../models/reportPartFactory.model";
import {ReportContentComponent} from "../../models/reportPartContent";
import {Subject} from "rxjs";
import {TagService} from "../../services/tag.service";
import {ReportTag} from "../../models/reportTag.model";

@Component({
  selector: 'app-editor-variable',
  templateUrl: './editor-variable.component.html',
  styleUrls: ['./editor-variable.component.scss']
})
export class EditorVariableComponent implements OnInit, ReportContentComponent {
  @Input() value!: { tag: string, varName: string };
  selected!: Subject<boolean>;
  caret = [0, 0];
  allTags: ReportTag[] = [];
  allVars: ReportTag[] = [];

  constructor(private tagService: TagService) {
    this.allTags = this.tagService.getAllTags();
    this.allVars = this.tagService.getAllVars();

  }

  ngOnInit(): void {
  }


}
