import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Loads } from '../Models/Loads';
import { Dimensions } from '../Models/Dimensions';

@Component({
  selector: 'app-addNewLoadModal',
  templateUrl: './addNewLoadModal.component.html',
  styleUrls: ['./addNewLoadModal.component.css']
})
export class AddNewLoadModalComponent implements OnInit {
  @Output() addLoadEvent = new EventEmitter<Loads>();
  loadCreds: any = {};
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

  addTruck(){
    let load: Loads = new Loads();
    load.dimensions = new Dimensions();
    load.payload = this.loadCreds.payload;
    load.dimensions.height = this.loadCreds.height;
    load.dimensions.length = this.loadCreds.length;
    load.dimensions.width = this.loadCreds.width;
    this.addLoadEvent.emit(load);
  }
}
