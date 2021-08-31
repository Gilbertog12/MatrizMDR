import { TestBed } from '@angular/core/testing';

import { ServiciocajasService } from './serviciocajas.service';

describe('ServiciocajasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiciocajasService = TestBed.get(ServiciocajasService);
    expect(service).toBeTruthy();
  });
});
