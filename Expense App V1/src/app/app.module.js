var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
//import { ConstantData } from '../providers/constants';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({ declarations: [
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
            VlinksPage
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
            VlinksPage
        ],
        providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map