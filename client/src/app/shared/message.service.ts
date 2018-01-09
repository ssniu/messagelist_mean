import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs';
import { Observable } from 'rxjs';

import { Message } from '../messages/message.model';
import { ErrorService } from './error.service';

@Injectable()
export class MessageService {
    private messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>(); //edit message \


    //DI
    constructor(private http: Http, private errorService: ErrorService){}

    //add message method
    addMessage(message: Message){
        const body = JSON.stringify(message);//convert the message to json string
        //set the http header
        const headers = new Headers({'Content-Type': 'application/json'});
        // got the token from localStorage
        const token = localStorage.getItem('token')?
            '?token=' + localStorage.getItem('token') : '';
        //connect the backend messages
        return this.http.post('http://localhost:3000/message' + token, body, {headers: headers})
                 .map((res: Response) => {
                     const result = res.json();
                     const message = new Message(
                         result.obj.content,
                         result.obj.user.username,
                         result.obj._id,
                         result.obj.user._id
                     );
                     return message;
                 }).catch((error: Response) => {
                     this.errorService.handleError(error.json());
                     return Observable.throw(error.json());
                 });
    }

    //getMessage method
    getMessages(){
        return this.http.get('http://localhost:3000/message')
                 .map((res:Response) => {
                     const messages = res.json().obj;
                     let transformedMessages: Message[] = [];
                     for(let message of messages){
                         transformedMessages.push(new Message(
                             message.content,
                             message.user.username,
                             message._id,
                             message.user._id
                         ));
                     }
                     this.messages = transformedMessages;
                     return transformedMessages;
                 }).catch((error: Response) => {
                     this.errorService.handleError(error.json());
                     return Observable.throw(error.json());
                 });
    }

    //editMessage method
    editMessage(message: Message){
        this.messageIsEdit.emit(message);
    }

    //updateMessage method
    updateMessage(message: Message){
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type':'application/json'});
        const token = localStorage.getItem('token')?'?token=' + localStorage.getItem('token'): '';

        return this.http.patch('http://localhost:3000/message/' + message.messageId + token, body ,{headers: headers})
                .map((res: Response) => res.json())
                .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());
                });
    }

    deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message), 1);//delete it
        const token = localStorage.getItem('token')?
        '?token=' + localStorage.getItem('token'):'';

        return this.http.delete('http://localhost:3000/message/' + message.messageId + token)
                .map((res: Response) => res.json())
                .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());
                });
    }
}
