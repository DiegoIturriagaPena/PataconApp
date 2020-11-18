import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdialogComponent } from './pdialog.component';

describe('PdialogComponent', () => {
  let component: PdialogComponent;
  let fixture: ComponentFixture<PdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
