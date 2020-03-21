  
import { getAllDates } from './getDates';

describe('getAllDates()', () => {
  // Test: this function is the callback to run the real test
  test('Valid dates should return array', () => {
    const input = new Date();
    const inputTwo = new Date();

    expect(typeof getAllDates(input, inputTwo)).toBe('object');
  });
});
