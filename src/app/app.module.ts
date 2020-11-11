import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from './_modules/authentication/authentication.module';
import { StoreModule } from './_modules/store/store.module';
import { AdminModule } from './_modules/admin/admin.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
import { NavbarComponent } from './_layout/home/navbar/navbar.component';
import { HomeComponent } from './_layout/home/home.component';


@NgModule({
  declarations: [
    AppComponent, PageNotFoundComponent, NavbarComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    StoreModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
