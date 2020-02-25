import { TestBed } from '@angular/core/testing';

import { ProtectLoginService } from './protect-login.service';

describe('ProtectLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProtectLoginService = TestBed.get(ProtectLoginService);
    expect(service).toBeTruthy();
  });
});
