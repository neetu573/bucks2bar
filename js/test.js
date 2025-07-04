// Unit tests for the regex used in username validation

describe('Username regex validation', () => {
  // The regex from the selected code
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const testCases = [
    { input: 'Valid1@AA', expected: true, description: 'valid username' },
    { input: 'invalid', expected: false, description: 'no capital, number, or special char' },
    { input: 'Valid1234', expected: false, description: 'missing special character' },
    { input: 'valid1@aa', expected: false, description: 'missing capital letter' },
    { input: 'Valid@aaa', expected: false, description: 'missing number' },
    { input: 'V1@a', expected: false, description: 'less than 8 characters' },
    { input: 'A1@aaaaa', expected: true, description: 'minimum valid length' },
    { input: 'A1@aaaaaa', expected: true, description: 'longer valid username' },
    { input: 'A1@aaaaa$', expected: true, description: 'valid with extra special char' },
    { input: 'A1aaaaaaa', expected: false, description: 'missing special char' }
  ];

  testCases.forEach(tc => {
    it(`should return ${tc.expected} for "${tc.input}" (${tc.description})`, () => {
      expect(regex.test(tc.input)).toBe(tc.expected);
    });
  });
});