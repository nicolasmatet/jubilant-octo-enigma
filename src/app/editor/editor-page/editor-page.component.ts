import {Component, ComponentRef, ElementRef, Input, OnInit, Type, ViewChild} from '@angular/core';
import {ReportPart} from "../../models/reportPart.model";
import {ContextMenu} from "../../context-menu/models/context-menu.model";
import {PartHostDirective} from "../../directives/part-host.directive";
import {EditorContextMenuData} from "../interfaces/editor-context-menu-data.interface";
import {ReportContentComponent, ReportPartContent} from "../../models/reportPartContent";
import {Subject} from "rxjs";
import {EditorContextMenuService} from "../editor-context-menu.service";
import {EditorContentHandlerModel} from "../models/editorContentHandler.model";

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss']
})
export class EditorPageComponent implements OnInit {

  @Input() reportPart!: ReportPart;
  @Input() contextMenu!: ContextMenu<EditorContextMenuData>;
  @ViewChild('editor') editorRef !: ElementRef;
  @ViewChild(PartHostDirective, {static: true}) editorHostRef !: PartHostDirective;

  currentComponentRef: ComponentRef<ReportContentComponent> | null;

  contentHandler !: EditorContentHandlerModel;

  constructor() {
    this.currentComponentRef = null;
  }

  ngOnInit(): void {
    this.contentHandler = new EditorContentHandlerModel(this.reportPart.content);
    this.reportPart.content.forEach(content => {
      this.contentHandler.createComponent(this.editorHostRef, content.component, content.value);
    });
  }

  save() {
    console.log('save');
  }


}
