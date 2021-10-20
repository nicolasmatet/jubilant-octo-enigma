import {SummaryPart} from "./summaryPart.interface";
import {ContextMenu} from "../../models/context-menu.model";

export class SummaryContextMenu extends ContextMenu<SummaryPart> {

constructor() {
  super();
}

  onContextMenu(event: MouseEvent, summaryPart: SummaryPart) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenuTrigger.menuData = {'summaryPart': summaryPart};
    this.contextMenuTrigger.menu.focusFirstItem('mouse');
    this.contextMenuTrigger.openMenu();
  }

}
