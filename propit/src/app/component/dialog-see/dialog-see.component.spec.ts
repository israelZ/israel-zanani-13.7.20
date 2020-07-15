import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSeeComponent } from './dialog-see.component';

describe('DialogSeeComponent', () => {
  let component: DialogSeeComponent;
  let fixture: ComponentFixture<DialogSeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
