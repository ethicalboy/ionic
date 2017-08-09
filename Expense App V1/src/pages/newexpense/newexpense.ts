import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import { ExpensesPage } from '../expenses/expenses';
import {link} from '../../providers/global';
@Component({
	selector: 'page-newexpense',
	templateUrl: 'newexpense.html'
})
export class NewexpensePage {
 link : any;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public http   : Http,
		private alertCtrl: AlertController,
		public loadingCtrl: LoadingController
		) {}
	categorys : any;
	add_exp = {expid : "",comment : "",amount : "",user_id:localStorage.getItem('user_id'),exp_date: new Date().toISOString()};
	ionViewDidLoad() {
		this.link=link.url;
		this.load();
	}
	/*load category*/
	load() { 
		let loader = this.loadingCtrl.create({
			content: "Please wait...",
		});
		loader.present();
		var link = this.link+'exp_manage/get_exp_type';
		var data = JSON.stringify({user_id: localStorage.getItem('user_id') });
		this.http.post(link, data)
		.subscribe(data => {
			loader.dismiss();
			this.categorys  = JSON.parse(data['_body']).response;
		}, error => {
			let alert = this.alertCtrl.create({
				title: 'Error',
				subTitle: 'Connection time out',
				buttons: ['Dismiss']
			});
			alert.present();
		});
	}  

	/*add new expense*/
	new_expense(expForm) { 
		let loader = this.loadingCtrl.create({
			content: "Please wait...",
		});
		loader.present();
		var link = this.link+'exp_manage/exp_new';
		var data = JSON.stringify(this.add_exp);
		console.log(data);
		this.http.post(link, data)
		.subscribe(data => {
			loader.dismiss();
			let alert = this.alertCtrl.create({
				title: 'Success',
				subTitle: 'New expense added',
				buttons: ['Dismiss']
			});
			alert.present();
			this.navCtrl.pop(this);
			this.navCtrl.setRoot(ExpensesPage);

		}, error => {
			let alert = this.alertCtrl.create({
				title: 'Error',
				subTitle: 'Connection time out',
				buttons: ['Dismiss']
			});
			alert.present();
		});
	}
}
