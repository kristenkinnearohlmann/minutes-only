const timeEntry = document.getElementById("time-entry");
const timeEntryPlaceholder = timeEntry.placeholder;
const timeEntryActivatePlaceholder = "00h 00m 00|s";
const timeInputAmtIndicies = [0, 1, 4, 5, 8, 9];
const timeMinSecIndicies = [0, 1, 4, 5];
const btnStartStop = document.getElementById("start-stop");
const btnReset = document.getElementById("reset");
let isRunning;
let timeRemaining = [];
let inputTimeArray = [];
let timeIncrements = [];
let entryTime = [];
let inputHours;
let inputMinutes;
let inputSeconds;

const init = () => {
  isRunning = false;
};

// functions
const convertTimeValue = (timeValues) => {
  console.log(timeValues);
  console.log(timeValues.length);

  if (timeValues.length === 6) {
    inputHours = parseTimeIncrement(timeValues[0], timeValues[1]);
    inputMinutes = parseTimeIncrement(timeValues[2], timeValues[3]);
    inputSeconds = parseTimeIncrement(timeValues[4], timeValues[5]);
  } else if (timeValues.length === 4) {
    inputMinutes = parseTimeIncrement(timeValues[0], timeValues[1]);
    inputSeconds = parseTimeIncrement(timeValues[2], timeValues[3]);
  } else {
    inputMinutes = 0;
    inputSeconds = parseTimeIncrement(timeValues[0], timeValues[1]);
  }
};

const getInputTimeArray = (entryTimeValue, timeIndicies) => {
  return entryTimeValue.split("").filter((val, idx) => {
    if (timeIndicies.includes(idx)) {
      return val;
    }
  });
};

const parseTimeIncrement = (pos1, pos2) => {
  if (pos1 === "0" && pos2 === "0") return 0;

  if (pos1 === "0") {
    return parseInt(pos2);
  } else {
    return parseInt(pos1 + pos2);
  }
};

const reset = () => {
  timerStop();
  resetTimerInput();
};

const resetTimerInput = () => {
  timeEntry.value = "";
  timeEntry.placeholder = timeEntryPlaceholder;
};

const setDisplayPlaceholder = (
  displayTimeValues,
  timeIndicies,
  displayTime
) => {
  displayTime = displayTime.split("");

  timeIndicies.forEach((idx) => {
    displayTime[idx] = displayTimeValues.shift();
  });

  return displayTime.join("");
};

const setTimerValue = (timeValueEntered) => {
  timeIncrements = getInputTimeArray(
    timeEntry.placeholder,
    timeInputAmtIndicies
  );

  timeRemaining = convertEntryTime(timeIncrements);
  console.log(timeRemaining);
};

const timerStart = () => {
  isRunning = true;
  setTimerValue(timeEntry.placeholder);
  btnStartStop.innerText = "Stop";
};

const timerStop = () => {
  // TODO: clearInterval(timeInterval)
  isRunning = false;
  console.log(timeEntry.placeholder);
  btnStartStop.innerText = "Start";
};

const updateDisplayPlaceholder = (key) => {
  timeIncrements = getInputTimeArray(
    timeEntry.placeholder,
    timeInputAmtIndicies
  );
  timeIncrements.shift();
  timeIncrements.push(key);

  timeEntry.placeholder = setDisplayPlaceholder(
    timeIncrements,
    timeInputAmtIndicies,
    timeEntryActivatePlaceholder
  );
  timeEntry.value = "";
};

// event listeners
timeEntry.addEventListener("click", () => {
  timeEntry.placeholder = timeEntryActivatePlaceholder;
});

timeEntry.addEventListener("keyup", (e) => {
  if (e.key.match(/[0-9]/g)) {
    updateDisplayPlaceholder(parseInt(e.key));
  } else {
    timeEntry.value = "";
  }
});

btnStartStop.addEventListener("click", (e) => {
  e.target.textContent === "Start" ? timerStart() : timerStop();
});

btnReset.addEventListener("click", () => {
  reset();
});

// Start app
init();
