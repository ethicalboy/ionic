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
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ExpensesPage } from '../expenses/expenses';
var NewexpensePage = (function () {
    function NewexpensePage(navCtrl, navParams, http, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.add_exp = { expid: "", comment: "", amount: "", user_id: localStorage.getItem('user_id'), exp_date: new Date().toISOString() };
    }
    NewexpensePage.prototype.ionViewDidLoad = function () {
        this.load();
    };
    /*load category*/
    NewexpensePage.prototype.load = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
        });
        loader.present();
        var link = 'http://www.vconnect.ml/api/exp_manage/get_exp_type';
        var data = JSON.stringify({ user_id: localStorage.getItem('user_id') });
        this.http.post(link, data)
            .subscribe(function (data) {
            loader.dismiss();
            _this.categorys = JSON.parse(data['_body']).response;
        }, function (error) {
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Connection time out',
                buttons: ['Dismiss']
            });
            alert.present();
        });
    };
    /*add new expense*/
    NewexpensePage.prototype.new_expense = function (expForm) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
        });
        loader.present();
        var link = 'http://www.vconnect.ml/api/exp_manage/exp_new';
        var data = JSON.stringify(this.add_exp);
        console.log(data);
        this.http.post(link, data)
            .subscribe(function (data) {
            loader.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Success',
                subTitle: 'New expense added',
                buttons: ['Dismiss']
            });
            alert.present();
            _this.navCtrl.pop(_this);
            _this.navCtrl.setRoot(ExpensesPage);
        }, function (error) {
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Connection time out',
                buttons: ['Dismiss']
            });
            alert.present();
        });
    };
    return NewexpensePage;
}());
NewexpensePage = __decorate([
    Component({
        selector: 'page-newexpense',
        templateUrl: 'newexpense.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        AlertController,
        LoadingController])
], NewexpensePage);
export { NewexpensePage };
//# sourceMappingURL=newexpense.js.map