import {Component, OnInit} from '@angular/core';
import {ReportComponent, ReportPart} from "../models/reportPart.model";
import {ExporterSelection} from "../export/model/exporterSelection.model";

@Component({
  selector: 'app-report-paragraph',
  templateUrl: './report-paragraph.component.html',
  styleUrls: ['./report-paragraph.component.scss']
})
export class ReportParagraphComponent implements OnInit, ReportComponent {
  selection!: ExporterSelection;

  constructor() {
  }

  ngOnInit(): void {
  }

}
