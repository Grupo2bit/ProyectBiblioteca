import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPreSolicitud } from './crud-pre-solicitud';

describe('CrudPreSolicitud', () => {
  let component: CrudPreSolicitud;
  let fixture: ComponentFixture<CrudPreSolicitud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudPreSolicitud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudPreSolicitud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
