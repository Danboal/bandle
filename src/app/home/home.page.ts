import { Component, OnInit, ViewChild} from '@angular/core';
import {NavController, LoadingController, IonSlides, IonRefresher} from '@ionic/angular';
import * as firebase from 'firebase';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ContributionComponent } from './contribution/contribution.component';
import { RankingComponent } from './ranking/ranking.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonSlides) ionSlides: IonSlides;
  @ViewChild(IonRefresher) ionRefresher: IonRefresher;
  timelineSelectedClass: boolean = false;
  rankingSelectedClass: boolean = false;
  contributionSelectedClass: boolean = false;
  @ViewChild(ToolbarComponent) private toolbarComponent: ToolbarComponent;
  @ViewChild(TimelineComponent) private timelineComponent: TimelineComponent;
  @ViewChild(RankingComponent) private rankingComponent: RankingComponent;
  @ViewChild(ContributionComponent) private contributionComponent: ContributionComponent;
  myUserId: string;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public router: ActivatedRoute
    ) {
      loadingCtrl.dismiss(); 
    }
  ngAfterContentInit(){
    }
  ionViewDidEnter(){

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        
        this.timelineSelectedClass = true;
        this.rankingSelectedClass = false;
        this.contributionSelectedClass = false;
        document.getElementById("ion-footer").style.display = 'contents';
      } else {
        this.navCtrl.navigateRoot('signin');
        
      }
    });
  }
  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        
        this.timelineSelectedClass = true;
        this.rankingSelectedClass = false;
        this.contributionSelectedClass = false;
        document.getElementById("ion-footer").style.display = 'contents';

      } else {
        this.navCtrl.navigateRoot('signin');
        
      }
    });
  }
  async timeline(target) {
    this.ionRefresher.cancel();
    this.timelineSelectedClass = true;
        this.rankingSelectedClass = false;
        this.contributionSelectedClass = false;
        this.ionSlides.slideTo(0,500);
  }
  async ranking(target) {
    this.ionRefresher.cancel();
    this.timelineSelectedClass = false;
        this.rankingSelectedClass = true;
        this.contributionSelectedClass = false;
        this.ionSlides.slideTo(1,500);
  }
  async contribution(target) {
    this.ionRefresher.cancel();
    this.timelineSelectedClass = false;
        this.rankingSelectedClass = false;
        this.contributionSelectedClass = true;
        this.ionSlides.slideTo(2,500);
  }
  onSlideChangeStart(){
    this.ionRefresher.cancel();
    this.ionSlides.getActiveIndex().then(index =>
      {
        if(index == 0){
          this.timelineSelectedClass = true;
          this.rankingSelectedClass = false;
          this.contributionSelectedClass = false;
        } else if (index == 1) {
          this.timelineSelectedClass = false;
          this.rankingSelectedClass = true;
          this.contributionSelectedClass = false;
        } else if (index == 2){
          this.timelineSelectedClass = false;
          this.rankingSelectedClass = false;
          this.contributionSelectedClass = true;
        }
      }
    );

    }
    doRefresh(event) {
      this.ionSlides.getActiveIndex().then(index =>
        {
          if(index == 0){
            this.timelineComponent.timelineReload();
              setTimeout(() => {
              event.target.complete();
              }, 1000);
          } else {
            this.ionRefresher.cancel();
          }
        }
      );
      
    }
  }

