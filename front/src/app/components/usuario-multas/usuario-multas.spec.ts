import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioMultas } from './usuario-multas';

describe('UsuarioMultas', () => {
  let component: UsuarioMultas;
  let fixture: ComponentFixture<UsuarioMultas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioMultas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioMultas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
