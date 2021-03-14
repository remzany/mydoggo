import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule, Storage } from '@ionic/storage';

import { SecureStorage} from '@ionic-native/secure-storage/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


import { TOKEN_KEY } from './services/api.service';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { Camera } from '@ionic-native/camera/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';

import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClient,
  HttpBackend
} from '@angular/common/http';
import { AuthConfigInterceptor } from './services/auth/authconfig.interceptor';

export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get(TOKEN_KEY);
    },
    whitelistedDomains: ['https://app.moj-ljubljencek.si'] // Add your Heroku URL in here!
  }
}

// TRANSLATION

import { TranslateModule, TranslateLoader, TranslateCompiler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {TranslateMessageFormatCompiler} from 'ngx-translate-messageformat-compiler';



export function translateHttpLoaderFactory(httpBackend: HttpBackend): TranslateHttpLoader {
  return new TranslateHttpLoader(new HttpClient(httpBackend));
}


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpBackend],
        useFactory: translateHttpLoaderFactory
    },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ],
  providers: [
    StatusBar,
    SplashScreen,
    SecureStorage,
    LocalNotifications,
    Camera,
    Calendar,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthConfigInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
