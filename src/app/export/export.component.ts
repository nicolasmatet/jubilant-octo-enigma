import {Component, ComponentFactoryResolver, Inject, OnInit, ViewChild} from '@angular/core';
import {ReportTag} from "../models/reportTag.model";
import {TagService} from "../services/tag.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ExportModel} from "./model/export.model";
import {PartHostDirective} from "../directives/part-host.directive";
import {ReportComponent} from "../models/reportPart.model";
import {ExporterSelection} from "./model/reportExport.model";

export interface ExportDialogData {
  exporter: ExportModel
}

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

  allTags: ReportTag[] = [];
  selectedTags: ReportTag[] = [];
  exporter!: ExportModel;
  @ViewChild(PartHostDirective, {static: true}) rootHost!: PartHostDirective;

  constructor(private tagService: TagService,
              private componentFactoryResolver: ComponentFactoryResolver,
              @Inject(MAT_DIALOG_DATA) public data: ExportDialogData,
              public dialogRef: MatDialogRef<ExportComponent>) {
    tagService.subjectAllTags.subscribe(allTags => {
      this.allTags = allTags;
    });
    this.exporter = data.exporter;
  }

  ngOnInit(): void {
  }

  selectTags(reportTags: ReportTag[]) {
    this.selectedTags = reportTags;
  }

  export() {
    const exportSelection = this.exporter.export(this.selectedTags);
  }

  render(exporterSelection: ExporterSelection) {
    this.rootHost.viewContainerRef.clear();
    exporterSelection.children
      .filter(c => c.exported)
      .forEach(c => {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(exporterSelection.reportPart.component);
        const componentRef = this.rootHost.viewContainerRef.createComponent<ReportComponent>(componentFactory);
        componentRef.instance.selection = c;
      });
  }
}
