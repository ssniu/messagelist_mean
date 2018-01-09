import { Component, OnInit, Input } from '@angular/core';

import { Message } from '../message.model';
import { MessageService } from '../../shared/message.service';

@Component({
  selector: 'app-messages-detail',
  templateUrl: './messages-detail.component.html',
  styleUrls: ['./messages-detail.component.css']
})
export class MessagesDetailComponent implements OnInit {

   @Input() message : Message;


  constructor(private messageService: MessageService) { }

  onEdit(){
      this.messageService.editMessage(this.message);
  }

  onDelete(){
      this.messageService.deleteMessage(this.message)
      .subscribe(result => console.log(result));
  }


 belongsToUser(){
     return localStorage.getItem('userId') == this.message.userId;
 }
  ngOnInit() {
  }

}
