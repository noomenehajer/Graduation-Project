import { TestBed } from '@angular/core/testing';

import { AuthStGuard } from './auth-st.guard';

describe('AuthStGuard', () => {
  let guard: AuthStGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthStGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
