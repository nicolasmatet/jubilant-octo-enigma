import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReportPart} from "../models/reportPart.model";
import {SummaryPart} from "./models/summaryPart.interface";
import {CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatMenuTrigger} from "@angular/material/menu";
import {SummaryContextMenuService} from "./services/summary-context-menu.service";
import {ContextMenu} from "../models/context-menu.model";
import {MultipleSelectionModel} from "./models/multipleSelection.model";
import {SelectionModel} from "../models/selection.model";

@Component({
  selector: 'app-report-summary',
  templateUrl: './report-summary.component.html',
  styleUrls: ['./report-summary.component.scss']
})
export class ReportSummaryComponent implements OnInit, AfterViewInit {
  @Input() report!: ReportPart;

  summary!: SummaryPart;
  allDropListsIds!: string[];
  @ViewChild(MatMenuTrigger) contextMenuTrigger!: MatMenuTrigger;
  contextMenu!: ContextMenu<SummaryPart>;
  selectionModel: SelectionModel<SummaryPart> = new MultipleSelectionModel();

  constructor(private contextMenuService: SummaryContextMenuService) {
  }

  ngOnInit(): void {
    this.contextMenu = this.contextMenuService.getContextMenu(this.contextMenuTrigger);
    this.summary = new SummaryPart(this.report, {expended: true});
    this.allDropListsIds = this.getIdsRecursive(this.summary);
    console.log("this.allDropListsIds", this.allDropListsIds);
  }

  ngAfterViewInit() {
    this.contextMenu = this.contextMenuService.getContextMenu(this.contextMenuTrigger);
  }

  toogleExpended(summaryPart: SummaryPart) {
    summaryPart.expended = !summaryPart.expended;
  }

  select(event: MouseEvent, summaryPart: SummaryPart) {
    if (event.ctrlKey) {
      this.selectionModel.select(summaryPart);
    } else {
      this.selectionModel.clear();
      this.selectionModel.select(summaryPart);
    }
  }

  export() {
    this.exportService.export(report);
  }

  drop(event: CdkDragDrop<SummaryPart, any>) {
    console.log("dropped", event);
    if (this.canBeDropped(event)) {
      const movingItem: SummaryPart = event.item.data;
      event.container.data.children.push(movingItem);
      event.previousContainer.data.children = event.previousContainer.data.children
        .filter((child: SummaryPart) => child.uId !== movingItem.uId);
    } else {
      moveItemInArray(
        event.container.data.children,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  private getIdsRecursive(item: SummaryPart): string[] {
    let ids = [item.uId];
    item.children.forEach((childItem) => {
      ids = ids.concat(this.getIdsRecursive(childItem));
    });
    return ids;
  }

  private canBeDropped(event: CdkDragDrop<SummaryPart, SummaryPart>): boolean {
    const movingItem: SummaryPart = event.item.data;
    return event.previousContainer.id !== event.container.id
      && this.isNotSelfDrop(event)
      && !this.hasChild(movingItem, event.container.data);
  }


  private isNotSelfDrop(event: CdkDragDrop<SummaryPart> | CdkDragEnter<SummaryPart> | CdkDragExit<SummaryPart>): boolean {
    return event.container.data.uId !== event.item.data.uId;
  }

  private hasChild(parentItem: SummaryPart, childItem: SummaryPart): boolean {
    const hasChild = parentItem.children.some((item) => item.uId === childItem.uId);
    return hasChild ? true : parentItem.children.some((item) => this.hasChild(item, childItem));
  }

}