import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController,ActionSheetController } from 'ionic-angular';
import { Http } from '@angular/http';
import { NewexpensePage } from '../newexpense/newexpense';
import {link} from '../../providers/global';
/*
  Generated class for the Expenses page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	selector: 'page-expenses',
  	templateUrl: 'expenses.html'
  })
  export class ExpensesPage {
  	letestexpense:any;
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

  	ionViewDidLoad() {
      this.link=link.url;
  		this.load_expenses();
  	}
  	
  	load_expenses() {
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      loader.present();
      var link = this.link+'exp_manage/my_expenses';
      var data = JSON.stringify({user_id: localStorage.getItem('user_id') });

      this.http.post(link, data)
      .subscribe(data => {
        loader.dismiss();
        this.letestexpense = JSON.parse(data['_body']).response;
      }, error => {
        console.log("error!");
      });
    }


    /*new expense */
    add_new(){
      this.navCtrl.push(NewexpensePage);
    }

    /*pull to refresh*/
    doRefresh(refresher) {
      var link = this.link+'exp_manage/my_expenses';
      var data = JSON.stringify({user_id: localStorage.getItem('user_id') });

      this.http.post(link, data)
      .subscribe(data => {
        this.letestexpense =  JSON.parse(data['_body']).response;
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
              message: '<b>You want to delete this expense.</b>',
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
                  let confirm = this.alertCtrl.create({
                    title: 'Are you sure ?',
                    message: '<b>You want to delete this expense.</b>',
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
                        var link = this.link+'exp_manage/delete_expence';
                        var exp_trasaction = JSON.stringify({user_id: localStorage.getItem('user_id') , expence_id : exp_id });
                        this.http.post(link, exp_trasaction)
                        .subscribe(data => {
                          let delete_exp =  JSON.parse(data['_body']).statusCode;
                          if(delete_exp == 200) {
                            let alert = this.alertCtrl.create({
                              title: 'Success',
                              subTitle: 'Expense deleted successfully !',
                              buttons: ['ok']
                            });
                            alert.present();
                            this.load_expenses();
                          } else {
                            let alert = this.alertCtrl.create({
                              title: 'Permission denied',
                              subTitle: 'You donot have permission to delete this expense !',
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
