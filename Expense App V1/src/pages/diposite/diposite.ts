import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController,MenuController,AlertController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import {link} from '../../providers/global';
/*
  Generated class for the Diposite page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	selector: 'page-diposite',
  	templateUrl: 'diposite.html'
  })
  export class DipositePage {
  	submitted = false;
    link : any;
  	constructor(
  		public navCtrl: NavController,
  		public http: Http,
  		public menu: MenuController,
  		private alertCtrl: AlertController
  		) {}
    add_cash = {amount : "",comment : "",user_id:localStorage.getItem('user_id'),transection_date:new Date().toISOString()};
    ionViewDidLoad() {
       this.link=link.url;
    }
    
    /*add cash*/
    add_money(dipositeForm) {
      if (dipositeForm.valid) {
        var link = this.link+'exp_pocket/add_money';
        var data1 = JSON.stringify(this.add_cash);
        this.http.post(link, data1)
        .subscribe(data => {
          let alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'Cash added',
            buttons: ['Dismiss']
          });
          alert.present();
          this.navCtrl.setRoot(DashboardPage);
        }, error => {
          let alert = this.alertCtrl.create({
            title: 'Server error',
            subTitle: 'Internal error occured',
            buttons: ['Dismiss']
          });
          alert.present();
        });
      }
    }
  }
