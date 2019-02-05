import { DayOnlyPipe } from './day-only.pipe';

describe('DayOnlyPipe', () => {
  it('create an instance', () => {
    const pipe = new DayOnlyPipe();
    expect(pipe).toBeTruthy();
  });
});
