import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPrestamos } from './crud-prestamos';

describe('CrudPrestamos', () => {
  let component: CrudPrestamos;
  let fixture: ComponentFixture<CrudPrestamos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudPrestamos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudPrestamos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
