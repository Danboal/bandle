import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import * as firebase from 'firebase';
@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
  bandTabSelectedClass: boolean = true;
  soloTabSelectedClass: boolean = false;

  bandAccountClass: boolean = false;
  soloAccountClass: boolean = false;
  constructor(public navCtrl: NavController ) { 

  }

  ngOnInit() {
    this.bandAccountClass = true;
    this.soloAccountClass = false;
    document.getElementById("ion-footer").style.display = 'contents';
  }
  bandTab(){
    this.bandTabSelectedClass = true;
    this.soloTabSelectedClass = false;
    this.bandAccountClass = true;
    this.soloAccountClass = false;
  }
  soloTab(){
    this.bandTabSelectedClass = false;
    this.soloTabSelectedClass = true;
    this.bandAccountClass = false;
    this.soloAccountClass = true;
    
  }
  inquirySoloAccount(){
    this.navCtrl.navigateForward('inquiry-solo-account');
  }
  async sighnout(){
    try {
      await firebase.auth().signOut();
      this.navCtrl.navigateRoot('signin');

    } catch (error) {}
  }
  inquiryBandAccount(){
    this.navCtrl.navigateForward('inquiry-band-account');
  }
}
