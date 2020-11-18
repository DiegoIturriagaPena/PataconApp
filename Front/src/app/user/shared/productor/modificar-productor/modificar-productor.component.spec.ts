import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarProductorComponent } from './modificar-productor.component';

describe('ModificarProductorComponent', () => {
  let component: ModificarProductorComponent;
  let fixture: ComponentFixture<ModificarProductorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarProductorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarProductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
