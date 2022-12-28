export const getNumberOfDays = () => {
    const date1 = new Date(2022,6,15,0,0,1);
    const date2 = new Date();

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();
    // console.log(diffInTime);
    // console.log(date2.getTime());
    // console.log(date1.getTime());
    // console.log(date1)
    // Calculating the no. of days between two dates
    const diffInDays = Math.floor(diffInTime / oneDay);
    console.log(diffInDays);
    return diffInDays;
};

export const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};
