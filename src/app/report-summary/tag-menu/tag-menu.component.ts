import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TagService} from "../../services/tag.service";
import {ReportTag} from "../../models/reportTag.model";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {ReportPart} from "../../models/reportPart.model";
import {SummaryPart} from "../models/summaryPart.interface";

@Component({
  selector: 'app-tag-menu',
  templateUrl: './tag-menu.component.html',
  styleUrls: ['./tag-menu.component.scss']
})
export class TagMenuComponent implements OnInit {

  @Input() set taggedItems(value: SummaryPart[] | null) {
    if (value === null) {
      value = [];
    }

    this._taggedItems = value.map(v => v.reportPart);
    this.updateCheckboxesStates(this.allTags);
  }

  @Output() change: EventEmitter<ReportTag[]> = new EventEmitter<ReportTag[]>();

  _taggedItems!: ReportPart[];
  allTags: ReportTag[] = [];

  indeterminate: boolean[] = [];
  selected: boolean[] = [];

  constructor(private tagService: TagService) {

    this.tagService.subjectAllTags.subscribe(allTags => {
      this.allTags = allTags;
      this.updateCheckboxesStates(allTags);
    });
  }

  private updateCheckboxesStates(allTags: ReportTag[]) {
    this.indeterminate = allTags.map(t => this._taggedItems?.some(v => v.hasTag(t)));
    this.selected = allTags.map(t => this._taggedItems?.every(v => v.hasTag(t)));
    console.log("this.indeterminate", this.indeterminate);
  }

  ngOnInit(): void {
  }

  onSelection(event: MatCheckboxChange, tag: ReportTag) {
    if (event.checked) {
      this._taggedItems.forEach(v => v.addTag(tag));
    } else {
      this._taggedItems.forEach(v => v.removeTag(tag));
    }
    this.change.emit(this.allTags.filter((tag, idx) => this.selected[idx]));
  }
}
