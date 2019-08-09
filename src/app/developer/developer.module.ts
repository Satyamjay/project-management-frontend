import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { DeveloperComponent } from './developer.component';
import { DeveloperRoutingModule } from './developer-routing.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';


import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [
    DeveloperComponent,
  ],
  imports: [
    CommonModule,
    DeveloperRoutingModule,
    ReactiveFormsModule,
    // MatSelectModule,
    // MatFormFieldModule,
    // NgxMatSelectSearchModule
    SelectDropDownModule,
    // NgxSelectModule
    NgxLoadingModule,
    ConfirmationPopoverModule,

  ],
  providers: [
    DatePipe
  ]
})
export class DeveloperModule { }