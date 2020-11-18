import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarVinasComponent } from './agregar-vinas.component';

describe('AgregarVinasComponent', () => {
  let component: AgregarVinasComponent;
  let fixture: ComponentFixture<AgregarVinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarVinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarVinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
