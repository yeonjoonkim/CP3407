import { TestBed } from '@angular/core/testing';

import { WeatherLogService } from './weather-log.service';

describe('WeatherLogService', () => {
  let service: WeatherLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
