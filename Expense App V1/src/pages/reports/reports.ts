import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Reports page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {

  	letestexpense:any;

  	constructor(
  		public navCtrl: NavController,
  	 	public navParams: NavParams,
  	 	public http   : Http
  	 	) {
  	}
  	ionViewWillEnter()
  	{
  		this.load();
  	}


  	load() {
  		var link = 'http://www.vconnect.ml/api/exp_manage/my_expenses';
  		var data = JSON.stringify({user_id: 1 });

  		this.http.post(link, data)
  		.subscribe(data => {
  				 this.letestexpense = JSON.parse(data['_body']).response;
  				console.log(this.letestexpense);
  		}, error => {
  			console.log("Oooops!");
  		});
  	}
  }