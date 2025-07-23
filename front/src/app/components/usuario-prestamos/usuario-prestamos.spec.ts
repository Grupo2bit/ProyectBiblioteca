import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPrestamos } from './usuario-prestamos';

describe('UsuarioPrestamos', () => {
  let component: UsuarioPrestamos;
  let fixture: ComponentFixture<UsuarioPrestamos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioPrestamos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioPrestamos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
