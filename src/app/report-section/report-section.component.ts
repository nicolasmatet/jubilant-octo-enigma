import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {ReportComponent, ReportPart} from "../models/reportPart.model";
import {PartHostDirective} from "../directives/part-host.directive";
import {ExporterSelection} from "../export/model/exporterSelection.model";

@Component({
  selector: 'app-report-section',
  templateUrl: './report-section.component.html',
  styleUrls: ['./report-section.component.scss']
})
export class ReportSectionComponent implements OnInit, ReportComponent {
  selection!: ExporterSelection;
  @ViewChild(PartHostDirective, {static: true}) contentHost!: PartHostDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.contentHost.viewContainerRef.clear();
    this.selection.children
      .filter(c => c.exported)
      .forEach(c => this.renderReportPart(c));
  }

  renderReportPart(selection: ExporterSelection) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(selection.reportPart.component);
    const componentRef = this.contentHost.viewContainerRef.createComponent<ReportComponent>(componentFactory);
    componentRef.instance.selection = selection;
  }


}
