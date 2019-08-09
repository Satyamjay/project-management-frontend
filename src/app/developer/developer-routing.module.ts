import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeveloperComponent} from './developer.component';
import { AuthGuardDeveloper } from '../auth/authGaurdDeveloper.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardDeveloper],
    canActivateChild: [AuthGuardDeveloper],
    children:[{ 
        path: '',
        component: DeveloperComponent
    }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperRoutingModule { }
