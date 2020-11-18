import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRecorridoComponent } from './listar-recorrido.component';

describe('ListarRecorridoComponent', () => {
  let component: ListarRecorridoComponent;
  let fixture: ComponentFixture<ListarRecorridoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarRecorridoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarRecorridoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
