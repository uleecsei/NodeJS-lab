import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TruckService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }


  addNew(userId: string, truckCreds) {
    let tokenHeader = this.authService.getTokenHeader();
    return this.http.post(this.baseUrl + 'truck/' + userId, truckCreds, tokenHeader)
  }
}
