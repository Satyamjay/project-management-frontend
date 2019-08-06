import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeveloperComponent } from './developer.component';
import { DeveloperRoutingModule } from './developer-routing.module';



@NgModule({
  declarations: [
    DeveloperComponent,
  ],
  imports: [
    CommonModule,
    DeveloperRoutingModule,
  ]
})
export class DeveloperModule { }