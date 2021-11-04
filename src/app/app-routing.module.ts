import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DtpMainComponent} from "./dtp-main/dtp-main.component";
import {TagManagmentComponent} from "./tag-managment/tag-managment.component";
import {ReportEditionComponent} from "./report-edition/report-edition.component";

const routes: Routes = [
  {
    path: '',
    component: ReportEditionComponent
  },
  {
    path: 'managetags',
    component: TagManagmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
