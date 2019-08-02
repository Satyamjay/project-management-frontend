import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DeveloperComponent } from './developer/developer.component';
import { HandlerComponent } from './handler/handler.component';
import { AuthGuard } from '../auth/auth.guard';



const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [      
      { path: 'developers', component:  DeveloperComponent},
      { path: 'handlers', component:  HandlerComponent},
      { path: '', component: AdminComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
