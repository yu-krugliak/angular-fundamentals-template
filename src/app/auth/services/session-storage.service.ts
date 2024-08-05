import { Injectable } from '@angular/core';

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key
// Add your code here

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  
  setToken(token: string){
    // Add your code here
    window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(){
    // Add your code here
    return window.sessionStorage.getItem(TOKEN);
  }

  deleteToken(){
    // Add your code here
    window.sessionStorage.removeItem(TOKEN);
  }
}
