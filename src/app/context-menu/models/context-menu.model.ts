import {MatMenuTrigger} from "@angular/material/menu";
import {ContextMenuItem} from "./context-menu-item";

export abstract class ContextMenu<T> {
  contextMenuTrigger!: MatMenuTrigger;
  menuItems!: ContextMenuItem<T>[];
  contextMenuPosition = {x: '0px', y: '0px'};

  protected constructor() {
  }

  showMenu(event: MouseEvent, menuData: T) {
    event.preventDefault();
    console.log("event", event);
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenuTrigger.menu.focusFirstItem('mouse');
    this.contextMenuTrigger.menuData = {'menudata': menuData};
    this.contextMenuTrigger.openMenu();
  }

}
