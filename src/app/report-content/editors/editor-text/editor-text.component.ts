import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {ReportContentEditorComponent} from "../../../models/reportPartContent";

@Component({
  selector: 'app-editor-text',
  templateUrl: './editor-text.component.html',
  styleUrls: ['./editor-text.component.scss']
})
export class EditorTextComponent implements OnInit, ReportContentEditorComponent {

  @Input() value!: any;
  selected!: Subject<boolean>;
  caret: number[] = [0, 0];

  // @Output('change') change: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  save() {
  }

  node_walk(node: any, func: any) {
    let result = func(node);
    for (node = node.firstChild; result !== false && node; node = node.nextSibling) {
      result = this.node_walk(node, func);
    }
    return result;
  };

  getCaretPosition(elem: any): number[] {
    const sel = window.getSelection() as Selection;
    let cum_length = [0, 0];

    if (sel.anchorNode == elem)
      // @ts-ignore
      cum_length = [sel.anchorOffset, sel.extentOffset];
    else {
      // @ts-ignore
      const nodes_to_find = [sel.anchorNode, sel.extentNode];
      // @ts-ignore
      if (!elem.contains(sel.anchorNode) || !elem.contains(sel.extentNode))
        return [0, 0];
      else {
        let found = [false, false];
        let i;
        this.node_walk(elem, (node: any) => {
          for (i = 0; i < 2; i++) {
            if (node == nodes_to_find[i]) {
              found[i] = true;
              if (found[i == 0 ? 1 : 0]) {
                return false; // all done
              }
            }
          }

          if (node.textContent && !node.firstChild) {
            for (i = 0; i < 2; i++) {
              if (!found[i]) {
                cum_length[i] += node.textContent.length;
              }
            }
          }
          return false; // all done
        });
        cum_length[0] += sel.anchorOffset;
        // @ts-ignore
        cum_length[1] += sel.extentOffset;
      }
    }
    if (cum_length[0] <= cum_length[1]) {
      return cum_length;
    }
    return [cum_length[1], cum_length[0]];
  }

  onChange(event: any) {
    this.caret = this.getCaretPosition(event.target);
    this.selected.next(true);
    console.log(event);
    console.log("caret", this.caret);
  }
}
