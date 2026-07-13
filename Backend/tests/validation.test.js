const { validateSignupData, validateTaskData } = require('../utils/validation');

describe('validation helpers', () => {
  test('rejects invalid signup payloads', () => {
    const result = validateSignupData({ name: 'A', email: 'bad-email', password: '12' });

    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining(['Name must be at least 2 characters', 'Please enter a valid email', 'Password must be at least 6 characters'])
    );
  });

  test('accepts valid signup payloads', () => {
    const result = validateSignupData({ name: 'Alice', email: 'alice@example.com', password: 'password123' });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  test('rejects task payloads missing required fields', () => {
    const result = validateTaskData({ priority: 'high' });

    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual(expect.arrayContaining(['Title is required']));
  });
});
