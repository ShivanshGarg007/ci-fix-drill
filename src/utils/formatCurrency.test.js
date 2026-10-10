const { formatCurrency } = require('./formatCurrency');

test('formats currency correctly', () => {
  expect(formatCurrency(10.01, 'USD')).toEqual({ amount: 10.01, currency: 'USD' });
});
