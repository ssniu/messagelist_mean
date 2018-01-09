import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes,Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
//import { MessagesComponent } from './messages/messages.component';
import { ErrorsComponent} from './errors/errors.component';
//import { MessagesInputComponent } from './messages-input/messages-input.component';
//import { MessagesListComponent } from './messages-list/messages-list.component';
import { HeadersComponent } from './headers/headers.component';
import { ErrorService } from './shared/error.service';

import { MessageModule } from "./messages/message.module";
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LogoutComponent } from './auth/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    //MessagesComponent,
    ErrorsComponent,
    //MessagesInputComponent,
    //MessagesListComponent,
    HeadersComponent,
    SigninComponent,
    SignupComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    MessageModule
  ],
  providers: [ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
