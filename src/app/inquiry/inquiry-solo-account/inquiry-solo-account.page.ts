import { Component, OnInit, ViewChild } from '@angular/core';
import {NavController, LoadingController, IonSlides, IonRefresher} from '@ionic/angular';
@Component({
  selector: 'app-inquiry-solo-account',
  templateUrl: './inquiry-solo-account.page.html',
  styleUrls: ['./inquiry-solo-account.page.scss'],
})
export class InquirySoloAccountPage implements OnInit {
  @ViewChild(IonSlides) ionSlides: IonSlides;
  profileSelectedClass: boolean = false;
  bandContributeSelectedClass: boolean = false;
  memberSelectedClass: boolean = false;
  scheduleSelectedClass: boolean = false;
  eventSource = [];
  
  date: Date = new Date();
  viewTitle: string;
  selectedDay = new Date();
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  constructor() { }

  ngOnInit() {
    document.getElementById("ion-footer").style.display = 'contents';
  }
  profile(){
    this.profileSelectedClass = true;
        this.bandContributeSelectedClass = false;
        this.memberSelectedClass = false;
        this.scheduleSelectedClass = false;
        this.ionSlides.slideTo(0,500);
  }
  bandContribute(){
    this.profileSelectedClass = false;
        this.bandContributeSelectedClass = true;
        this.memberSelectedClass = false;
        this.scheduleSelectedClass = false;
        this.ionSlides.slideTo(1,500);
  }
  member(){
    this.profileSelectedClass = false;
        this.bandContributeSelectedClass = false;
        this.memberSelectedClass = true;
        this.scheduleSelectedClass = false;
        this.ionSlides.slideTo(2,500);
  }
  schedule(){
    this.profileSelectedClass = false;
        this.bandContributeSelectedClass = false;
        this.memberSelectedClass = false;
        this.scheduleSelectedClass = true;
        this.ionSlides.slideTo(3,500);
  }
  onSlideChangeStart(){
    this.ionSlides.getActiveIndex().then(index =>
      {
        if(index == 0){
          this.profileSelectedClass = true;
        this.bandContributeSelectedClass = false;
        this.memberSelectedClass = false;
        this.scheduleSelectedClass = false;
        } else if (index == 1) {
          this.profileSelectedClass = false;
        this.bandContributeSelectedClass = true;
        this.memberSelectedClass = false;
        this.scheduleSelectedClass = false;
        } else if (index == 2){
          this.profileSelectedClass = false;
        this.bandContributeSelectedClass = false;
        this.memberSelectedClass = true;
        this.scheduleSelectedClass = false;
        } else if(index == 3){
          this.profileSelectedClass = false;
        this.bandContributeSelectedClass = false;
        this.memberSelectedClass = false;
        this.scheduleSelectedClass = true;
        }
      }
    );
  }
}
