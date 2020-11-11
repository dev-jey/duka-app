
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from 'src/app/_layout/home/home.component';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
        { path: "", component: WelcomeComponent },
    ]
  },
  {
    path: "signup",
    component: HomeComponent,
    children: [
        { path: "", component: SignupComponent },
    ]
  },
  {
    path: "login",
    component: HomeComponent,
    children: [
        { path: "", component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {} 