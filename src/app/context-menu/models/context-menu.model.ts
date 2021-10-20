import {MatMenuTrigger} from "@angular/material/menu";
import {ContextMenuItem} from "./context-menu-item";

export abstract class ContextMenu<T> {
  contextMenuTrigger!: MatMenuTrigger;
  menuItems!: ContextMenuItem[];
  contextMenuPosition = {x: '0px', y: '0px'};

  abstract onContextMenu(event: MouseEvent, menuData: T): void;

  protected constructor() {
  }
}
