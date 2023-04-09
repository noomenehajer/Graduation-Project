import { TestBed } from '@angular/core/testing';

import { AuthPsyGuard } from './auth-psy.guard';

describe('AuthPsyGuard', () => {
  let guard: AuthPsyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthPsyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
