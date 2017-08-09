import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController,MenuController,AlertController,LoadingController,ActionSheetController} from 'ionic-angular';
import { NewcategoryPage } from '../newcategory/newcategory';
import {link} from '../../providers/global';

  @Component({
  	selector: 'page-category',
  	templateUrl: 'category.html'
  })

  export class CategoryPage {
     link : any;
      categorys:any;
  	constructor(
  		public navCtrl: NavController,
  		public http: Http,
  		public menu: MenuController,
  		private alertCtrl: AlertController,
      public loadingCtrl: LoadingController,
      public actionSheetCtrl: ActionSheetController
      ) {}
   
    ionViewDidLoad() {
       this.link=link.url;
      this.load();
    }
    /*my expenses*/
    load() {
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      loader.present();
      var link = this.link+'exp_manage/get_exp_type';
      var data = JSON.stringify({user_id: localStorage.getItem('user_id') });

      this.http.post(link, data)
      .subscribe(data => {
        this.categorys = JSON.parse(data['_body']).response;
        loader.dismiss();
      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Connection time out',
          buttons: ['Dismiss']
        });
        alert.present();
      });
    }
    /*add new category*/
    add_new()
    {
      this.navCtrl.push(NewcategoryPage);
    }
    
    /*pull to refresh */
    doRefresh(refresher) {
      var link = this.link+'exp_manage/get_exp_type';
      var data = JSON.stringify({user_id: localStorage.getItem('user_id') });

      this.http.post(link, data)
      .subscribe(data => {
        this.categorys = JSON.parse(data['_body']).response;
        refresher.complete();
      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Connection time out',
          buttons: ['Dismiss']
        });
        alert.present();
      });
    }

    /*Action icons */
    presentActionSheet(category,cat_id,time) {
      let actionSheet = this.actionSheetCtrl.create({
        title:category+" Added "+time,
        buttons: [
        {
          text: 'Delete',
          icon : 'md-trash',
          handler: () => {
            let confirm = this.alertCtrl.create({
              title: 'Are you sure ?',
              message: '<b>You want to delete this category.</b>',
              enableBackdropDismiss:false,
              buttons: [
              {
                text: 'No',
                handler: () => {

                }
              },
              {
                text: 'Yes',
                handler: () => {
                  var link = this.link+'exp_manage/delete_category';
                  var exp_trasaction = JSON.stringify({user_id: localStorage.getItem('user_id') , exp_type_id : cat_id });
                  console.log(exp_trasaction);
                  this.http.post(link, exp_trasaction)
                  .subscribe(data => {
                    let delete_exp =  JSON.parse(data['_body']).statusCode;
                    if(delete_exp == 200) {
                      let alert = this.alertCtrl.create({
                        title: 'Success',
                        subTitle: 'Category deleted successfully !',
                        buttons: ['ok']
                      });
                      alert.present();
                      this.load();
                    } else {
                      let alert = this.alertCtrl.create({
                        title: 'Permission denied',
                        subTitle: "You don't have permission to delete this category !",
                        buttons: ['ok']
                      });
                      alert.present();
                    }
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
              ]
            });
            confirm.present(confirm);
          }
        },
        {
          text: 'Archive',
          icon : 'archive',
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: 'Cancel',
          icon: 'md-close',
          handler: () => {

          }
        }
        ]
      });

      actionSheet.present();
    }

  }
