import {Injectable} from '@angular/core';
import {SummaryPart} from "../models/summaryPart.interface";
import {ReportPartFactory} from "../../models/reportPartFactory.model";
import {NewFileDialogData, ShortTextDialogComponent} from "../../short-text-dialog/short-text-dialog.component";
import {MatDialogRef} from "@angular/material/dialog/dialog-ref";
import {ReportPart} from "../../models/reportPart.model";
import {MatDialog} from "@angular/material/dialog";
import {EditorService} from "../../editor/services/editor.service";
import {SummaryContextMenu} from "../models/summary-context-menu.model";
import {ContextMenu} from "../../context-menu/models/context-menu.model";


@Injectable({
  providedIn: 'root'
})
export class SummaryContextMenuService {

  constructor(private dialog: MatDialog, private editor: EditorService) {
  }

  getSummaryContextMenu(): ContextMenu<SummaryPart> {
    const newMenu = new SummaryContextMenu();
    newMenu.menuItems = [
      {title: 'Edit', icon: 'edit_note', callback: (summaryPart: SummaryPart) => this.onClickEdit(summaryPart)},
      {
        title: 'New Section',
        icon: 'create_new_folder',
        callback: (summaryPart: SummaryPart) => this.onClickNewSection(summaryPart)
      },
      {
        title: 'New Paragraph',
        icon: 'post_add',
        callback: (summaryPart: SummaryPart) => this.onClickNewParagraph(summaryPart)
      },
      {title: 'Rename', icon: 'edit', callback: (summaryPart: SummaryPart) => this.onClickRename(summaryPart)},
      {title: 'Delete', icon: 'delete', callback: (summaryPart: SummaryPart) => this.onClickDelete(summaryPart)}
    ];
    return newMenu;
  }

  onClickDelete(summaryPart: SummaryPart) {
    console.log("onClickDelete", summaryPart);
    summaryPart.reportPart.parent?.deleteChild(summaryPart.reportPart);
    summaryPart.parent?.deleteChild(summaryPart);
  }

  onClickRename(summaryPart: SummaryPart) {
    this.openShortTextDialog({message: 'Enter new name', yesText: 'Ok', value: summaryPart.reportPart.title})
      .afterClosed().subscribe(result => {
      if (result) {
        summaryPart.reportPart.title = result;
      }
    });
  }

  onClickNewSection(summaryPart: SummaryPart) {
    this.openShortTextDialog({message: 'Enter a new name', yesText: 'Ok', value: 'Untitled'})
      .afterClosed().subscribe(result => {
      console.log("afterClosed onClickNewSection", result);
      if (result) {
        const newSection = new ReportPartFactory().getNewSection(result);
        this.addChild(summaryPart, newSection);
      }
    });
  }

  onClickNewParagraph(summaryPart: SummaryPart) {
    this.openShortTextDialog({message: 'Enter new name', yesText: 'Ok', value: 'Untitled'})
      .afterClosed().subscribe(result => {
      if (result) {
        const newSection = new ReportPartFactory().getNewParagraph(result);
        this.addChild(summaryPart, newSection);
      }
    });
  }

  onClickEdit(summaryPart: SummaryPart) {
    if (summaryPart.reportPart.isContainer) {
      this.onClickRename(summaryPart);
    } else {
      this.editor.registerForEdition(summaryPart.reportPart);
    }
  }

  private openShortTextDialog(data: NewFileDialogData): MatDialogRef<ShortTextDialogComponent> {
    return this.dialog.open(ShortTextDialogComponent, {
      width: '550px',
      height: '120px',
      data: data
    });
  }

  private addChild(target: SummaryPart, newPart: ReportPart) {
    const container: SummaryPart | null = target.reportPart.isContainer ? target : target.parent;
    container?.reportPart.addChildren(newPart);
    container?.addChildren(newPart);
  }

}
