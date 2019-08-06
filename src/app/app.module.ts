import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule}  from "@angular/platform-browser/animations";

import { AlertModule } from 'ngx-alerts';
import { NgxLoadingModule } from 'ngx-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { Four04Component } from './four04/four04.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './header/header.component';
import { AdminModule } from './admin/admin.module';

import { AuthService } from './auth/auth.service';
import { DeveloperComponent } from './developer/developer.component';
import { DeveloperModule } from './developer/developer.module';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Four04Component,
    HeaderComponent,
    DeveloperComponent,
  ],
  imports: [
    NgbModule,  
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
    NgxLoadingModule.forRoot({}),
    AdminModule,
    DeveloperModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent, HeaderComponent],
})
export class AppModule { }
