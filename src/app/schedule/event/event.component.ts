import { Component, OnInit } from '@angular/core';
import { NavController ,ModalController ,NavParams} from '@ionic/angular';
import * as moment from 'moment';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit{

  event = { title: '',place:'',startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
  minDate = new Date().toISOString();
  //selectedDay = new Date();

  ngOnInit() {
    document.getElementById("ion-footer").style.display = 'contents';
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtr: ModalController) {
    let preselectedDate = this.navParams.data.selectedDay;
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }
 
  cancel() {
    this.modalCtr.dismiss();
  }
 
  save() {
    this.modalCtr.dismiss(this.event);
  }
}
