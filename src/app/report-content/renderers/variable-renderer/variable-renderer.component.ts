import {Component, OnInit} from '@angular/core';
import {RendererParams, ReportContentRendererComponent} from "../../../models/reportPartContent";

@Component({
  selector: 'app-variable-renderer',
  templateUrl: './variable-renderer.component.html',
  styleUrls: ['./variable-renderer.component.scss']
})
export class VariableRendererComponent implements ReportContentRendererComponent {
  value = '';

  constructor() {
  }

  init(params: RendererParams): void {
    console.log("VariableRendererComponent", params)
    this.value = params.value;
  }


}
