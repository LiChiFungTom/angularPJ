import { TestBed } from '@angular/core/testing';

import { PlaynameService } from './playname.service';

describe('PlaynameService', () => {
  let service: PlaynameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaynameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
