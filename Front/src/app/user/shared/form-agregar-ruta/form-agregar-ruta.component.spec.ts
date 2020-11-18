import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAgregarRutaComponent } from './form-agregar-ruta.component';

describe('FormAgregarRutaComponent', () => {
  let component: FormAgregarRutaComponent;
  let fixture: ComponentFixture<FormAgregarRutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAgregarRutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAgregarRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
