import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class ConstantData {
  
  WEB_SERVICE_URL = 'http://localhost/vlinks_exp/index.php/';


  constructor(
    public events: Events,
    public storage: Storage
  ) {

  }

}
