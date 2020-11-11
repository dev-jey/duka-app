import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
import { HomeComponent } from './_layout/home/home.component';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./_modules/authentication/authentication.module").then(
        m => m.AuthenticationModule
      )
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./_modules/admin/admin.module").then(
        m => m.AdminModule
      )
  },
  {
    path: "store",
    loadChildren: () =>
      import("./_modules/store/store.module").then(
        m => m.StoreModule
      )
  },
  {
    path: "**",
    component: HomeComponent,
    children: [{ path: "", component: PageNotFoundComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
