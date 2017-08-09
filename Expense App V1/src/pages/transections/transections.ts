import { Component } from '@angular/core';
import { NavController,ActionSheetController,NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { DipositePage } from '../diposite/diposite';
import {link} from '../../providers/global';
/*
  Generated class for the Transections page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    selector: 'page-transections',
    templateUrl: 'transections.html'
  })
  export class TransectionsPage {

    recent_transection:any;
 link : any;
    constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public http   : Http,
      private alertCtrl: AlertController,
      public loadingCtrl: LoadingController,
       public actionSheetCtrl: ActionSheetController
      ) {
    }
    ionViewWillEnter()
    {
      this.link=link.url;
      this.load();
    }


    load() {
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      loader.present();
      var link = this.link+'exp_pocket/my_transections';
      var data = JSON.stringify({user_id: localStorage.getItem('user_id') });

      this.http.post(link, data)
      .subscribe(data => {
        loader.dismiss();
        this.recent_transection = JSON.parse(data['_body']).response;
      }, error => {
        console.log("error!");
      });
    }
    /*add cash nav loader*/
    add_new() {
      this.navCtrl.push(DipositePage);
    }

    /*pull to refresh */
    doRefresh(refresher) {
      var link = this.link+'exp_pocket/my_transections';
      var data = JSON.stringify({user_id: localStorage.getItem('user_id') });

      this.http.post(link, data)
      .subscribe(data => {
        this.recent_transection = JSON.parse(data['_body']).response;
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
    presentActionSheet(exp_type,exp_id,time) {
      let actionSheet = this.actionSheetCtrl.create({
        title:exp_type+" Added "+time,
        buttons: [
        {
          text: 'Delete',
          icon : 'md-trash',
          handler: () => {
            let confirm = this.alertCtrl.create({
              title: 'Are you sure ?',
              message: '<b>You want to delete this transection.</b>',
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
                  var link = this.link+'exp_pocket/delete_diposite';
                  var exp_trasaction = JSON.stringify({user_id: localStorage.getItem('user_id') , diposite_id : exp_id });
                  this.http.post(link, exp_trasaction)
                  .subscribe(data => {
                    let delete_exp =  JSON.parse(data['_body']).statusCode;
                    if(delete_exp == 200) {
                      let alert = this.alertCtrl.create({
                        title: 'Success',
                        subTitle: 'Transection deleted successfully !',
                        buttons: ['ok']
                      });
                      alert.present();
                      this.load();
                    } else {
                      let alert = this.alertCtrl.create({
                        title: 'Permission denied',
                        subTitle: "You don't have permission to delete this transaction !",
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