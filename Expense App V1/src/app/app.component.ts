import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,MenuController,AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Page1 } from '../pages/page1/page1';
/*import { DipositePage } from '../pages/diposite/diposite';*/
import { DashboardPage } from '../pages/dashboard/dashboard';
/*import { NewexpensePage } from '../pages/newexpense/newexpense';*/
import { VlinksPage } from '../pages/vlinks/vlinks';
import { ExpensesPage } from '../pages/expenses/expenses';
import { TransectionsPage } from '../pages/transections/transections';
import { CategoryPage } from '../pages/category/category';

@Component({
  templateUrl: 'app.html'
}) 
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pagesBeforeLogin: Array<{title: string, component: any,icon : any}>;
  pagesAfterLogin: Array<{title: string, component: any,icon : any}>;

  constructor(public platform: Platform,
    public menu: MenuController, public Alert : AlertController) {
    this.initializeApp();

    platform.ready().then(() => {
  this.hideSplashScreen();
});


    this.menu.enable(false, 'beforeMenu');
    this.menu.enable(false, 'afterMenu');

    // used for an example of ngFor and navigation
    this.pagesBeforeLogin = [
    { title: 'Login', component: Page1,icon : 'key' }
    ];
    this.pagesAfterLogin = [
    { title: 'Dashboard', component: DashboardPage ,icon : 'server' },
    { title: 'My Expense', component: ExpensesPage ,icon : 'inr' },
    { title: 'Transactions', component:TransectionsPage,icon : 'google-wallet' },   
    { title: 'Vlinks', component:VlinksPage,icon : 'envelope' },   
    { title: 'Category', component: CategoryPage ,icon : 'tags' }, 
    { title: 'Log Out', component: "" , icon : "power-off" }
    ];


  }




  initializeApp() {
    this.platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(localStorage.getItem('name')){
        this.rootPage = DashboardPage;
        this.menu.enable(true, 'afterMenu');
        this.menu.enable(false, 'beforeMenu');
      } else {
        this.rootPage = Page1;
        this.menu.enable(false, 'afterMenu');
        this.menu.enable(false, 'beforeMenu');
      }
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

/*  constructor(platform: Platform) {
platform.ready().then(() => {
  this.hideSplashScreen();
});
  }*/
  hideSplashScreen() {
if (Splashscreen) {
  setTimeout(() => {
    Splashscreen.hide();
  }, 100);
 }
}


  openPage(page) {
    if(page.component == ""){
     // console.log("logout");
      let confirm = this.Alert.create({
        title: 'Confirmation',
        message: '<b color="myheader">Are you sure you want to Log out?</b>',
        enableBackdropDismiss:false,
        buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            localStorage.clear();
            this.nav.setRoot(Page1);
            this.menu.enable(false, 'beforeMenu');
            this.menu.enable(false, 'afterMenu');
          }
        }
        ]
      });
      confirm.present(confirm);
    }else{
      this.nav.setRoot(page.component);
    }
  }
}
