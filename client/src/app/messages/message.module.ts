import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MessagesComponent } from "./messages.component";
import { MessagesListComponent } from "../messages-list/messages-list.component";

import { MessagesInputComponent } from "../messages-input/messages-input.component";
import { MessageService } from "../shared/message.service";
import { MessagesDetailComponent } from './messages-detail/messages-detail.component';


@NgModule({
    declarations: [
        MessagesComponent,
        MessagesListComponent,
        MessagesInputComponent,
        MessagesDetailComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [MessageService]
})
export class MessageModule {

}
