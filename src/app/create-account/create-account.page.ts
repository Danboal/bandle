import { Component, OnInit } from '@angular/core';
import { NavController, AlertController , LoadingController, NavParams} from '@ionic/angular';
import { PreloadAllModules, RouterModule, Router } from '@angular/router';
import * as firebase from 'firebase';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  logindata: { email: string, password: string } = { email: '', password: '' };
  authdata: {
    id:string
  } = {
    id: ''
  };
  solo_account_data: { 
    age: string,
    area: string,
    avator_url: string,
    email: string,
    favorit_genre: any,
    contribution: any,
    part: any,
    profile: string,
    sex: string,
    user_name: string
  } = { 
    age: '',
    area: '',
    avator_url: '',
    email: '',
    favorit_genre: [],
    contribution: [],
    part: [],
    profile: '',
    sex: '',
    user_name: ''
  };
  solo_account_id:string ='';
  loader = null;
  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public router: Router,
    public app: AppComponent
    ) { }
    async signUp() {
      //nullチェック
      if(this.logindata.email == '' || this.logindata.password == ''){
        const alert = await this.alertController.create({
          header: '警告',
          message: 'メールアドレスとパスワードを入力してください',
          buttons: ['OK']
        });
        alert.present();
        return;
      }
      try {
        this.presentLoading();
        this.solo_account_data.email = this.logindata.email;
        let solo_account_collection = this.app.firestore.collection("solo_account");
        let auth_collection = this.app.firestore.collection("auth");
        this.authdata.id = this.solo_account_id;
        solo_account_collection.doc(this.solo_account_id).set(this.solo_account_data);
        auth_collection.doc(this.logindata.email).set(this.authdata);
        await firebase.auth().createUserWithEmailAndPassword(this.logindata.email, this.logindata.password);
        this.navCtrl.navigateForward('home/'+this.solo_account_id);
      } catch (error) {
        let db = await firebase.firestore().doc('solo_account/'+this.solo_account_id);
        if(db !=null){
          db.delete();
        }
        const alert = await this.alertController.create({
          header: '警告',
          message: error.message,
          buttons: ['OK']
        });
        this.loadingCtrl.dismiss(); 
        alert.present();
      }
    }
    
    async presentLoading() {
      this.loader = await this.loadingCtrl.create({
        spinner: 'bubbles',
        message:'ロード中'
    });
      // ローディング画面を表示
      this.loader.present();
    }
  ngOnInit() {
    document.getElementById("ion-footer").style.display = 'none';
  }
  checkExistUserId(){

  }
}
