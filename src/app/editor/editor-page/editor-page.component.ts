import {Component, Input, OnInit} from '@angular/core';
import {EditableReportPart, ReportPart} from "../../models/reportPart.model";

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss']
})
export class EditorPageComponent implements OnInit {

  @Input() reportPart!: EditableReportPart;

  constructor() {
  }

  ngOnInit(): void {
  }

}
