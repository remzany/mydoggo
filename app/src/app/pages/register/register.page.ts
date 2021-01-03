import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentials = {
    username: '',
    email: '',
    password: ''
  };

  hiddenEmailError:boolean = true;
  hiddenUsernameError:boolean = true;
  passwordError:boolean = true;
  hiddenConfirmPasswordError:boolean = true;
 
  constructor(
    private api: ApiService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}
 
  ngOnInit() { }
 
  async register() {
    const loading = await this.loadingCtrl.create();
    loading.present();

    this.api.register(this.credentials).pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(res => {
      this.api.logout();
    }, async err => {
      const alert = await this.alertCtrl.create({
        header: 'Registration failed',
        message: err.error['msg'],
        buttons: ['OK']
      });
      await alert.present();
    });
  }

  regexEmail(x:string){
    this.hiddenEmailError = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$').test(x);
  }

  regexPassword(x:string){
    this.passwordError = this.rankPassword(x);
  }

  regexUsername(x:string){
    this.hiddenUsernameError = x.length >= 5 ? true : false

  }

  regexConfirmPassword(ev:any){
    this.hiddenConfirmPasswordError = this.credentials.password == ev.target.value ? true : false; 
    console.log(this.hiddenConfirmPasswordError);
  }

  rankPassword(password) {
    var upper = /[A-Z]/,
        lower = /[a-z]/,
        number = /[0-9]/,
        special = /[^A-Za-z0-9]/,
        minLength = 8,
        score = 0;



    // Increment the score for each of these conditions
    if (upper.test(password)) score++;
    if (lower.test(password)) score++;
    if (number.test(password)) score++;
    if (special.test(password)) score++;

    // Penalize if there aren't at least three char types
    if (score < 3) score--;

    if (password.length > minLength) {
        // Increment the score for every 2 chars longer than the minimum
        score += Math.floor((password.length - minLength) / 2);
    }

    return score > 3 ? true : false;

  }
}
