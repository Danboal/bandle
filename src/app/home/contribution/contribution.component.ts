import { Component, OnInit ,Input,forwardRef} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AppComponent } from '../../app.component';
import { ActivatedRoute } from '@angular/router';

export const CUSTOM_SELECTOR_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => ContributionComponent),
};
@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.scss'],
  providers: [CUSTOM_SELECTOR_CONTROL_VALUE_ACCESSOR],
})
export class ContributionComponent implements OnInit ,ControlValueAccessor{
  private _onTouched: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};
  plusClass: boolean = true;
  thumnailViewClass: boolean = false;
  thumnailUrl: string = "../../assets/plus.PNG";
  myUserId: string = '';
  comments: Map<string,string>;
  @Input('title') _title:string = '';
  @Input('genre') _genre:string = '';
  @Input('explain') _explain:string = '';
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
  constructor(
    private alertCtrl: AlertController,
    public app: AppComponent,
    public router: ActivatedRoute
    ) { }

  ngOnInit() {
    this.myUserId = this.router.snapshot.paramMap.get('id') as string;
  }

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
  contribution(){
    this.contribution_data.title = $('.contribution_title').val();
    this.contribution_data.contribute_genre = $('.contribution_genre').val();
    this.contribution_data.contribute_explain = $('.contribution_genre').val();
    let contribution_id = this.stringGen(20);
    this.contribution_data.contributor = this.myUserId;
    let contribution = this.app.firestore.collection("contribution");
    contribution.doc(contribution_id).set(this.contribution_data);
    this.getSoloAccountContribution(contribution_id );

  }
  async getSoloAccountContribution( contribution_id) {
    let solo_account = this.app.firestore.collection("solo_account");
    let doc = solo_account.doc(this.myUserId);
    let array:any;
    await doc.get().then(function(data){
      if (data.exists) {
        data = data.data();
        array = data.contribution;
        array.push(contribution_id);
        doc.update({contribution: array});
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    });
    
    
  }
  stringGen(len) {
    var text = "";
    
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < len; i++)
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    
    return text;
  }
  public setUserId(id){
    this.myUserId = id;
  }
  //@Input('title')
  set title(text: string) {
    if (this._title !== text) {
      this._title = text;
      this.onChangeCallback(text);
    }
  }
  get title() {
    return this._title;
  }
  //@Input('genre')
  set genre(text: string) {
    if (this._genre !== text) {
      this._genre = text;
      this.onChangeCallback(text);
    }
  }
  get genre() {
    return this._genre;
  }
  //@Input('title')
  set explain(text: string) {
    if (this._explain !== text) {
      this._explain = text;
      this.onChangeCallback(text);
    }
  }
  get explain() {
    return this._explain;
  }
  writeValue(text: string): void {
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => {} ): void {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {}

}
