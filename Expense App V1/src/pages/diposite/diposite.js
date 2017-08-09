var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, MenuController, AlertController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
/*
  Generated class for the Diposite page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
var DipositePage = (function () {
    function DipositePage(navCtrl, http, menu, alertCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.submitted = false;
        this.add_cash = { amount: "", comment: "", user_id: localStorage.getItem('user_id'), transection_date: new Date().toISOString() };
    }
    DipositePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DipositePage');
    };
    /*add cash*/
    DipositePage.prototype.add_money = function (dipositeForm) {
        var _this = this;
        if (dipositeForm.valid) {
            var link = 'http://www.vconnect.ml/exp_pocket/add_money';
            var data1 = JSON.stringify(this.add_cash);
            this.http.post(link, data1)
                .subscribe(function (data) {
                var alert = _this.alertCtrl.create({
                    title: 'Success',
                    subTitle: 'Cash added',
                    buttons: ['Dismiss']
                });
                alert.present();
                _this.navCtrl.setRoot(DashboardPage);
            }, function (error) {
                var alert = _this.alertCtrl.create({
                    title: 'Server error',
                    subTitle: 'Internal error occured',
                    buttons: ['Dismiss']
                });
                alert.present();
            });
        }
    };
    return DipositePage;
}());
DipositePage = __decorate([
    Component({
        selector: 'page-diposite',
        templateUrl: 'diposite.html'
    }),
    __metadata("design:paramtypes", [NavController,
        Http,
        MenuController,
        AlertController])
], DipositePage);
export { DipositePage };
//# sourceMappingURL=diposite.js.map