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
import { NavController, ActionSheetController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { NewexpensePage } from '../newexpense/newexpense';
import { Global } from '../../providers/global';
var DashboardPage = (function () {
    /* my_pocket_balance = {};
    */
    function DashboardPage(navCtrl, navParams, http, alertCtrl, loadingCtrl, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.myDate = new Date().toISOString();
        alert(Global.myGlobalsurl);
    }
    DashboardPage.prototype.ionicViewbeforeEnter = function () {
        this.my_pocket();
    };
    DashboardPage.prototype.ionViewWillEnter = function () {
        this.load();
        this.my_pocket();
    };
    /*pocket balance*/
    DashboardPage.prototype.my_pocket = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
        });
        loader.present();
        var link = 'http://www.vconnect.ml/api/exp_pocket/my_pocket';
        var data = JSON.stringify({ user_id: localStorage.getItem('user_id') });
        this.http.post(link, data)
            .subscribe(function (data) {
            loader.dismiss();
            _this.count = JSON.parse(data['_body']).response;
        }, function (error) {
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Connection time out',
                buttons: ['Dismiss']
            });
            alert.present();
        });
    };
    /*test*/
    DashboardPage.prototype.presentActionSheet = function (exp_type, exp_id, time) {
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
                            message: '<b>You want to delete this expense.</b>',
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
                                        var link = 'http://www.vconnect.ml/api/exp_manage/delete_expence';
                                        var exp_trasaction = JSON.stringify({ user_id: localStorage.getItem('user_id'), expence_id: exp_id });
                                        _this.http.post(link, exp_trasaction)
                                            .subscribe(function (data) {
                                            var delete_exp = JSON.parse(data['_body']).statusCode;
                                            if (delete_exp == 200) {
                                                var alert_1 = _this.alertCtrl.create({
                                                    title: 'Success',
                                                    subTitle: 'Expense deleted successfully !',
                                                    buttons: ['ok']
                                                });
                                                alert_1.present();
                                                _this.load();
                                                _this.my_pocket();
                                            }
                                            else {
                                                var alert_2 = _this.alertCtrl.create({
                                                    title: 'Permission denied',
                                                    subTitle: 'You donot have permission to delete this expense !',
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
    /*my expenses*/
    DashboardPage.prototype.load = function () {
        var _this = this;
        var link = 'http://www.vconnect.ml/api/exp_manage/my_expenses';
        var data = JSON.stringify({ user_id: localStorage.getItem('user_id') });
        this.http.post(link, data)
            .subscribe(function (data) {
            _this.letestexpense = JSON.parse(data['_body']).response;
        }, function (error) {
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Connection time out',
                buttons: ['Dismiss']
            });
            alert.present();
        });
    };
    /*open category page*/
    DashboardPage.prototype.add_new = function () {
        this.navCtrl.push(NewexpensePage);
    };
    DashboardPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        var link = 'http://www.vconnect.ml/api/exp_manage/my_expenses';
        var data = JSON.stringify({ user_id: localStorage.getItem('user_id') });
        this.http.post(link, data)
            .subscribe(function (data) {
            _this.letestexpense = JSON.parse(data['_body']).response;
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
    /*get pocket balance*/
    /*    pocket_balance(){
          var link = 'http://www.vconnect.ml/api/exp_manage/my_expenses';
          var data = JSON.stringify({user_id: localStorage.getItem('user_id') });
    
          this.http.post(link, data)
          .subscribe(data => {
            this.letestexpense =  JSON.parse(data['_body']).response;
          }, error => {
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Connection time out',
              buttons: ['Dismiss']
            });
            alert.present();
          });
        }*/
    /*delete expense*/
    DashboardPage.prototype.delete_exp = function (exp_id) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Are you sure ?',
            message: '<b>You want to delete this expense.</b>',
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
                        var link = 'http://www.vconnect.ml/api/exp_manage/delete_expence';
                        var exp_trasaction = JSON.stringify({ user_id: localStorage.getItem('user_id'), expence_id: exp_id });
                        _this.http.post(link, exp_trasaction)
                            .subscribe(function (data) {
                            var delete_exp = JSON.parse(data['_body']).statusCode;
                            if (delete_exp == 200) {
                                var alert_3 = _this.alertCtrl.create({
                                    title: 'Success',
                                    subTitle: 'Expense deleted successfully !',
                                    buttons: ['ok']
                                });
                                alert_3.present();
                                _this.load();
                                _this.my_pocket();
                            }
                            else {
                                var alert_4 = _this.alertCtrl.create({
                                    title: 'Permission denied',
                                    subTitle: 'You donot have permission to delete this expense !',
                                    buttons: ['ok']
                                });
                                alert_4.present();
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
    };
    return DashboardPage;
}());
DashboardPage = __decorate([
    Component({
        selector: 'page-dashboard',
        templateUrl: 'dashboard.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        AlertController,
        LoadingController,
        ActionSheetController])
], DashboardPage);
export { DashboardPage };
//# sourceMappingURL=dashboard.js.map