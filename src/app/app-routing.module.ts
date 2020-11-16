import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./_modules/authentication/authentication.module").then(
        m => m.AuthenticationModule
      )
  },
  {
    path: "",
    loadChildren: () =>
      import("./_modules/store/store.module").then(
        m => m.StoreModule
      )
  },
  {
    path: "**",
    component: PageNotFoundComponent,
    children: [{ path: "404", component: PageNotFoundComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
