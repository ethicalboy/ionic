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
/*import { Facebook, NativeStorage } from 'ionic-native';*/
import { DashboardPage } from '../dashboard/dashboard';
//REf http://www.nikola-breznjak.com/blog/javascript/ionic2/posting-data-from-ionic-2-app/
var Page1 = (function () {
    function Page1(navCtrl, http, menu, alertCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        //FB_APP_ID: number = 1355870647829294;
        this.login = {};
        this.submitted = false;
        // Facebook.browserInit(this.FB_APP_ID, "v2.8");
    }
    /*doFbLogin(){
       let permissions = new Array();
       let nav = this.navCtrl;
       //the permissions your facebook app needs from the user
       permissions = ["public_profile"];
   
   
       Facebook.login(permissions)
       .then(function(response){
         let userId = response.authResponse.userID;
         let params = new Array();
   
         //Getting name and gender properties
         Facebook.api("/me?fields=name,gender", params)
         .then(function(user) {
           user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
           //now we have the users info, let's save it in the NativeStorage
           NativeStorage.setItem('user',
           {
             name: user.name,
             gender: user.gender,
             picture: user.picture
           })
           .then(function(){
             nav.push(DashboardPage);
           }, function (error) {
             alert('error in function');
           })
         })
       }, function(error){
         alert(error);
       });
     }
   */
    Page1.prototype.onLoginClick = function (form) {
        var _this = this;
        this.submitted = true;
        if (form.valid) {
            var link = 'http://www.vconnect.ml/api/exp_user/login';
            var data1 = JSON.stringify(this.login);
            this.http.post(link, data1)
                .subscribe(function (data) {
                var userStatus = JSON.parse(data['_body']);
                var userdata = userStatus.response;
                localStorage.setItem("name", userdata.name);
                localStorage.setItem("email", userdata.email);
                localStorage.setItem("user_id", userdata.id);
                _this.menu.enable(true, 'afterMenu');
                _this.menu.enable(false, 'beforeMenu');
                _this.navCtrl.setRoot(DashboardPage);
            }, function (error) {
                var alert = _this.alertCtrl.create({
                    title: 'Server error',
                    subTitle: 'Internal error',
                    buttons: ['Dismiss']
                });
                alert.present();
            });
        }
    };
    return Page1;
}());
Page1 = __decorate([
    Component({
        selector: 'page-page1',
        templateUrl: 'page1.html'
    }),
    __metadata("design:paramtypes", [NavController,
        Http,
        MenuController, AlertController])
], Page1);
export { Page1 };
//# sourceMappingURL=page1.js.map