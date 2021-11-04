import {Component, OnInit} from '@angular/core';
import {ReportLoaderService} from "../services/report-loader.service";
import {ReportPart} from "../models/reportPart.model";
import {ReportExport} from "../export/model/reportExport.model";
import {SummaryContextMenuService} from "../report-summary/services/summary-context-menu.service";
import {SelectionModel} from "../models/selection.model";
import {SummaryPart} from "../report-summary/models/summaryPart.interface";
import {MultipleSelectionModel} from "../report-summary/models/multipleSelection.model";
import {ExportComponent} from "../export/export.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-dtp-main',
  templateUrl: './dtp-main.component.html',
  styleUrls: ['./dtp-main.component.scss']
})
export class DtpMainComponent implements OnInit {

  report!: ReportPart;
  exporter = new ReportExport();

  constructor(private reportLoader: ReportLoaderService,
              private dialog: MatDialog) {
    this.reportLoader.getReport();
    this.reportLoader.reportSubject.subscribe(report => {
      this.report = report;
    });
  }

  ngOnInit(): void {
  }

  export() {
    this.dialog.open(ExportComponent, {
      data: {
        reportPart: this.report,
        exporter: this.exporter
      }
    });
  }

  save() {
    this.reportLoader.saveReport(this.report);
  }

  load() {
    this.reportLoader.loadReport('demo1');
  }
}
