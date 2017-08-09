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
import { NavController, MenuController, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { NewcategoryPage } from '../newcategory/newcategory';
/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
var CategoryPage = (function () {
    function CategoryPage(navCtrl, http, menu, alertCtrl, loadingCtrl, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
    }
    CategoryPage.prototype.ionViewDidLoad = function () {
        this.load();
    };
    /*my expenses*/
    CategoryPage.prototype.load = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
        });
        loader.present();
        var link = 'http://www.vconnect.ml/api/exp_manage/get_exp_type';
        var data = JSON.stringify({ user_id: localStorage.getItem('user_id') });
        this.http.post(link, data)
            .subscribe(function (data) {
            _this.categorys = JSON.parse(data['_body']).response;
            loader.dismiss();
        }, function (error) {
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Connection time out',
                buttons: ['Dismiss']
            });
            alert.present();
        });
    };
    /*add new category*/
    CategoryPage.prototype.add_new = function () {
        this.navCtrl.push(NewcategoryPage);
    };
    /*pull to refresh */
    CategoryPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        var link = 'http://www.vconnect.ml/api/exp_manage/get_exp_type';
        var data = JSON.stringify({ user_id: localStorage.getItem('user_id') });
        this.http.post(link, data)
            .subscribe(function (data) {
            _this.categorys = JSON.parse(data['_body']).response;
            refresher.complete();
        }, function (error) {
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Connection time out',
                buttons: ['Dismiss']
            });
            alert.present();
        });
    };
    /*Action icons */
    CategoryPage.prototype.presentActionSheet = function (category, cat_id, time) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: category + " Added " + time,
            buttons: [
                {
                    text: 'Delete',
                    icon: 'md-trash',
                    handler: function () {
                        var confirm = _this.alertCtrl.create({
                            title: 'Are you sure ?',
                            message: '<b>You want to delete this category.</b>',
                            enableBackdropDismiss: false,
                            buttons: [
                                {
                                    text: 'No',
                                    handler: function () {
                                    }
                                },
                                {
                                    text: 'Yes',
                                    handler: function () {
                                        var link = 'http://www.vconnect.ml/api/exp_manage/delete_category';
                                        var exp_trasaction = JSON.stringify({ user_id: localStorage.getItem('user_id'), exp_type_id: cat_id });
                                        console.log(exp_trasaction);
                                        _this.http.post(link, exp_trasaction)
                                            .subscribe(function (data) {
                                            var delete_exp = JSON.parse(data['_body']).statusCode;
                                            if (delete_exp == 200) {
                                                var alert_1 = _this.alertCtrl.create({
                                                    title: 'Success',
                                                    subTitle: 'Category deleted successfully !',
                                                    buttons: ['ok']
                                                });
                                                alert_1.present();
                                                _this.load();
                                            }
                                            else {
                                                var alert_2 = _this.alertCtrl.create({
                                                    title: 'Permission denied',
                                                    subTitle: "You don't have permission to delete this category !",
                                                    buttons: ['ok']
                                                });
                                                alert_2.present();
                                            }
                                        }, function (error) {
                                            var alert = _this.alertCtrl.create({
                                                title: 'Error',
                                                subTitle: 'Connection time out',
                                                buttons: ['Dismiss']
                                            });
                                            alert.present();
                                        });
                                    }
                                }
                            ]
                        });
                        confirm.present(confirm);
                    }
                },
                {
                    text: 'Archive',
                    icon: 'archive',
                    handler: function () {
                        console.log('Archive clicked');
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'md-close',
                    handler: function () {
                    }
                }
            ]
        });
        actionSheet.present();
    };
    return CategoryPage;
}());
CategoryPage = __decorate([
    Component({
        selector: 'page-category',
        templateUrl: 'category.html'
    }),
    __metadata("design:paramtypes", [NavController,
        Http,
        MenuController,
        AlertController,
        LoadingController,
        ActionSheetController])
], CategoryPage);
export { CategoryPage };
//# sourceMappingURL=category.js.map