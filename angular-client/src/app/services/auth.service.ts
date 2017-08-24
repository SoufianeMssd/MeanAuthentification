import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { Router,CanActivate } from '@angular/router';
@Injectable()
export class AuthService implements CanActivate {
authToken: any;
user: any;
  constructor(private http: Http,
              private router: Router) { }
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register',user,{headers: headers})
    .map(res =>res.json());
  }
  authentificateUser(user){
     let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate',user,{headers: headers})
    .map(res =>res.json())
  }
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  loadtoken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  loggedIn(){
    return tokenNotExpired('id_token');
  }
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  getProfile(){
    let headers = new Headers();
    this.loadtoken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers: headers})
    .map(res =>res.json())
  }
  //AuthGuard: but first implements and import CanActivate
  canActivate(){
    if(this.loggedIn()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }


}
