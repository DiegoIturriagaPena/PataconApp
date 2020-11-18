import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarUvaComponent } from './agregar-uva.component';

describe('AgregarUvaComponent', () => {
  let component: AgregarUvaComponent;
  let fixture: ComponentFixture<AgregarUvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarUvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarUvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
