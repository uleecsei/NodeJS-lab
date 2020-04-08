import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Loads } from '../Models/Loads';

@Injectable({
  providedIn: 'root'
})
export class ShipmentsService {
  baseUrl = environment.baseUrl + 'loads/';
  constructor(private http: HttpClient, private authService: AuthService) { }

  delete(loadId: string){
    let tokenHeader = this.authService.getTokenHeader();
    return this.http.delete(this.baseUrl + loadId, tokenHeader);
  }

  post(loadId: string){
    let tokenHeader = this.authService.getTokenHeader();
    return this.http.post(this.baseUrl + loadId,{}, tokenHeader);
  }

  update(loadId: string, loadCreds: Loads){
    let tokenHeader = this.authService.getTokenHeader();
    return this.http.patch(this.baseUrl + loadId, loadCreds, tokenHeader)
  }

  create(loadCreds: Loads){
    let tokenHeader = this.authService.getTokenHeader();
    return this.http.post(this.baseUrl, loadCreds, tokenHeader);
  }

}
