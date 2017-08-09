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
import { NavController, MenuController, AlertController, Platform, LoadingController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
var VlinksPage = (function () {
    function VlinksPage(navCtrl, http, menu, alertCtrl, platform, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
    }
    /*   static get parameters() {
           return [[Platform], [NavController]];
       }*/
    VlinksPage.prototype.ionViewDidLoad = function () {
        this.scan();
    };
    VlinksPage.prototype.scan = function () {
        var _this = this;
        this.platform.ready().then(function () {
            cordova.plugins.barcodeScanner.scan(function (result) {
                var loader = _this.loadingCtrl.create({
                    content: "Connecting to Vconnect...",
                });
                loader.present();
                var link = 'http://www.vconnect.ml/login/qrlogin/';
                var data = JSON.stringify({ token: result.text, user_id: localStorage.getItem('user_id') });
                _this.http.post(link, data)
                    .subscribe(function (data) {
                    loader.dismiss();
                    navigator.vibrate(100);
                    var alert = _this.alertCtrl.create({
                        title: 'Success',
                        subTitle: 'Connected to Vlinks',
                        buttons: ['Dismiss']
                    });
                    alert.present();
                    _this.navCtrl.setRoot(DashboardPage);
                }, function (error) {
                    loader.dismiss();
                    var alert = _this.alertCtrl.create({
                        title: 'Error',
                        subTitle: 'Invalid Qr-Code',
                        buttons: ['Dismiss']
                    });
                    alert.present();
                    _this.navCtrl.setRoot(DashboardPage);
                });
            }, function (error) {
                alert("Scanning failed: " + error);
                _this.navCtrl.setRoot(DashboardPage);
            }, {
                prompt: "Visit www.vconnect.ml and scan the QR code",
            });
        });
    };
    return VlinksPage;
}());
VlinksPage = __decorate([
    Component({
        selector: 'page-vlinks',
        templateUrl: 'vlinks.html'
    }),
    __metadata("design:paramtypes", [NavController,
        Http,
        MenuController, AlertController, Platform, LoadingController])
], VlinksPage);
export { VlinksPage };
//# sourceMappingURL=vlinks.js.map