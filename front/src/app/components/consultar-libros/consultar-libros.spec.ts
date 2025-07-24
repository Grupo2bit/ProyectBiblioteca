import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarLibros } from './consultar-libros';

describe('ConsultarLibros', () => {
  let component: ConsultarLibros;
  let fixture: ComponentFixture<ConsultarLibros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarLibros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarLibros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
