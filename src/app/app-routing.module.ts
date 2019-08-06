import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Four04Component } from './four04/four04.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'developer',
    loadChildren: () => import('./developer/developer.module').then(mod => mod.DeveloperModule),
  },
  {
     path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: Four04Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
