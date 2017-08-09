import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController,MenuController,AlertController,Platform,LoadingController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import {link} from '../../providers/global';
declare var cordova:any;


@Component({
	selector: 'page-vlinks',
	templateUrl: 'vlinks.html'
})
export class VlinksPage {
     scanurlqr : any;
	constructor(public navCtrl: NavController,
		public http: Http,
		public menu: MenuController,private alertCtrl: AlertController,public platform: Platform, public loadingCtrl: LoadingController) {

	}
 /*   static get parameters() {
        return [[Platform], [NavController]];
    }*/

    
    ionViewDidLoad() {
        this.scanurlqr=link.scan_url;
    	this.scan();
    }

    scan() {
    	this.platform.ready().then(() => {
    		cordova.plugins.barcodeScanner.scan(
    			(result) => {
                    let loader = this.loadingCtrl.create({
                        content: "Connecting to Vconnect...",
                    });
                    loader.present();
                    var link = this.scanurlqr+'login/qrlogin/';
                    var data = JSON.stringify({token:result.text,user_id: localStorage.getItem('user_id')});
                    this.http.post(link, data)
                    .subscribe(data => {
                        loader.dismiss();
                        navigator.vibrate(100);
                        let alert = this.alertCtrl.create({
                            title: 'Success',
                            subTitle: 'Connected to Vlinks',
                            buttons: ['Dismiss']
                        });
                        alert.present();
                        this.navCtrl.setRoot(DashboardPage);
                    }, error => {
                        loader.dismiss();
                        let alert = this.alertCtrl.create({
                            title: 'Error',
                            subTitle: 'Invalid Qr-Code',
                            buttons: ['Dismiss']
                        });
                        alert.present();
                        this.navCtrl.setRoot(DashboardPage);
                    });

                }, 
                (error) => {
                    alert("Scanning failed: " + error);
                    this.navCtrl.setRoot(DashboardPage);
                },
                {
                    prompt : "Visit www.sitewithqr.com and scan the QR code", // Android
                }
                );

    	});
    }
}
