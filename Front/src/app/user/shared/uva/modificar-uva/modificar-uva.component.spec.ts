import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarUvaComponent } from './modificar-uva.component';

describe('ModificarUvaComponent', () => {
  let component: ModificarUvaComponent;
  let fixture: ComponentFixture<ModificarUvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarUvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarUvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
