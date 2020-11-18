import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearGpsComponent } from './crear-gps.component';

describe('CrearGpsComponent', () => {
  let component: CrearGpsComponent;
  let fixture: ComponentFixture<CrearGpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearGpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
