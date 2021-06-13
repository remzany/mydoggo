import { environment } from './../../environments/environment';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from} from 'rxjs';
import { take, map, switchMap, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders} from '@angular/common/http';
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
  private fullToken = '';

  constructor(private storage: Storage, private http: HttpClient, private platform: Platform, private router: Router) { 
    this.loadStoredToken();
  }

  loadStoredToken() {
    const platformObs = from(this.platform.ready());

    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY));
      }),
      map(token => {
        if (token) {
          this.fullToken = token;
          const decoded = helper.decodeToken(token);
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
 
  register(credentials: {email: string, password: string, username:string }) {
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

    return this.http.get<User>(`${environment.apiUrl}/users/${id}`,
     { headers: new HttpHeaders({Authorization: 'Bearer ' + this.fullToken})}).pipe(
      tap(data => {
        return data
      })
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`,
    { headers: new HttpHeaders({Authorization: 'Bearer ' + this.fullToken})}).pipe(
      tap(data => {
        return data
      })
    );
  }

  updateUser(id, data) {
    return this.http.put(`${environment.apiUrl}/users/${id}`, data,
    { headers: new HttpHeaders({Authorization: 'Bearer ' + this.fullToken})}).pipe(
      take(1)
    );
  }

  removeUser(id) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`,
    { headers: new HttpHeaders({Authorization: 'Bearer ' + this.fullToken})}).pipe(
      take(1)
    );
  }
 
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('');
      this.userData.next(null);
    });
  }

  
  getBreed(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${environment.apiUrl}/breed`,
    { headers: new HttpHeaders({Authorization: 'Bearer ' + this.fullToken})}).pipe(
      take(1)
    );
  }

  getAllDiagnoses(): Observable<Array<Diagnose>>{
    return this.http.get<Array<Diagnose>>(`${environment.apiUrl}/diagnose/`,
    { headers: new HttpHeaders({Authorization: 'Bearer ' + this.fullToken})}).pipe(
      tap(data => {
        console.log(data);
        return data;
      })
    );
  }

  getDiagnose(): Observable<Diagnose>{
    let id:string = "American-Pit-Bull-Terrier";
    
    return this.http.get<Diagnose>(`${environment.apiUrl}/diagnose/${id}`,
    { headers: new HttpHeaders({Authorization: 'Bearer ' + this.fullToken})}).pipe(
      take(1)
    );
  }


  createDiagnose(title:string, description:string, tag:string, image?:string): Observable<Diagnose>{
    let data = {
      "title": title,
      "description" : description,
      "tag": tag,
      "likeArray" : this.getUserToken()['id'],
      "ownership": this.getUserToken()['id'],
      "dogImageBase": image
    };


    return this.http.post<Diagnose>(`${environment.apiUrl}/diagnose`, data,
    { headers: new HttpHeaders({Authorization: 'Bearer ' + this.fullToken})}).pipe(
      take(1)
    );
  }

  getDiagnoseLength():Observable<number>{
    return this.http.get<number>(`${environment.apiUrl}/diagnose/diagnoseLangth`,
    { headers: new HttpHeaders({Authorization: 'Bearer ' + this.fullToken})}).pipe(
      take(1)
  )};

  upvoteDiagnose(x:{_id: string}):Observable<{errors:number, msg:string, likeNumber: number}>{
    const id = this.getUserToken()['id'];

    return this.http.put<{errors:number, msg:string, likeNumber: number}>
    (`${environment.apiUrl}/diagnose/upvote/${x._id}`, {'likeArray': id},
    { headers: new HttpHeaders({Authorization: 'Bearer ' + this.fullToken})}).pipe(
      take(1)
    )
  };


  addComment(x:{_id: string, comment:string} ){
    const id = this.getUserToken()['id'];
    return this.http.put<{errors:number, msg:string, comment: Array<{"content": string, "owner": string, "_id": string}>}>
    (`${environment.apiUrl}/diagnose/addcomment/${x._id}`, {'content': x.comment, 'owner': "bine", '_ownerid': id},
    { headers: new HttpHeaders({Authorization: 'Bearer ' + this.fullToken})}).pipe(
      take(1)
    );
  }

  deleteComment(diagnoseID, commentID){
    const id = this.getUserToken()['id'];
    return this.http.put<{errors:number, msg:string, comment: Array<{"content": string, "owner": string, "_id": string}>}>(
      `${environment.apiUrl}/diagnose/deletecomment/${diagnoseID}`, {'ownerID': id, 'commentID' : commentID},
      { headers: new HttpHeaders({Authorization: 'Bearer ' + this.fullToken})}).pipe(
      take(1)
    );
  }

  downvoteDiagnose(x:{_id: string}):Observable<{errors:number, msg:string, likeNumber: number}>{

    const id = this.getUserToken()['id'];

    return this.http.put<{errors:number, msg:string, likeNumber: number}>(
      `${environment.apiUrl}/diagnose/downvote/${x._id}`, {'likeArray': id},
      { headers: new HttpHeaders({Authorization: 'Bearer ' + this.fullToken})}).pipe(
      take(1)
    );
  }

  uploadImage(data){
    return this.http.post<Diagnose>(`${environment.apiUrl}/photos/upload`, data,
    { headers: new HttpHeaders({Authorization: 'Bearer ' + this.fullToken})}).pipe(
      take(1)
    );
  }

  async getLocalDogBaseImage(key){
    let x = await this.storage.get(key);
    return x;
  }

  async saveLocalDogBaseImage(key, value){
    let x = await this.storage.set(key, value);
    return x;
  }
}