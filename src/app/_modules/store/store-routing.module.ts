
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StoreComponent } from 'src/app/_layout/store/store.component';
import { RouteProtectService } from 'src/app/_services/shared/route-protect.service';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { SalesComponent } from './sales/sales.component';



const routes: Routes = [
  {
    path: "shop",
    component: StoreComponent,
    children: [
        { path: "", component: ProductsComponent },
    ],
    canActivate: [RouteProtectService]
  },{
    path: "cart",
    component: StoreComponent,
    children: [
        { path: "", component: CartComponent },
    ],
    canActivate: [RouteProtectService]
  },{
    path: "sales",
    component: StoreComponent,
    children: [
        { path: "", component: SalesComponent },
    ],
    canActivate: [RouteProtectService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {} 