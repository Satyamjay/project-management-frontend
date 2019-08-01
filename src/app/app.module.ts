import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule}  from "@angular/platform-browser/animations";

import { AlertModule } from 'ngx-alerts';
import { NgxLoadingModule } from 'ngx-loading';

import { Four04Component } from './four04/four04.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { DeveloperComponent } from './admin/developer/developer.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Four04Component,
    AdminComponent,
    HeaderComponent,
    DeveloperComponent,
  ],
  imports: [
    NgbModule,  
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
    NgxLoadingModule.forRoot({}),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
  ],
  providers: [],
  bootstrap: [AppComponent, HeaderComponent],
})
export class AppModule { }
