import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  constructor(private authSevice:AuthService, private router: Router) { }
  user: any = {};
  ngOnInit() {
  }

  register(){
    this.user.role = Array.prototype.filter.call(document.getElementsByName('role'), (item) => item.checked)[0].value ;
    console.log(this.user);
    this.authSevice.register(this.user).subscribe(
      response => {
        this.authSevice.login(this.user).subscribe(
          loginResponse => {
            this.router.navigate(['/home'])
          }, error => {
            alert(error);
          }
        )
      }
    )
  }
}
