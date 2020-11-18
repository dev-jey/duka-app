import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForbiddenComponent } from './_modules/errors/forbidden/forbidden.component';
import { NotFoundComponent } from './_modules/errors/not-found/not-found.component';
import { ServerErrorComponent } from './_modules/errors/server-error/server-error.component';

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
    path: "error/500",
    component: ServerErrorComponent,
    children: [{ path: "", component: ServerErrorComponent }]
  },
  {
    path: "error/forbidden",
    component: ForbiddenComponent,
    children: [{ path: "", component: ForbiddenComponent }]
  },
  {
    path: "**",
    component: NotFoundComponent,
    children: [{ path: "", component: NotFoundComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
