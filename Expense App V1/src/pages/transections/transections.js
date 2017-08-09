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
import { NavController, ActionSheetController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { DipositePage } from '../diposite/diposite';
/*
  Generated class for the Transections page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
var TransectionsPage = (function () {
    function TransectionsPage(navCtrl, navParams, http, alertCtrl, loadingCtrl, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
    }
    TransectionsPage.prototype.ionViewWillEnter = function () {
        this.load();
    };
    TransectionsPage.prototype.load = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
        });
        loader.present();
        var link = 'http://www.vconnect.ml/api/exp_pocket/my_transections';
        var data = JSON.stringify({ user_id: localStorage.getItem('user_id') });
        this.http.post(link, data)
            .subscribe(function (data) {
            loader.dismiss();
            _this.recent_transection = JSON.parse(data['_body']).response;
        }, function (error) {
            console.log("error!");
        });
    };
    /*add cash nav loader*/
    TransectionsPage.prototype.add_new = function () {
        this.navCtrl.push(DipositePage);
    };
    /*pull to refresh */
    TransectionsPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        var link = 'http://www.vconnect.ml/api/exp_pocket/my_transections';
        var data = JSON.stringify({ user_id: localStorage.getItem('user_id') });
        this.http.post(link, data)
            .subscribe(function (data) {
            _this.recent_transection = JSON.parse(data['_body']).response;
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
    TransectionsPage.prototype.presentActionSheet = function (exp_type, exp_id, time) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: exp_type + " Added " + time,
            buttons: [
                {
                    text: 'Delete',
                    icon: 'md-trash',
                    handler: function () {
                        var confirm = _this.alertCtrl.create({
                            title: 'Are you sure ?',
                            message: '<b>You want to delete this transection.</b>',
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
                                        var link = 'http://www.vconnect.ml/api/exp_pocket/delete_diposite';
                                        var exp_trasaction = JSON.stringify({ user_id: localStorage.getItem('user_id'), diposite_id: exp_id });
                                        _this.http.post(link, exp_trasaction)
                                            .subscribe(function (data) {
                                            var delete_exp = JSON.parse(data['_body']).statusCode;
                                            if (delete_exp == 200) {
                                                var alert_1 = _this.alertCtrl.create({
                                                    title: 'Success',
                                                    subTitle: 'Transection deleted successfully !',
                                                    buttons: ['ok']
                                                });
                                                alert_1.present();
                                                _this.load();
                                            }
                                            else {
                                                var alert_2 = _this.alertCtrl.create({
                                                    title: 'Permission denied',
                                                    subTitle: "You don't have permission to delete this transaction !",
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
    return TransectionsPage;
}());
TransectionsPage = __decorate([
    Component({
        selector: 'page-transections',
        templateUrl: 'transections.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        AlertController,
        LoadingController,
        ActionSheetController])
], TransectionsPage);
export { TransectionsPage };
//# sourceMappingURL=transections.js.map