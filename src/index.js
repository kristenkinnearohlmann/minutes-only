const timeEntry = document.getElementById("time-entry");
const timeEntryPlaceholder = timeEntry.placeholder;
const timeEntryActivatePlaceholder = "00h 00m 00|s";
const timeInputAmtIndicies = [0, 1, 4, 5, 8, 9];
const btnStartStop = document.getElementById("start-stop");
const btnReset = document.getElementById("reset");
let isRunning;
let inputTimeArray = [];
let timeIncrements = [];
let entryTime = [];

const init = () => {
  isRunning = false;
};

// functions
const getInputTimeArray = (timeValue, timeIndicies) => {
  return timeValue.split("").filter((val, idx) => {
    if (timeIndicies.includes(idx)) {
      return val;
    }
  });
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

const timerStart = () => {
  isRunning = true;
  btnStartStop.innerText = "Stop";
};

const timerStop = () => {
  isRunning = false;
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
