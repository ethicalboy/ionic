var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Page1 } from '../pages/page1/page1';
/*import { DipositePage } from '../pages/diposite/diposite';*/
import { DashboardPage } from '../pages/dashboard/dashboard';
/*import { NewexpensePage } from '../pages/newexpense/newexpense';*/
import { VlinksPage } from '../pages/vlinks/vlinks';
import { ExpensesPage } from '../pages/expenses/expenses';
import { TransectionsPage } from '../pages/transections/transections';
import { CategoryPage } from '../pages/category/category';
var MyApp = (function () {
    function MyApp(platform, menu, Alert) {
        this.platform = platform;
        this.menu = menu;
        this.Alert = Alert;
        this.rootPage = Page1;
        this.initializeApp();
        this.menu.enable(false, 'beforeMenu');
        this.menu.enable(false, 'afterMenu');
        // used for an example of ngFor and navigation
        this.pagesBeforeLogin = [
            { title: 'Login', component: Page1, icon: 'key' }
        ];
        this.pagesAfterLogin = [
            { title: 'Dashboard', component: DashboardPage, icon: 'server' },
            { title: 'My Expense', component: ExpensesPage, icon: 'inr' },
            { title: 'Transactions', component: TransectionsPage, icon: 'google-wallet' },
            { title: 'Vlinks', component: VlinksPage, icon: 'envelope' },
            { title: 'Category', component: CategoryPage, icon: 'tags' },
            { title: 'Log Out', component: "", icon: "power-off" }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            if (localStorage.getItem('name')) {
                _this.rootPage = DashboardPage;
                _this.menu.enable(true, 'afterMenu');
                _this.menu.enable(false, 'beforeMenu');
            }
            else {
                _this.rootPage = Page1;
                _this.menu.enable(false, 'afterMenu');
                _this.menu.enable(false, 'beforeMenu');
            }
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        var _this = this;
        if (page.component == "") {
            // console.log("logout");
            var confirm_1 = this.Alert.create({
                title: 'Confirmation',
                message: '<b color="myheader">Are you sure you want to Log out?</b>',
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: 'No',
                        handler: function () {
                            console.log('No clicked');
                        }
                    },
                    {
                        text: 'Yes',
                        handler: function () {
                            localStorage.clear();
                            _this.nav.setRoot(Page1);
                            _this.menu.enable(false, 'beforeMenu');
                            _this.menu.enable(false, 'afterMenu');
                        }
                    }
                ]
            });
            confirm_1.present(confirm_1);
        }
        else {
            this.nav.setRoot(page.component);
        }
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform,
        MenuController, AlertController])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map