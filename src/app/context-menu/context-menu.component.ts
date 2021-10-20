import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ContextMenu} from "./models/context-menu.model";
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements AfterViewInit {

  @Input() contextMenu!: ContextMenu<any>;
  @ViewChild(MatMenuTrigger) contextMenuTrigger!: MatMenuTrigger;


  constructor() {
  }

  ngAfterViewInit(): void {
    this.contextMenu.contextMenuTrigger = this.contextMenuTrigger;
  }

}
