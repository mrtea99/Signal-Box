const millisecondsPerMinute = 60000;
const millisecondsPerHour = millisecondsPerMinute * 60;
const shiftTimes = {
  morning: millisecondsPerHour * 9,
  noon: millisecondsPerHour * 12,
  afternoon: millisecondsPerHour * 15,
};

//Calculate time at midnight, so shift time can be added to it
function dateToMidnight(time) {
  const date = new Date(time);

  const dateMidnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0
  );

  const timezoneOffset =
    dateMidnight.getTimezoneOffset() * -1 * millisecondsPerMinute;
  const dateTime = dateMidnight.getTime() + timezoneOffset;

  return dateTime;
}

function getShiftTime(shiftName, baseTime) {
  const baseDateTime = dateToMidnight(baseTime);

  // const baseDateTime = baseTime
  // ? dateToMidnight(baseTime)
  // : dateToMidnight(Date.now().getTime());

  switch (shiftName) {
    case "morning":
      return baseDateTime + shiftTimes.morning;
    case "noon":
      return baseDateTime + shiftTimes.noon;
    case "afternoon":
      return baseDateTime + shiftTimes.afternoon;
    default:
      return undefined;
  }
}

function getShiftName(givenDateString) {
  const givenTime = new Date(givenDateString).getTime();

  const timeMidnight = dateToMidnight(givenTime);

  const timeRemaining = givenTime - timeMidnight;

  return Object.keys(shiftTimes).find((key) => {
    return timeRemaining === shiftTimes[key] ? key : undefined;
  });
}

export { getShiftTime, getShiftName };
