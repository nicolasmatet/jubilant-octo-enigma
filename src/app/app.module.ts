import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReportSummaryComponent} from './report-summary/report-summary.component';
import {DtpMainComponent} from './dtp-main/dtp-main.component';
import {ReportSectionComponent} from './report-section/report-section.component';
import {ReportParagraphComponent} from './report-paragraph/report-paragraph.component';
import {PartHostDirective} from './directives/part-host.directive';
import {FlexModule} from "@angular/flex-layout";
import {CommonModule} from "@angular/common";
import {ReportMainComponent} from "./report-main/report-main.component";
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatMenuModule} from "@angular/material/menu";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ShortTextDialogComponent} from "./short-text-dialog/short-text-dialog.component";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {EditorComponent} from './editor/editor.component';
import {EditorPageComponent} from './editor/editor-page/editor-page.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {TagTitlePipe} from "./services/tag.service";
import {TagMenuComponent} from './report-summary/tag-menu/tag-menu.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import { ExportComponent } from './export/export.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportMainComponent,
    ReportSummaryComponent,
    DtpMainComponent,
    ReportSectionComponent,
    ReportParagraphComponent,
    PartHostDirective,
    ShortTextDialogComponent,
    EditorComponent,
    EditorPageComponent,
    TagTitlePipe,
    TagMenuComponent,
    ExportComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexModule,
    MatIconModule,
    DragDropModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
