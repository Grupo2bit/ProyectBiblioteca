import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudLibros } from './crud-libros';

describe('CrudLibros', () => {
  let component: CrudLibros;
  let fixture: ComponentFixture<CrudLibros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudLibros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudLibros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
