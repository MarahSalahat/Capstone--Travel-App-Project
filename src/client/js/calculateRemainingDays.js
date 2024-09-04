
const calculateRemainingDays = (tripDate) => {
    const now = new Date();
    const date = new Date(tripDate);

    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    const timeDiff = date - now;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
};

module.exports = { calculateRemainingDays };
