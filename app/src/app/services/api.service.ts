import { environment } from './../../environments/environment';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from, Subject, Observer } from 'rxjs';
import { take, map, switchMap, delay, tap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
 import {Diagnose} from '../interfaces/diagnose.interface';

const helper = new JwtHelperService();
export const TOKEN_KEY = 'jwt-token';

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  bio: string;
  createdAt: string;
  _id: string;
  expanded?: boolean;
  dogName?: string;
  dogBreed?: string;
  todos?: Array<string>;
}



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public user: Observable<any>;
  private userData = new BehaviorSubject(null);

  observer: Observer<any>;
 
  constructor(private storage: Storage, private http: HttpClient, private plt: Platform, private router: Router) { 
    this.loadStoredToken();  
  }
 
  loadStoredToken() {
    let platformObs = from(this.plt.ready());
 
    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY));
      }),
      map(token => {
        if (token) {
          let decoded = helper.decodeToken(token); 
          this.userData.next(decoded);
          return true;
        } else {
          return null;
        }
      })
    );
  }
 
  login(credentials: {email: string, password: string }) {
    return this.http.post(`${environment.apiUrl}/auth`, credentials).pipe(
      take(1),
      map(res => {
        // Extract the JWT
        return res['token'];
      }),
      switchMap(token => {
        let decoded = helper.decodeToken(token);
        this.userData.next(decoded);
 
        let storageObs = from(this.storage.set(TOKEN_KEY, token));
        return storageObs;
      })
    );
  }
 
  register(credentials: {email: string, password: string }) {
    return this.http.post(`${environment.apiUrl}/users`, credentials).pipe(
      take(1),
      switchMap(res => {
        console.log('result: ', res);
        return this.login(credentials);
      })
    );
  }

  getUserToken() {
    return this.userData.getValue();
  }

  getUserData() {
    const id = this.getUserToken()['id'];
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`).pipe(
      tap(data => {
        return data
      })
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
      tap(data => {
        return data
      })
    );
  }

  updateUser(id, data) {
    return this.http.put(`${environment.apiUrl}/users/${id}`, data).pipe(
      take(1)
    );
  }

  removeUser(id) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`).pipe(
      take(1)
    );
  }
 
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/');
      this.userData.next(null);
    });
  }

  
  getBreed(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${environment.apiUrl}/breed`).pipe(
      take(1)
    );
  }

  getAllDiagnoses(): Observable<Diagnose>{
    return this.http.get<Diagnose>(`${environment.apiUrl}/diagnose/`).pipe(
      tap(data => {
        return data;
      })
    );

  }

  getDiagnose(): Observable<Diagnose>{
    let id:string = "American-Pit-Bull-Terrier";
    
    return this.http.get<Diagnose>(`${environment.apiUrl}/diagnose/${id}`).pipe(
      take(1)
    );
  }


  createDiagnose(title:string, description:string, tag:string, comments: Array<string>, likeArray: Array<string>, likeCount:number): Observable<Diagnose>{
    let data = {
      "title": title,
      "description" : description,
      "tag": tag,
      "comments" : comments,
      "likeArray" : likeArray,
      "likeCount" : likeCount,
      "ownership": this.getUserToken()['id']
    };


    return this.http.post<Diagnose>(`${environment.apiUrl}/diagnose`, data).pipe(
      take(1)
    );
  }
 
}