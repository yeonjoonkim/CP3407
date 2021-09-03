import { WeatherlogPipe } from './weatherlog.pipe';

describe('WeatherlogPipe', () => {
  it('create an instance', () => {
    const pipe = new WeatherlogPipe();
    expect(pipe).toBeTruthy();
  });
});
