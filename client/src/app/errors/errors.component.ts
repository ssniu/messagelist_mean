import { Component, OnInit } from '@angular/core';
import { Error } from './error.model';
import { ErrorService } from '../shared/error.service';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

    error: Error;
    display="none";

  constructor(private errorService: ErrorService) { }

  //change display
  onErrorHandled(){
      this.display = "none";
  }

  ngOnInit() {
      this.errorService.errorOccurred
           .subscribe(
               (error: Error) => {
                   this.error = error;
                   this.display = "block";
               }
           );
  }

}
