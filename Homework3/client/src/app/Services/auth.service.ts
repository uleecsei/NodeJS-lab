import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/User';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post(this.baseUrl  + 'login', user)
      .pipe(
          map((response: any) => {
            if(response)
            {
              localStorage.setItem('token', response.token);
              localStorage.setItem('id', response.id);
            }
          })
      )
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  getUserId(){
    return localStorage.getItem('id');
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getTokenHeader(){
    let headerDict = {
      'token': this.getToken(),
    }
    let requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return requestOptions;
  }
}
