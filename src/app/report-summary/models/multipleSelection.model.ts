import {SummaryPart} from "./summaryPart.interface";
import {SelectionModel} from "../../models/selection.model";
import {Subject} from "rxjs";

export class MultipleSelectionModel extends SelectionModel<SummaryPart> {
  private selected: SummaryPart[] = [];
  selectionChange = new Subject<SummaryPart[]>();

  select(value: SummaryPart) {
    if (!this.selected.some(v => v.uId === value.uId)) {
      value.selected = true;
      this.selected.push(value);
      this.selectionChange.next(this.selected);
    } else {
      this.unselect(value);
    }
  }

  unselect(value: SummaryPart) {
    const idx = this.selected.findIndex(v => v.uId === value.uId);
    value.selected = false;
    this.selected.splice(idx, 1);
    this.selectionChange.next(this.selected);
  }

  clear() {
    this.selected.forEach(v => v.selected = false);
    this.selected = [];
    this.selectionChange.next([]);
  }
}
