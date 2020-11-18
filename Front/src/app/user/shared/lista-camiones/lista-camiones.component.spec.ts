import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamionesComponent } from './lista-camiones.component';

describe('ListaCamionesComponent', () => {
  let component: CamionesComponent;
  let fixture: ComponentFixture<CamionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
