import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Expdetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-expdetails',
  templateUrl: 'expdetails.html'
})
export class ExpdetailsPage {
  amount : any;
  exp_date :any;
  exp_type :any; 
  comment :any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ExpdetailsPage');
    // console.log('UserId', this.navParams.get('userId'));
//      this.mydata = JSON.stringify();
       this.amount = this.navParams.get('amount');
       this.exp_date = this.navParams.get('exp_date');
       this.exp_type = this.navParams.get('exp_type');
       this.comment = this.navParams.get('comment');

      //alert(amount);
  }

  close_fn(){
  	this.navCtrl.pop();
  }


}
