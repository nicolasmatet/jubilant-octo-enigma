import {SummaryPart} from "./summaryPart.interface";
import {ContextMenu} from "../../context-menu/models/context-menu.model";

export class SummaryContextMenu extends ContextMenu<SummaryPart> {

  constructor() {
    super();
  }

  onContextMenu(event: MouseEvent, summaryPart: SummaryPart) {
    event.preventDefault();
    console.log("event", event);
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenuTrigger.menuData = {'summaryPart': summaryPart};
    this.contextMenuTrigger.menu.focusFirstItem('mouse');
    this.contextMenuTrigger.openMenu();
  }

}
