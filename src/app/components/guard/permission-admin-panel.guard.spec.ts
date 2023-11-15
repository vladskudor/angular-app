import { TestBed } from '@angular/core/testing';

import { PermissionAdminPanelGuard } from './permission-admin-panel.guard';

describe('PermissionAdminPanelGuard', () => {
  let guard: PermissionAdminPanelGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermissionAdminPanelGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
