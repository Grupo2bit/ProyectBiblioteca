import { TestBed } from '@angular/core/testing';

import { SolicitudPrestamo } from './solicitud-prestamo';

describe('SolicitudPrestamo', () => {
  let service: SolicitudPrestamo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudPrestamo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
