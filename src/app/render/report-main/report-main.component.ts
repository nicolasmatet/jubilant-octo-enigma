import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {ReportLoaderService} from "../../services/report-loader.service";
import {PartHostDirective} from "../../directives/part-host.directive";
import {ReportComponent, ReportPart} from "../../models/reportPart.model";
import {ExporterSelection} from "../../export/model/exporterSelection.model";
import {DataframeModel} from "../../models/dataframe.model";

@Component({
  selector: 'app-report',
  templateUrl: './report-main.component.html',
  styleUrls: ['./report-main.component.scss']
})
export class ReportMainComponent implements OnInit {

  @Input() report!: ExporterSelection;
  @Input() finData!: DataframeModel;

  @ViewChild(PartHostDirective, {static: true}) rootHost!: PartHostDirective;


  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.rootHost.viewContainerRef.clear();
    this.report.children
      .filter(c => c.exported)
      .forEach(c => this.renderReportPart(c));
  }

  renderReportPart(selection: ExporterSelection) {
    console.log("exporting", selection);
    console.log("exporting with finData", this.finData);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(selection.reportPart.component);
    const componentRef = this.rootHost.viewContainerRef.createComponent<ReportComponent>(componentFactory);
    componentRef.instance.selection = selection;
    componentRef.instance.finData = this.finData;
  }
}
