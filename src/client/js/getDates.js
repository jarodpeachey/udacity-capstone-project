export const getAllDates = (startDate, endDate) => {
  console.log('Start: ', startDate);
  console.log('End: ', endDate);

  let datesArray = new Array();
  let currentDate = startDate;

  while (currentDate <= endDate) {
    // Adding the date to array
    datesArray.push(Math.floor(new Date(currentDate).getTime() / 1000));

    // Increment the date by 1 day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return datesArray;
};
