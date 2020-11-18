import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUsuarioFirebaseComponent } from './crear-usuario-firebase.component';

describe('CrearUsuarioFirebaseComponent', () => {
  let component: CrearUsuarioFirebaseComponent;
  let fixture: ComponentFixture<CrearUsuarioFirebaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearUsuarioFirebaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearUsuarioFirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
