import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRutaComponent } from './editar-ruta.component';

describe('EditarRutaComponent', () => {
  let component: EditarRutaComponent;
  let fixture: ComponentFixture<EditarRutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarRutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
