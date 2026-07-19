import { TestBed } from '@angular/core/testing';

import { ViewManagerservice } from './view-manager.service';

describe('ViewManagerservice', () => {
  let service: ViewManagerservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewManagerservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
