import {Component, OnInit} from '@angular/core';
import {ReportLoaderService} from "../services/report-loader.service";
import {ReportPart} from "../models/reportPart.model";

@Component({
  selector: 'app-dtp-main',
  templateUrl: './dtp-main.component.html',
  styleUrls: ['./dtp-main.component.scss']
})
export class DtpMainComponent implements OnInit {

  report!: ReportPart;

  constructor(private reportLoader: ReportLoaderService) {
    this.report = this.reportLoader.getReport();
  }

  ngOnInit(): void {
  }

}
