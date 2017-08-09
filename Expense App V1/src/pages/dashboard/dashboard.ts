import { Component } from '@angular/core';
import { NavController,ActionSheetController,ModalController, NavParams,AlertController,LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import { NewexpensePage } from '../newexpense/newexpense';
import { ExpdetailsPage } from '../expdetails/expdetails';
import {link} from '../../providers/global';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',  
})
export class DashboardPage {

  letestexpense:any;
  expenseinfo : any;
  count 
  liveurl = link.host; 
    /* my_pocket_balance = {};
    */
    link : any;
    constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public http   : Http,
      private alertCtrl: AlertController,
      public loadingCtrl: LoadingController,
      public actionSheetCtrl: ActionSheetController,
      public modalCtrl: ModalController
      ) {
      //alert(link.url);
      this.link=link.url;
    }
    ionicViewbeforeEnter(){
      this.my_pocket();
    }

    ionViewWillEnter()
    {   
      this.load();

      this.my_pocket();
    }
    myDate = new Date().toISOString();
    /*pocket balance*/
    my_pocket() { 
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      loader.present();
      var link = this.link+'exp_pocket/my_pocket';
      var data = JSON.stringify({user_id: localStorage.getItem('user_id') });

      this.http.post(link, data)
      .subscribe(data => {
        loader.dismiss();
        this.count  = JSON.parse(data['_body']).response;
      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Connection time out',
          buttons: ['Dismiss']
        });
        alert.present();
      });
    }
    
    /*test*/
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
                      this.load();
                      this.my_pocket();
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

    /*my expenses*/
    load() {
      var link = this.link +'exp_manage/my_expenses';
      var data = JSON.stringify({user_id: localStorage.getItem('user_id') });

      this.http.post(link, data)
      .subscribe(data => {
        this.letestexpense =  JSON.parse(data['_body']).response;
      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Connection time out',
          buttons: ['Dismiss']
        });
        alert.present();
      });
    }

    /*open category page*/
    add_new(){
      this.navCtrl.push(NewexpensePage);
    }

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




    /*get pocket balance*/
/*    pocket_balance(){
      var link = 'http://www.vconnect.ml/api/exp_manage/my_expenses';
      var data = JSON.stringify({user_id: localStorage.getItem('user_id') });

      this.http.post(link, data)
      .subscribe(data => {
        this.letestexpense =  JSON.parse(data['_body']).response;
      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Connection time out',
          buttons: ['Dismiss']
        });
        alert.present();
      });
    }*/
    /*delete expense*/
    delete_exp(exp_id){
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
                this.load();
                this.my_pocket();
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


    /*view details*/
    viewexpenseinfo(exp_id) {
      var link = this.link +'exp_manage/get_exp_info';
      var data = JSON.stringify({exp_id: exp_id });

      this.http.post(link, data)
      .subscribe(data => {
        this.expenseinfo =  JSON.parse(data['_body']).response;
       // console.log(this.expenseinfo.amount);

        let profileModal = this.modalCtrl.create(ExpdetailsPage, { 
          amount: this.expenseinfo.amount,
          exp_date: this.expenseinfo.exp_date ,
          exp_type: this.expenseinfo.exp_type,
          comment: this.expenseinfo.comment 
        //  expensedetail : this.expenseinfo
        });
        profileModal.present();
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
