import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudMultas } from './crud-multas';

describe('CrudMultas', () => {
  let component: CrudMultas;
  let fixture: ComponentFixture<CrudMultas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudMultas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudMultas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
