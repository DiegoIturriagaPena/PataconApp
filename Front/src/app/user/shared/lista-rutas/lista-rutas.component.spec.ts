import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRutasComponent } from './lista-rutas.component';

describe('ListaRutasComponent', () => {
  let component: ListaRutasComponent;
  let fixture: ComponentFixture<ListaRutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRutasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
