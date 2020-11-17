
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StoreComponent } from 'src/app/_layout/store/store.component';
import { RouteProtectService } from 'src/app/_services/shared/route-protect.service';
import { ProductsComponent } from './products/products.component';



const routes: Routes = [
  {
    path: "shop",
    component: StoreComponent,
    children: [
        { path: "", component: ProductsComponent },
    ],
    canActivate: [RouteProtectService]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {} 