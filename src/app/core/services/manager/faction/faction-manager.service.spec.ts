import { TestBed } from '@angular/core/testing';

import { FactionManagerService } from './faction-manager.service';

describe('FactionManagerService', () => {
  let service: FactionManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactionManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
