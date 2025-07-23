import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioNotificaciones } from './usuario-notificaciones';

describe('UsuarioNotificaciones', () => {
  let component: UsuarioNotificaciones;
  let fixture: ComponentFixture<UsuarioNotificaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioNotificaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioNotificaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
