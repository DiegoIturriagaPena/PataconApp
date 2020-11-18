import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSetComponent } from './admin-set.component';

describe('AdminSetComponent', () => {
  let component: AdminSetComponent;
  let fixture: ComponentFixture<AdminSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
