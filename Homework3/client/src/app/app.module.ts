import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordModalComponent } from './changePasswordModal/changePasswordModal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddTruckModalComponent } from './addTruckModal/addTruckModal.component';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      FooterComponent,
      LoginComponent,
      HomeComponent,
      RegisterComponent,
      ChangePasswordModalComponent,
      AddTruckModalComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      FormsModule,
      ModalModule.forRoot(),
      BrowserAnimationsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
