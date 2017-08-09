import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { DipositePage } from '../pages/diposite/diposite';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { NewexpensePage } from '../pages/newexpense/newexpense';
import { ReportsPage } from '../pages/reports/reports';
import { ExpensesPage } from '../pages/expenses/expenses';
import { TransectionsPage } from '../pages/transections/transections';
import { CategoryPage } from '../pages/category/category';
import { NewcategoryPage } from '../pages/newcategory/newcategory';
import { VlinksPage } from '../pages/vlinks/vlinks';
import { ExpdetailsPage } from '../pages/expdetails/expdetails';
//import { ConstantData } from '../providers/constants';

@NgModule(
 { declarations: [
  MyApp,
  Page1,
  DipositePage,
  DashboardPage,
  NewexpensePage,
  ReportsPage,
  ExpensesPage,
  TransectionsPage,
  CategoryPage,
  NewcategoryPage,
  VlinksPage,
  ExpdetailsPage
  ],
  imports: [
  IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  Page1,
  DipositePage,
  DashboardPage,
  NewexpensePage,
  ReportsPage,
  ExpensesPage,
  TransectionsPage,
  CategoryPage,
  NewcategoryPage,
  VlinksPage,
  ExpdetailsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
