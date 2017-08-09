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
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the Reports page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ReportsPage = (function () {
    function ReportsPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
    }
    ReportsPage.prototype.ionViewWillEnter = function () {
        this.load();
    };
    ReportsPage.prototype.load = function () {
        var _this = this;
        var link = 'http://www.vconnect.ml/api/exp_manage/my_expenses';
        var data = JSON.stringify({ user_id: 1 });
        this.http.post(link, data)
            .subscribe(function (data) {
            _this.letestexpense = JSON.parse(data['_body']).response;
            console.log(_this.letestexpense);
        }, function (error) {
            console.log("Oooops!");
        });
    };
    return ReportsPage;
}());
ReportsPage = __decorate([
    Component({
        selector: 'page-reports',
        templateUrl: 'reports.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http])
], ReportsPage);
export { ReportsPage };
//# sourceMappingURL=reports.js.map