import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {ReportComponent} from "../../models/reportPart.model";
import {ExporterSelection} from "../../export/model/exporterSelection.model";
import {DataframeModel} from "../../models/dataframe.model";
import {PartHostDirective} from "../../directives/part-host.directive";
import {ReportContentRendererComponent, ReportContentSettings, ReportPartContent} from "../../models/reportPartContent";

@Component({
  selector: 'app-report-paragraph',
  templateUrl: './report-paragraph.component.html',
  styleUrls: ['./report-paragraph.component.scss']
})
export class ReportParagraphComponent implements OnInit, ReportComponent {
  selection!: ExporterSelection;
  finData!: DataframeModel;
  @ViewChild(PartHostDirective, {static: true}) contentHost!: PartHostDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.contentHost.viewContainerRef.clear();
    this.selection.reportPart.content
      .forEach(c => this.renderContent(c));
  }

  renderContent(content: ReportPartContent<any>) {
    const rawValue = content.value;
    const contentDef = ReportContentSettings[content.type];
    const value = contentDef.valueGetter ?
      contentDef.valueGetter.transform(rawValue, {data: this.finData, selection: this.selection}) : rawValue;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(contentDef.renderer);
    const componentRef = this.contentHost.viewContainerRef.createComponent<ReportContentRendererComponent>(componentFactory);
    componentRef.instance.init(
      {
        value: value,
        dataSource: this.finData,
        selection: this.selection,
        content: content
      });

  }
}
