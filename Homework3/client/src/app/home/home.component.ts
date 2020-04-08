import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { AuthService } from '../Services/auth.service';
import { User } from '../Models/User';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChangePasswordModalComponent } from '../changePasswordModal/changePasswordModal.component';
import { AddTruckModalComponent } from '../addTruckModal/addTruckModal.component';
import { TruckService } from '../Services/truck.service';
import { Trucks } from '../Models/Trucks';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;
  userId: string;
  bsModalRef: BsModalRef;
  constructor(private userService: UserService, private authService: AuthService,
    protected router: Router, private modalService: BsModalService,
    protected truckService: TruckService) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.getUser();
  }


  getUser(){
    this.userService.getUser(this.userId).subscribe(user => {
      this.user = user;
    })
  }

  checkRole(role: string){
    return this.user.role == role;
  }

  deleteUser(){
    this.userService.deleteUser(this.userId).subscribe(() => {
      this.router.navigate(['register'])
    }, error => {
      console.log(error);
    })
  }

  changePassword(userCreds) {
    this.userService.changeUserPassword(this.userId, userCreds.oldPassword, userCreds.newPassword)
      .subscribe( () => {
        alert("your password changed")
      });
  }

  addTruck(truckCreds) {
    this.truckService.addNew(this.userId, truckCreds).subscribe((truck: Trucks) => {
      this.user.trucks.push(truck);
    }, error => {
      alert(error.message)
    })
  }

  openAddTruckModal() {
    this.bsModalRef = this.modalService.show(AddTruckModalComponent);

    this.bsModalRef.content.addTruckEvent.subscribe(truckCreds => {
      this.bsModalRef.hide();
      this.addTruck(truckCreds)
    })
  }

  openChangePasswordModal() {
    this.bsModalRef = this.modalService.show(ChangePasswordModalComponent);
    
    this.bsModalRef.content.changePasswordEvent.subscribe(userCreds => {
      this.bsModalRef.hide();
      this.changePassword(userCreds)
    })
    
  }

}
