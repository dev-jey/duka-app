import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from './_modules/authentication/authentication.module';
import { StoreModule } from './_modules/store/store.module';
import { AdminModule } from './_modules/admin/admin.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './_layout/home/navbar/navbar.component';
import { HomeComponent } from './_layout/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './_services/shared/http-interceptor.service';
import { NotFoundComponent } from './_modules/errors/not-found/not-found.component';
import { ServerErrorComponent } from './_modules/errors/server-error/server-error.component';


@NgModule({
  declarations: [
    AppComponent, NavbarComponent, HomeComponent, NotFoundComponent, ServerErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    StoreModule,
    AdminModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
