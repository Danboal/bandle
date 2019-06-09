import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController} from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  data: { email: string, password: string } = { email: '', password: '' };
  auth_id:string;
  loader = null;
  resetmailAddress: string;
  constructor(public navCtrl: NavController,
    public alertController: AlertController,
     public loadingCtrl: LoadingController,
     public router: Router
    ) {}
    
    async signIn() {
      try {
        this.presentLoading(); 
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.data.email, this.data.password);
        var ref=await firebase.firestore().doc('auth/'+this.data.email).get();
        console.log('data:'+ref.get('id'));
        this.auth_id = ref.get('id') as string;
        this.navCtrl.navigateForward('home/'+this.auth_id);
  
      } catch (error) {
        const alert = await this.alertController.create({
          header: 'エラー',
          message: '入力に誤りがあります',
          buttons: ['OK']
        });
        this.loadingCtrl.dismiss(); 
        alert.present();
      }
    }
    signUp() {
      this.navCtrl.navigateForward('create-account');
    }
    async presentLoading() {
      this.loader = await this.loadingCtrl.create({
        spinner: 'bubbles',
        message:'ロード中',
        cssClass: 'loading-class'
    });
      // ローディング画面を表示
      this.loader.present();
    }
    async resetPassword() {
      const alert = await this.alertController.create({
        header: 'パスワードをリセットします',
        inputs: [
          {
            name: 'email',
            type: 'text',
            placeholder: 'メールアドレス'
          }
        ],
        message: '新しいパスワードを送信するメールアドレスを指定して下さい',
        buttons: [
          {
            text: 'キャンセル',
            role: 'cancel',
            handler: () => {
              console.log('reset mail Cancel');
            }
          }, {
            text: '選択',
            handler:  data => {
              console.log('reset mail sending');
              this.resetmailAddress = data.email;
            }
          }
        ],
        cssClass:'alertClass'
      });
  
      await alert.present();
    }
  ngOnInit() {
    document.getElementById("ion-footer").style.display = 'none';
  }

}
