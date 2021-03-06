import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  Inject,
  Injector,
  OnInit, TemplateRef,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {ReportTag, TagGraph} from "../models/reportTag.model";
import {TagService} from "../services/tag.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ExportModel} from "./model/export.model";
import {ReportPart} from "../models/reportPart.model";
import {ExporterSelection} from "./model/exporterSelection.model";
import {ReportPartFactory} from "../models/reportPartFactory.model";
import {SummaryPart} from "../report-summary/models/summaryPart.interface";
import {DomPortal, DomPortalOutlet, PortalOutlet, TemplatePortal} from "@angular/cdk/portal";
import {DataframeModel} from "../models/dataframe.model";
import {FinDataService} from "../services/fin-data.service";
import {HierarchicalTagSelectionModel, IdentityTagSelectionModel} from "./model/tagSelection.model";

export interface ExportDialogData {
  reportPart: ReportPart
  exporter: ExportModel
}

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {
  exporter!: ExportModel;
  reportPart!: ReportPart;

  allTags: ReportTag[] = [];
  tagTree: TagGraph;
  // @ViewChild(PartHostDirective, {static: true}) rootHost!: PartHostDirective;
  // @ViewChild("iframe") iframe: any;
  @ViewChild('rootHost') templatePortalContent!: TemplateRef<unknown>;
  taggedItem = new SummaryPart(new ReportPartFactory().getNewParagraph(''), {});
  dataFile: string = '';
  allDataFiles: string[];

  // private portalHost!: PortalOutlet;

  constructor(private tagService: TagService,
              private finDataService: FinDataService,
              private injector: Injector,
              private appRef: ApplicationRef,
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              @Inject(MAT_DIALOG_DATA) public data: ExportDialogData) {
    tagService.subjectAllTags.subscribe(allTags => {
      this.allTags = allTags;
    });
    this.tagTree = this.tagService.getTagTree();
    this.allDataFiles = this.finDataService.getDataFiles();
    this.dataFile = this.allDataFiles[0];
    this.reportPart = data.reportPart;
    this.exporter = data.exporter;
  }

  ngOnInit(): void {
  }

  export() {
    // const tagSelectionModel = new IdentityTagSelectionModel(this.taggedItem.reportPart.tags)
    const tagSelectionModel = new HierarchicalTagSelectionModel(this.taggedItem.reportPart.tags);
    tagSelectionModel.setTagTree(this.tagTree);
    const exportSelection: ExporterSelection = this.exporter.getExporterSelection(this.reportPart, tagSelectionModel);
    const dataSource = this.getDataSource(this.dataFile);
    this.render(exportSelection, dataSource);
  }

  getDataSource(dataFile: string) {
    return this.finDataService.getData(dataFile);
  }

  render(exporterSelection: ExporterSelection, finData: DataframeModel) {
    console.log("exporterSelection", exporterSelection);
    const newWindow = window.open('', '_blank');
    if (newWindow === null) {
      console.error("could'n open a new window");
      return;
    }
    const portalHost = this.getPortalHost(newWindow);
    const portal = new TemplatePortal(this.templatePortalContent, this.viewContainerRef, {
      exporterSelection: exporterSelection,
      finData: finData
    });
    this._attachStyles(newWindow);
    portalHost.attach(portal);
    setTimeout(() => newWindow.print(), 100);
    newWindow.onafterprint = () => {
      // newWindow.close();
    };
  }

  private _attachStyles(targetWindow: Window): void {
    document.querySelectorAll("style").forEach(htmlElement => {
      targetWindow.document.head.appendChild(htmlElement.cloneNode(true));
    });
    const styleSheetElement = this._getStyleSheetElement();
    targetWindow.document.head.appendChild(styleSheetElement);
  }

  private _getStyleSheetElement() {
    const styleSheetElement = document.createElement("link");
    document.querySelectorAll("link").forEach(htmlElement => {
      if (htmlElement.rel === "stylesheet") {
        const absoluteUrl = new URL(htmlElement.href).href;
        styleSheetElement.rel = "stylesheet";
        styleSheetElement.type = "text/css";
        styleSheetElement.href = absoluteUrl;
      }
    });
    return styleSheetElement;
  }

  private getPortalHost(window: Window) {
    return new DomPortalOutlet(
      window.document.body,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
  }
}
