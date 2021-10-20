import {SummaryPart} from "./summaryPart.interface";
import {ContextMenu} from "../../models/context-menu.model";
import {MatMenuTrigger} from "@angular/material/menu";

export class SummaryContextMenu extends ContextMenu<SummaryPart> {

constructor(contextMenu: MatMenuTrigger) {
  super(contextMenu);
}

  onContextMenu(event: MouseEvent, summaryPart: SummaryPart) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {'summaryPart': summaryPart};
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

}
