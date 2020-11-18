import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGpsComponent } from './lista-gps.component';

describe('ListaGpsComponent', () => {
  let component: ListaGpsComponent;
  let fixture: ComponentFixture<ListaGpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaGpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
