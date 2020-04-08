import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  

  getUser(userId: string): Observable<User>{
   let tokenHeader = this.authService.getTokenHeader();
    return this.http.get<User>(this.baseUrl + 'profile/' + userId, tokenHeader);
  }

  deleteUser(userId: string) {
    let tokenHeader = this.authService.getTokenHeader();
    return this.http.delete(this.baseUrl + 'profile/' + userId, tokenHeader);
  }

  changeUserPassword(userId: string, oldPassword: string, newPassword: string){
    let changeUserPassword = {
      oldPassword: oldPassword,
      newPassword: newPassword
    }
    let tokenHeader = this.authService.getTokenHeader();
    return this.http.put(this.baseUrl + 'profile/' + userId + '/password', changeUserPassword, tokenHeader)
  }

}
