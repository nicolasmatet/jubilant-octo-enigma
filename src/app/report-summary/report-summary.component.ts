import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReportPart} from "../models/reportPart.model";
import {SummaryPart} from "./models/summaryPart.interface";
import {CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatMenuTrigger} from "@angular/material/menu";
import {SummaryContextMenuService} from "./services/summary-context-menu.service";
import {ContextMenu} from "../context-menu/models/context-menu.model";
import {MultipleSelectionModel} from "./models/multipleSelection.model";
import {SelectionModel} from "../models/selection.model";
import {ExportComponent} from "../export/export.component";
import {ExportModel} from "../export/model/export.model";
import {MatDialog} from "@angular/material/dialog";
import {DragDropModel} from "./models/dragDrop.model";

@Component({
  selector: 'app-report-summary',
  templateUrl: './report-summary.component.html',
  styleUrls: ['./report-summary.component.scss']
})
export class ReportSummaryComponent implements OnInit {
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
