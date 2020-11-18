import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRecorridoComponent } from './crear-recorrido.component';

describe('CrearRecorridoComponent', () => {
  let component: CrearRecorridoComponent;
  let fixture: ComponentFixture<CrearRecorridoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearRecorridoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearRecorridoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
