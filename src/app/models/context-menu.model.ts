import {MatMenuTrigger} from "@angular/material/menu";
import {ContextMenuItem} from "./context-menu-item";
import {SummaryPart} from "../report-summary/models/summaryPart.interface";

export abstract class ContextMenu<T> {
  contextMenu!: MatMenuTrigger;
  menuItems!: ContextMenuItem[];
  contextMenuPosition = {x: '0px', y: '0px'};

  abstract onContextMenu(event: MouseEvent, menuData: T): void;

  protected constructor(contextMenu: MatMenuTrigger) {
    this.contextMenu = contextMenu;
  }
}
