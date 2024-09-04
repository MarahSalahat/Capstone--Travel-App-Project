
const { calculateRemainingDays } = require('../js/calculateRemainingDays');

test('the remaining days from now to the date of the trip', () => {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 8); 

    const futureDateString = futureDate.toISOString().split('T')[0]; 

    const expectedDays = Math.ceil((futureDate - now) / (1000 * 60 * 60 * 24));

    expect(calculateRemainingDays(futureDateString)).toBe(expectedDays);
});
