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
import { CategoryPage } from '../category/category';
var NewcategoryPage = (function () {
    function NewcategoryPage(navCtrl, navParams, http, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.category_model = { exp_type: '', user_id: localStorage.getItem('user_id') };
    }
    NewcategoryPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad NewcategoryPage');
    };
    /*add new expense*/
    NewcategoryPage.prototype.new_category = function (expForm) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
        });
        loader.present();
        var link = 'http://www.vconnect.ml/api/exp_manage/new_exp_type';
        var data = JSON.stringify(this.category_model);
        console.log(data);
        this.http.post(link, data)
            .subscribe(function (data) {
            var alert = _this.alertCtrl.create({
                title: 'Success',
                subTitle: 'New category added',
                buttons: ['Dismiss']
            });
            alert.present();
            loader.dismiss();
            _this.navCtrl.pop(_this);
            _this.navCtrl.setRoot(CategoryPage);
        }, function (error) {
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Connection time out',
                buttons: ['Dismiss']
            });
            alert.present();
        });
    };
    return NewcategoryPage;
}());
NewcategoryPage = __decorate([
    Component({
        selector: 'page-newcategory',
        templateUrl: 'newcategory.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        AlertController,
        LoadingController])
], NewcategoryPage);
export { NewcategoryPage };
//# sourceMappingURL=newcategory.js.map