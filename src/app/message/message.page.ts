import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  bandTabSelectedClass: boolean = false;
  soloTabSelectedClass: boolean = false;
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    this.bandTabSelectedClass = true;
    this.soloTabSelectedClass = false;
    document.getElementById("ion-footer").style.display = 'contents';
  }
  bandTab(){
    this.bandTabSelectedClass = true;
    this.soloTabSelectedClass = false;
  }
  soloTab(){
    this.bandTabSelectedClass = false;
    this.soloTabSelectedClass = true;
  }
  joinRoom(){
    this.navCtrl.navigateForward('talk-room');
  }
}
