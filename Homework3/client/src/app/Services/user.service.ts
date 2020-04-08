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

  

  getUser(): Observable<User>{
   let tokenHeader = this.authService.getTokenHeader();
    return this.http.get<User>(this.baseUrl + 'profile/', tokenHeader);
  }

  deleteUser() {
    let tokenHeader = this.authService.getTokenHeader();
    return this.http.delete(this.baseUrl + 'profile/', tokenHeader);
  }

  changeUserPassword(oldPassword: string, newPassword: string){
    let changeUserPassword = {
      oldPassword: oldPassword,
      newPassword: newPassword
    }
    let tokenHeader = this.authService.getTokenHeader();
    return this.http.patch(this.baseUrl + 'profile' + '/password', changeUserPassword, tokenHeader)
  }

}
