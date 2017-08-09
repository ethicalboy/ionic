import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import { CategoryPage } from '../category/category';
import {link} from '../../providers/global';

@Component({
  selector: 'page-newcategory',
  templateUrl: 'newcategory.html'
})
export class NewcategoryPage {
 link : any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http   : Http,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
    ) {}
  category_model = {exp_type : '',user_id : localStorage.getItem('user_id')};
  ionViewDidLoad() {
    this.link=link.url;
    //console.log('ionViewDidLoad NewcategoryPage');
  }
  /*add new expense*/
  new_category(expForm) { 
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    var link = this.link+'exp_manage/new_exp_type';
    var data = JSON.stringify(this.category_model);
    console.log(data);
    this.http.post(link, data)
    .subscribe(data => {
      
      let alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: 'New category added',
        buttons: ['Dismiss']
      });
      alert.present();
      loader.dismiss();
      this.navCtrl.pop(this);
      this.navCtrl.setRoot(CategoryPage);

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
