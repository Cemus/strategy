import { TestBed } from '@angular/core/testing';

import { FiefManagerService } from './fief-manager.service';

describe('FiefManagerService', () => {
  let service: FiefManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiefManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
