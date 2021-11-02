import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReportPart} from "../models/reportPart.model";
import {SummaryPart} from "./models/summaryPart.interface";
import {ContextMenu} from "../context-menu/models/context-menu.model";
import {SelectionModel} from "../models/selection.model";
import {DragDropModel} from "./models/dragDrop.model";

@Component({
  selector: 'app-report-summary',
  templateUrl: './report-summary.component.html',
  styleUrls: ['./report-summary.component.scss']
})
export class ReportSummaryComponent implements OnInit, AfterViewInit {
  @Input() report!: ReportPart;
  @Input() contextMenu!: ContextMenu<SummaryPart>;
  @Input() selectionModel!: SelectionModel<SummaryPart>;
  dragDropModel: DragDropModel;
  summary!: SummaryPart;
  allDropListsParentIds!: string[];

  constructor() {
    this.dragDropModel = new DragDropModel();
  }

  ngOnInit(): void {
    this.selectionModel.clear();
    this.summary = new SummaryPart(this.report, {expended: true});
    this.allDropListsParentIds = this.dragDropModel.allDropListsParentIds(this.summary);
    console.log("this.summary", this.summary);
    this.dragDropModel.assignDropListIds(this.summary, this.allDropListsParentIds);
    console.log("this.summary", this.summary);
  }


  ngAfterViewInit(): void {
    this.contextMenu.menuItems[0].callback(this.summary.children[0]);
  }


  toogleExpended(summaryPart: SummaryPart) {
    summaryPart.expended = !summaryPart.expended;
  }

  select(event: MouseEvent, summaryPart: SummaryPart) {
    if (event.ctrlKey) {
      this.selectionModel.select(summaryPart);
    } else {
      if (this.selectionModel.isSelected(summaryPart)) {
        this.selectionModel.clear();
      } else {
        this.selectionModel.clear();
        this.selectionModel.select(summaryPart);
      }
    }
  }

  getConnected(dropList: string[], summary: SummaryPart) {
    return [...dropList, summary.uId + '_children'];
  }


}
