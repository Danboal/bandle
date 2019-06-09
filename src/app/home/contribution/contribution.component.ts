import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.scss'],
})
export class ContributionComponent implements OnInit {

  plusClass: boolean = true;
  thumnailViewClass: boolean = false;
  thumnailUrl: string = "../../assets/plus.PNG";
  comments: Map<string,string>;
  contribution_data:{
    comment_count: number;
    comments: any;
    contribute_explain: string;
    contribute_genre: string;
    contributor: string;
    favorit_count: number;
    post_date: Date;
    title: string;
    url: string;
    view_count: number;
  } = {
    comment_count: 0,
    comments: [],
    contribute_explain: '',
    contribute_genre: '',
    contributor: '',
    favorit_count: 0,
    post_date: new Date(),
    title: '',
    url: '',
    view_count: 0
  }
  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {}

  thumnail(){
    this.presentPrompt();

  }
  private getThumnailImage(url): string{
    let videoCode = url.split('=');
    let generateUrl = 'http://img.youtube.com/vi/'+videoCode[1]+'/default.jpg';
    return generateUrl;
  }
  async presentPrompt() {
    const alert = await this.alertCtrl.create({
      header: 'コンテンツ選択',
      inputs: [
        {
          name: 'url',
          type: 'text',
          placeholder: 'URL'
        }
      ],
      message: 'YouTubeの動画URLを指定',
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '選択',
          handler:  data => {
            console.log('Confirm Ok');
            this.plusClass = false;
            this.thumnailViewClass = true;
            this.thumnailUrl = this.getThumnailImage(data.url);
            this.contribution_data.url = data.url;
          }
        }
      ],
      cssClass:'alertClass'
    });

    await alert.present();
  }
  async contribution(){
    let contribution_id = this.stringGen(3);
    this.contribution_data.contributor = '';
    await firebase.firestore().doc('contribution/' + contribution_id).set(this.contribution_data);

  }
  stringGen(len) {
    var text = "";
    
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < len; i++)
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    
    return text;
  }
}
