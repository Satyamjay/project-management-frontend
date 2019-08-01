import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Four04Component } from './four04/four04.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
     path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: Four04Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
