import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { HomeComponent } from 'src/app/_layout/home/home.component';
import { NavbarComponent } from 'src/app/_layout/home/navbar/navbar.component';



@NgModule({
  declarations: [LoginComponent, SignupComponent, WelcomeComponent,NavbarComponent, HomeComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
