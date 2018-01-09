import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from '../shared/message.service';
import { Message } from '../messages/message.model';

@Component({
  selector: 'app-messages-input',
  templateUrl: './messages-input.component.html',
  styleUrls: ['./messages-input.component.css']
})
export class MessagesInputComponent implements OnInit {

    message: Message;


  constructor(private messageService: MessageService) { }

  onSubmit(form: NgForm) {
      if(this.message){
          this.message.content = form.value.content;
          this.messageService.updateMessage(this.message)
               .subscribe(
                   result => console.log(result)
               );
               this.message = null;
      }else {
          const message = new Message(form.value.content, 'Max');
          this.messageService.addMessage(message)
          .subscribe(
              data => console.log(data),
          );
      }
      form.resetForm();
  }

  onClear(form: NgForm){
      this.message = null;
      form.resetForm();
  }

  ngOnInit() {
      this.messageService.messageIsEdit.subscribe(
          (message: Message) => this.message = message
      );
  }

}
