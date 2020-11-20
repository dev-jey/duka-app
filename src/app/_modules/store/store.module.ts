import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from 'src/app/_layout/store/store.component';
import { StoreNavbarComponent } from 'src/app/_layout/store/store-navbar/store-navbar.component';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [ProductsComponent, StoreComponent, StoreNavbarComponent, CartComponent],
  imports: [
    CommonModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }
