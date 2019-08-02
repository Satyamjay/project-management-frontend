import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';
import { DeveloperComponent } from './developer/developer.component';

import { AdminRoutingModule } from './admin-routing.module';

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NgxLoadingModule } from 'ngx-loading';
import { HandlerComponent } from './handler/handler.component';


@NgModule({
  declarations: [
    AdminComponent,
    DeveloperComponent,
    HandlerComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    NgxLoadingModule.forRoot({}),
  ]
})
export class AdminModule { }
