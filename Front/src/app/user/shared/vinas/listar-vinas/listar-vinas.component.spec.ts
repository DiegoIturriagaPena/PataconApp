import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVinasComponent } from './listar-vinas.component';

describe('ListarVinasComponent', () => {
  let component: ListarVinasComponent;
  let fixture: ComponentFixture<ListarVinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarVinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarVinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
