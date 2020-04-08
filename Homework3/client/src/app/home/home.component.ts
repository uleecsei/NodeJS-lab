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
import { AddNewLoadModalComponent } from '../addNewLoadModal/addNewLoadModal.component';
import { Loads } from '../Models/Loads';
import { ShipmentsService } from '../Services/shipments.service';
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
    private router: Router, private modalService: BsModalService,
    private truckService: TruckService, private loadService: ShipmentsService) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.getUser();
  }


  getUser(){
    this.userService.getUser().subscribe(user => {
      this.user = user;
    })
  }

  checkRole(role: string){
    return this.user.role == role;
  }

  deleteUser(){
    this.userService.deleteUser().subscribe(() => {
      this.router.navigate(['register'])
    }, error => {
      console.log(error);
    })
  }

  changePassword(userCreds) {
    this.userService.changeUserPassword(userCreds.oldPassword, userCreds.newPassword)
      .subscribe( () => {
        alert("your password changed")
      });
  }

  addTruck(truckCreds) {
    this.truckService.addNew(truckCreds).subscribe((response: any) => {
      let truck:Trucks = response.truck;
      this.user.trucks.push(truck);
    }, error => {
      alert(error.message)
    })
  }

  assignTruck(truckId: string){
    this.truckService.assignTo(truckId).subscribe(() => {
      this.user.trucks.find(x => x.assigned_to == true).assigned_to = false
      this.user.trucks.find(x => x._id == truckId).assigned_to = true;
    })
  }

  deleteTruck(truckId: string){
    this.truckService.deleteTrck(truckId).subscribe(() => {
      this.user.trucks.splice(this.user.trucks.findIndex(x => x._id == truckId), 1);
    })
  }

  updateTruckInfo(truckId: string) {
    this.bsModalRef = this.modalService.show(AddTruckModalComponent);

    this.bsModalRef.content.addTruckEvent.subscribe(truckCreds => {
      this.bsModalRef.hide();
      this.truckService.updateTruck(truckId, truckCreds).subscribe(() => {
        this.user.trucks.find(x => x._id = truckId).type = truckCreds.type;
      })
    })
  }

  addLoad(loadCreds: Loads){
    this.loadService.create(loadCreds).subscribe((response:any) => {
      let load:Loads = response.load;
      this.user.loads.push(load);
    })
  }

  openAddLoadModal() {
    this.bsModalRef = this.modalService.show(AddNewLoadModalComponent);

    this.bsModalRef.content.addLoadEvent.subscribe(loadCreds => {
      this.bsModalRef.hide();
      this.addLoad(loadCreds)
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
