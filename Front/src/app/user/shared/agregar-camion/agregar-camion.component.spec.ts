import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCamionComponent } from './agregar-camion.component';

describe('AgregarCamionComponent', () => {
  let component: AgregarCamionComponent;
  let fixture: ComponentFixture<AgregarCamionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarCamionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
