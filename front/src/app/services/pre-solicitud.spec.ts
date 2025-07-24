import { TestBed } from '@angular/core/testing';

import { PreSolicitud } from './pre-solicitud';

describe('PreSolicitud', () => {
  let service: PreSolicitud;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreSolicitud);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
