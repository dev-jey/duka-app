
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from 'src/app/_layout/home/home.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  {
    path: "shop",
    component: HomeComponent,
    children: [
        { path: "", component: ProductsComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {} 