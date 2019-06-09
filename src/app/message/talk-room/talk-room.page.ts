import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController} from '@ionic/angular';
import * as firebase from 'Firebase';
@Component({
  selector: 'app-talk-room',
  templateUrl: './talk-room.page.html',
  styleUrls: ['./talk-room.page.scss'],
})
export class TalkRoomPage implements OnInit {
  roomkey: string;
  nickname: string;
  chatMessage: string;

  chats = [];
  offStatus = false;

  constructor(public navCtrl: NavController, public route: ActivatedRoute) { }

  ngOnInit() {
    document.getElementById("ion-footer").style.display = 'contents';
  }
  sendChatMessage(){
  }
}
