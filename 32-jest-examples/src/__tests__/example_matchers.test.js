describe('matchers', () => {
  test('toBe', () => {
    expect(true).toBe(true);
  });

  test('toEqual', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});

    const arr = ['one', 'two'];
    expect(arr).toEqual(['one', 'two']);
  });

  test('not', () => {
    expect(true).not.toBe(false);
  });

  test('string', () => {
    expect('team').not.toMatch(/I/);
  });

})