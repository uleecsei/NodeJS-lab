import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-addTruckModal',
  templateUrl: './addTruckModal.component.html',
  styleUrls: ['./addTruckModal.component.css']
})
export class AddTruckModalComponent implements OnInit {
  @Output() addTruckEvent = new EventEmitter<any>();
  truckCreds: any = {};
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

  addTruck(){
    this.addTruckEvent.emit(this.truckCreds);
  }
}
