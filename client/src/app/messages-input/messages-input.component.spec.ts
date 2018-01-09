import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesInputComponent } from './messages-input.component';

describe('MessagesInputComponent', () => {
  let component: MessagesInputComponent;
  let fixture: ComponentFixture<MessagesInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
