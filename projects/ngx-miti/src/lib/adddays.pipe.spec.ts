/* created by sudeep gurung 23rd July 2023 */
import { AddDaysPipe } from './adddays.pipe';

describe('AddDaysPipe', () => {
  it('should return a string with exact 10 chareacters', () => {
    let pipe = new AddDaysPipe();
    const ans = pipe.transform(new Date().toDateString(), 0);
    expect(ans).toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  it('should add 0 days to a date when second argumemnt is 0', () => {
    let pipe = new AddDaysPipe();
    const ans = pipe.transform('2023-07-23', 0);
    expect(ans).toBe('2023-07-23');
  });

  it('should add 1 days to a date when second argumemnt is 1', () => {
    let pipe = new AddDaysPipe();
    const ans = pipe.transform('2023-07-23', 1);
    expect(ans).toBe('2023-07-24');
  });

  it('should add 5 days to a date when second argumemnt is 5', () => {
    let pipe = new AddDaysPipe();
    const ans = pipe.transform('2023-07-23', 5);
    expect(ans).toBe('2023-07-28');
  });
});
