import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})

export class ToolbarComponent implements OnInit {

  homeSelectedClass: boolean = false;
  searchSelectedClass: boolean = false;
  messageSelectedClass: boolean = false;
  scheduleSelectedClass: boolean = false;
  configSelectedClass: boolean = false;
  myUserId: string = '';
  constructor(
    public navCtrl: NavController,
    private route: ActivatedRoute,
    public alertController: AlertController
    ) {
      this.homeSelectedClass = true;
      this.searchSelectedClass = false;
      this.messageSelectedClass = false;
      this.scheduleSelectedClass = false;
      this.configSelectedClass = false;
    }

  ngOnInit() {
    this.homeSelectedClass = true;
    this.searchSelectedClass = false;
    this.messageSelectedClass = false;
    this.scheduleSelectedClass = false;
    this.configSelectedClass = false;
  }
  setUserId(id){
    this.myUserId = id;
  }
  async timeline() {
    this.homeSelectedClass = true;
    this.searchSelectedClass = false;
    this.messageSelectedClass = false;
    this.scheduleSelectedClass = false;
    this.configSelectedClass = false;
    this.navCtrl.navigateRoot('home/'+this.myUserId);
  }
  async search() {
    this.homeSelectedClass = false;
    this.searchSelectedClass = true;
    this.messageSelectedClass = false;
    this.scheduleSelectedClass = false;
    this.configSelectedClass = false;
    this.navCtrl.navigateRoot('search/'+this.myUserId);
  }
  async message() {
    this.homeSelectedClass = false;
    this.searchSelectedClass = false;
    this.messageSelectedClass = true;
    this.scheduleSelectedClass = false;
    this.configSelectedClass = false;
    this.navCtrl.navigateRoot('message/'+this.myUserId);
  }
  async schedule() {
    this.homeSelectedClass = false;
    this.searchSelectedClass = false;
    this.messageSelectedClass = false;
    this.scheduleSelectedClass = true;
    this.configSelectedClass = false;
    this.navCtrl.navigateRoot('schedule/'+this.myUserId);
  }
  async config() {
    this.homeSelectedClass = false;
    this.searchSelectedClass = false;
    this.messageSelectedClass = false;
    this.scheduleSelectedClass = false;
    this.configSelectedClass = true;
    this.navCtrl.navigateRoot('config/'+this.myUserId);
  }
}
