import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';


import { TranslateConfigService } from '../../services/translate-config.service';
import {TranslateService} from '@ngx-translate/core';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials = {
    email: 'marusa@marusa.com',
    password: 'marusa'
  };
 
  constructor(
    private api: ApiService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private translateConfigService: TranslateConfigService,
    private translate:TranslateService
  ) {}
 
  ngOnInit() {
    this.translateConfigService.getDefaultLanguage();
   }
 
  async login() {
    const loading = await this.loadingCtrl.create();
    loading.present();

    this.api.login(this.credentials).pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(res => {
      if (res) {
        this.router.navigateByUrl('/tabs');
      }
    }, async err => {

      let x = "LOGIN." + err.error['msg'];

      const alert = await this.alertCtrl.create({
        header: this.translate.instant('LOGIN.login_label'),
        message: this.translate.instant(x),
        buttons: ['OK']
      });
      await alert.present();
    });
  }
}
