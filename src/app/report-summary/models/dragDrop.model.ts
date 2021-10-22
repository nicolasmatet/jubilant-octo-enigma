import {CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray} from "@angular/cdk/drag-drop";
import {SummaryPart} from "./summaryPart.interface";
import {ReportPart} from "../../models/reportPart.model";

export class DragDropModel {

  drop(event: CdkDragDrop<SummaryPart, any>) {
    console.log("dropped", event);
    if (this.canBeDropped(event)) {

      const movingItem: SummaryPart = event.item.data;
      const newParent = event.container.data;
      SummaryPart.moveChildren(newParent, movingItem);
      ReportPart.moveChildren(newParent.reportPart, movingItem.reportPart);
    } else {
      moveItemInArray(
        event.container.data.children,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  allDropListsParentIds(item: SummaryPart): string[] {
    return this.getIdsRecursive(item);
  }

  assignDropListIds(item: SummaryPart, allParentDropLists: string[]) {
    item.parentDropList = item.uId;
    item.childDropList = this.childId(item.parentDropList);
    item.connectedDropList = this.connectedDropLists(item, allParentDropLists);
    console.log("item.connectedDropList", item.connectedDropList);
    item.children.forEach(c => {
      this.assignDropListIds(c, allParentDropLists);
    });
  }

  connectedDropLists(item: SummaryPart, allDropListParentIds: string[]) {
    return [this.childId(item.uId), ...allDropListParentIds];
  }

  private childId(parentId: string): string {
    return parentId + '_c';
  }

  private getIdsRecursive(item: SummaryPart): string[] {
    let ids = [item.uId];
    item.children
      .filter(item => item.reportPart.isContainer)
      .forEach((childItem) => {
        ids = ids.concat(this.getIdsRecursive(childItem));
      });
    return ids;
  }

  private canBeDropped(event: CdkDragDrop<SummaryPart, SummaryPart>): boolean {
    const movingItem: SummaryPart = event.item.data;
    return event.previousContainer.id !== event.container.id
      && !this.hasChild(event.container.data, movingItem)
      && this.isNotSelfDrop(event)
      && !this.hasChildRecursive(movingItem, event.container.data);
  }


  private isNotSelfDrop(event: CdkDragDrop<SummaryPart> | CdkDragEnter<SummaryPart> | CdkDragExit<SummaryPart>): boolean {
    return event.container.data.uId !== event.item.data.uId;
  }

  private hasChildRecursive(parentItem: SummaryPart, childItem: SummaryPart): boolean {
    return this.hasChild(parentItem, childItem) ? true
      : parentItem.children.some((item) => this.hasChildRecursive(item, childItem));
  }

  private hasChild(parentItem: SummaryPart, childItem: SummaryPart) {
    return parentItem.children.some((item) => item.uId === childItem.uId);
  }
}
