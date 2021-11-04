import {Component, OnInit} from '@angular/core';
import {ReportExport} from "../export/model/reportExport.model";
import {SelectionModel} from "../models/selection.model";
import {SummaryPart} from "../report-summary/models/summaryPart.interface";
import {MultipleSelectionModel} from "../report-summary/models/multipleSelection.model";
import {ReportPart} from "../models/reportPart.model";
import {SummaryContextMenuService} from "../report-summary/services/summary-context-menu.service";
import {ReportLoaderService} from "../services/report-loader.service";

@Component({
  selector: 'app-report-edition',
  templateUrl: './report-edition.component.html',
  styleUrls: ['./report-edition.component.scss']
})
export class ReportEditionComponent implements OnInit {
  contextMenu = this.contextMenuService.getSummaryContextMenu();
  selectionModel: SelectionModel<SummaryPart> = new MultipleSelectionModel();
  report!: ReportPart;

  constructor(private contextMenuService: SummaryContextMenuService,
              private reportLoader: ReportLoaderService) {
    this.reportLoader.reportSubject.subscribe(report => {
      this.report = report;
    });
  }

  ngOnInit(): void {
  }

}
