import { TestBed } from '@angular/core/testing';

import { PlayScoreService } from './play-score.service';

describe('PlayScoreService', () => {
  let service: PlayScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
