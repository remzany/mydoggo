import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProtectLoginService {

  secretPassphase: boolean = false;

  constructor() { }

  isPassphaseProvided():boolean{
    if(this.secretPassphase)
      return true;
      
    return false
  }

  setPassphase(val:boolean){
    this.secretPassphase = val;
  }
}
