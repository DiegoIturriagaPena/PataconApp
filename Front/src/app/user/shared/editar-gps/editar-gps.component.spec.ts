import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGpsComponent } from './editar-gps.component';

describe('EditarGpsComponent', () => {
  let component: EditarGpsComponent;
  let fixture: ComponentFixture<EditarGpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarGpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
