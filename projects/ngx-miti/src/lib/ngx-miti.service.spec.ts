import { TestBed } from '@angular/core/testing';

import { NgxMitiService } from './ngx-miti.service';

describe('NgxMitiService', () => {
  let service: NgxMitiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMitiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
