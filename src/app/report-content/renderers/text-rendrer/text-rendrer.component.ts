import {Component, OnInit} from '@angular/core';
import {RendererParams, ReportContentRendererComponent, ReportPartContent} from "../../../models/reportPartContent";
import {EditorTextInterface} from "../../../editor/interfaces/editorVariable.interface";

@Component({
  selector: 'app-text-rendrer',
  templateUrl: './text-rendrer.component.html',
  styleUrls: ['./text-rendrer.component.scss']
})
export class TextRendrerComponent implements ReportContentRendererComponent {

  value: EditorTextInterface = {text: ''};

  constructor() {
  }

  init(params: RendererParams): void {
    this.value = params.value;
  }

}
