import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TruckService {
  baseUrl = environment.baseUrl + 'trucks/';
  constructor(private http: HttpClient, private authService: AuthService) { }


  addNew(truckCreds) {
    let tokenHeader = this.authService.getTokenHeader();
    return this.http.post(this.baseUrl, truckCreds, tokenHeader)
  }

  assignTo(truckId: string){
    let tokenHeader = this.authService.getTokenHeader();
    return this.http.patch(this.baseUrl + truckId +'/assign',  {}, tokenHeader);
  }

  deleteTrck(truckId: string){
    let tokenHeader = this.authService.getTokenHeader();
    return this.http.delete(this.baseUrl + truckId, tokenHeader);
  }

  updateTruck(truckId: string, truckCreds){
    let tokenHeader = this.authService.getTokenHeader();
    return this.http.patch(this.baseUrl + truckId +'/update', truckCreds, tokenHeader);
  }
}
