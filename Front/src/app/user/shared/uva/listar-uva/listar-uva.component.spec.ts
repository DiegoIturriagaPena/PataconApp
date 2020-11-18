import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarUvaComponent } from './listar-uva.component';

describe('ListarUvaComponent', () => {
  let component: ListarUvaComponent;
  let fixture: ComponentFixture<ListarUvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarUvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarUvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
