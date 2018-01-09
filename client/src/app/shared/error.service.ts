import { EventEmitter, Injectable } from '@angular/core';
import { Error } from '../errors/error.model';

@Injectable()
export class ErrorService {
    errorOccurred = new EventEmitter<Error>();

//set handleError method
    handleError(error: any){
        const errorData = new Error(error.title, error.message);
        this.errorOccurred.emit(errorData);
    }
}
