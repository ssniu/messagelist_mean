import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { MessagesComponent } from './messages/messages.component';


const routes: Routes = [

    { path: 'messages', component: MessagesComponent },
    { path: 'auth', component: AuthComponent },
    { path: '**', redirectTo: '/messages', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
