import { Component, OnInit } from '@angular/core';
import { MessageService } from '../shared/message.service';
import { Message } from '../messages/message.model';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {

    messages: Message[];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
      this.messageService.getMessages()
      .subscribe(
          (messages: Message[]) => {
              this.messages = messages;
          }
      );
  }

}
