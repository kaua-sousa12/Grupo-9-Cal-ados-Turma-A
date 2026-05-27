import { TestBed } from '@angular/core/testing';

import { MelhorEnvio } from './melhor-envio';

describe('MelhorEnvio', () => {
  let service: MelhorEnvio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MelhorEnvio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
