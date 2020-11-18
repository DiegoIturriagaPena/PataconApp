import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFlotaComponent } from './lista-flota.component';

describe('ListaFlotaComponent', () => {
  let component: ListaFlotaComponent;
  let fixture: ComponentFixture<ListaFlotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaFlotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFlotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
