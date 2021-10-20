import {Component, OnInit} from '@angular/core';
import {ReportLoaderService} from "../services/report-loader.service";
import {ReportPart} from "../models/reportPart.model";
import {ReportExport} from "../export/model/reportExport.model";
import {SummaryContextMenuService} from "../report-summary/services/summary-context-menu.service";
import {SelectionModel} from "../models/selection.model";
import {SummaryPart} from "../report-summary/models/summaryPart.interface";
import {MultipleSelectionModel} from "../report-summary/models/multipleSelection.model";

@Component({
  selector: 'app-dtp-main',
  templateUrl: './dtp-main.component.html',
  styleUrls: ['./dtp-main.component.scss']
})
export class DtpMainComponent implements OnInit {

  report!: ReportPart;
  contextMenu = this.contextMenuService.getSummaryContextMenu();
  exporter = new ReportExport();
  selectionModel: SelectionModel<SummaryPart> = new MultipleSelectionModel();

  constructor(private reportLoader: ReportLoaderService,
              private contextMenuService: SummaryContextMenuService) {
    this.report = this.reportLoader.getReport();
  }

  ngOnInit(): void {
  }

}
