import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-changePasswordModal',
  templateUrl: './changePasswordModal.component.html',
  styleUrls: ['./changePasswordModal.component.css']
})
export class ChangePasswordModalComponent implements OnInit {
  @Output() changePasswordEvent = new EventEmitter<any>();
  userCreds: any = {};
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

  changePassword(){
    this.changePasswordEvent.emit(this.userCreds);
  }
}
