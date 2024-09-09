const { calculateRemainingDays } = require('../js/calculateRemainingDays');

describe('calculateRemainingDays function', () => {

    test('returns correct remaining days for a trip 8 days in the future', () => {
        const now = new Date();
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 8); 

        const futureDateString = futureDate.toISOString().split('T')[0]; 

        const expectedDays = Math.ceil((futureDate - now) / (1000 * 60 * 60 * 24));

        expect(calculateRemainingDays(futureDateString)).toBe(expectedDays);
    });


    test('returns correct remaining days for a trip 1 day in the future', () => {
        const now = new Date();
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1); 

        const futureDateString = futureDate.toISOString().split('T')[0]; 

        const expectedDays = Math.ceil((futureDate - now) / (1000 * 60 * 60 * 24));

        expect(calculateRemainingDays(futureDateString)).toBe(expectedDays);
    });

  

    test('returns correct remaining days for a trip 365 days in the future', () => {
        const now = new Date();
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 365); 

        const futureDateString = futureDate.toISOString().split('T')[0]; 

        const expectedDays = Math.ceil((futureDate - now) / (1000 * 60 * 60 * 24));

        expect(calculateRemainingDays(futureDateString)).toBe(expectedDays);
    });

});
