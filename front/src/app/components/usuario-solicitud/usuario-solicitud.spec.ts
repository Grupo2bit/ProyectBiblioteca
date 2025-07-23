import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioSolicitud } from './usuario-solicitud';

describe('UsuarioSolicitud', () => {
  let component: UsuarioSolicitud;
  let fixture: ComponentFixture<UsuarioSolicitud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioSolicitud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioSolicitud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
