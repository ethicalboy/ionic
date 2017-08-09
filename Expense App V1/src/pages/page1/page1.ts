import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController,MenuController,AlertController } from 'ionic-angular';
/*import { Facebook, NativeStorage } from 'ionic-native';*/
import { DashboardPage } from '../dashboard/dashboard';
import {link} from '../../providers/global';



//REf http://www.nikola-breznjak.com/blog/javascript/ionic2/posting-data-from-ionic-2-app/

@Component({
	selector: 'page-page1',
	templateUrl: 'page1.html'
})
export class Page1 {

  //FB_APP_ID: number = 1355870647829294;
	login: {username?: string, password?: string} = {};
	submitted = false;
 link : any;
	constructor(public navCtrl: NavController,
		public http: Http,
		public menu: MenuController,private alertCtrl: AlertController) {
		// Facebook.browserInit(this.FB_APP_ID, "v2.8");
		this.link=link.url;
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
	onLoginClick(form)
	{
		this.submitted = true;

		if (form.valid) {
			var link = this.link+'exp_user/login';
			var data1 = JSON.stringify(this.login);
			this.http.post(link, data1)
			.subscribe(data => {
				let userStatus = JSON.parse(data['_body']);
				let userdata =userStatus.response 
				localStorage.setItem("name",userdata.name);
				localStorage.setItem("email",userdata.email);
				localStorage.setItem("user_id",userdata.id);
				this.menu.enable(true, 'afterMenu');
				this.menu.enable(false, 'beforeMenu');
				this.navCtrl.setRoot(DashboardPage);
			}, error => {
				let alert = this.alertCtrl.create({
					title: 'Server error',
					subTitle: 'Internal error',
					buttons: ['Dismiss']
				});
				alert.present();
			});
		}
	}
}
