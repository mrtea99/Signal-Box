const millisecondsPerMinute = 60000;
const millisecondsPerHour = millisecondsPerMinute * 60;
const shiftTimes = [
  {
    name: "morning",
    start: millisecondsPerHour * 9,
    end: millisecondsPerHour * 12 - 1,
  },
  {
    name: "noon",
    start: millisecondsPerHour * 12,
    end: millisecondsPerHour * 15 - 1,
  },
  {
    name: "afternoon",
    start: millisecondsPerHour * 15,
    end: millisecondsPerHour * 18 - 1,
  },
  {
    name: "evening",
    start: millisecondsPerHour * 16,
    end: millisecondsPerHour * 24 - 1,
  },
];

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

  // const timezoneOffset =
  //   dateMidnight.getTimezoneOffset() * -1 * millisecondsPerMinute;
  // const dateTime = dateMidnight.getTime() + timezoneOffset;

  // return dateTime;

  return dateMidnight.getTime();
}

function getShiftTime(shiftName, baseTime) {
  const baseDateTime = dateToMidnight(baseTime);

  switch (shiftName) {
    case "next":
      const currentShiftIndex = shiftTimes.indexOf(
        shiftTimes.find((shift) => shift.name === getShiftName(baseTime))
      );

      const nextShiftIndex =
        currentShiftIndex === shiftTimes.length ? 0 : currentShiftIndex + 1;

      return baseDateTime + shiftTimes[nextShiftIndex].start;
    case "tomorrow":
      return (
        baseDateTime +
        millisecondsPerHour * 24 +
        shiftTimes.find((shift) => shift.name === "morning").start
      );
    default:
      return (
        baseDateTime +
          shiftTimes.find((shift) => shift.name === shiftName).start ||
        undefined
      );
  }
}

function getShiftName(givenDateString) {
  const givenTime = new Date(givenDateString).getTime();

  const timeMidnight = dateToMidnight(givenTime);

  const timeRemaining = givenTime - timeMidnight;

  const currentShift = shiftTimes.find((shift) => {
    return timeRemaining >= shift.start && timeRemaining <= shift.end;
  });

  return currentShift ? currentShift.name : undefined;
}

export { getShiftTime, getShiftName };
