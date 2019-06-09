import { Component, OnInit} from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { EventComponent} from './event/event.component';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  eventSource = [];
  
  date: Date = new Date();
  viewTitle: string;
  selectedDay = new Date();
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) { }
  ngOnInit() {
    moment().locale("ja");
    document.getElementById("ion-footer").style.display = 'contents';
  }
  async addEvent() {
    let date = this.selectedDay.toISOString();
    let modal = await this.modalCtrl.create({
      component:EventComponent, 
      componentProps:{
        selectedDay: date
      }
    });

    modal.present();
    modal.onDidDismiss().then((detail) => {
      if (detail.data) {
        let eventData = detail.data;
        eventData.startTime = new Date(detail.data.startTime);
        eventData.endTime = new Date(detail.data.endTime);
        eventData.title = detail.data.title;
        eventData.place = detail.data.place;
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }
  onViewTitleChanged(title) {
    this.viewTitle = moment(title).format("YYYY年MM月");
    console.log(moment(this.viewTitle).format("YYYY年MM月"));
  }
 
  async onEventSelected(event) {
    
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    
    let alert = await this.alertCtrl.create({
      header: '' + event.title,
      subHeader: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }
 
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
}
