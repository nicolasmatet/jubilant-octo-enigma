import {Component, OnInit} from '@angular/core';
import {DataframeModel} from "../../../models/dataframe.model";
import {RendererParams, ReportContentRendererComponent, ReportPartContent} from "../../../models/reportPartContent";
import {ExporterSelection} from "../../../export/model/exporterSelection.model";

@Component({
  selector: 'app-text-rendrer',
  templateUrl: './text-rendrer.component.html',
  styleUrls: ['./text-rendrer.component.scss']
})
export class TextRendrerComponent implements ReportContentRendererComponent {

  value = '';

  constructor() {
  }

  init(params: RendererParams): void {
    this.value = params.value;
  }

}
