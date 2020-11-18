import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarVinasComponent } from './modificar-vinas.component';

describe('ModificarVinasComponent', () => {
  let component: ModificarVinasComponent;
  let fixture: ComponentFixture<ModificarVinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarVinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarVinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
