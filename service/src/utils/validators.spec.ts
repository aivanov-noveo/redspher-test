import { hasOnlyValidCharacters } from './validators';

describe('hasOnlyValidCharacters', () => {
  it('returns true if valid expression is passed', () => {
    expect.assertions(1);

    const res = hasOnlyValidCharacters('12 + 1.2 - 1.5*2 / 4');
    expect(res).toBe(true);
  });

  it('returns false if an expression with invalid characters is passed', () => {
    expect.assertions(1);

    const res = hasOnlyValidCharacters('12 + a1.2 - 1,5*2 / 4w');
    expect(res).toBe(false);
  });
});
