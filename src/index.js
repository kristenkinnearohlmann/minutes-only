const MINUTES_ONLY_KEY = "minutes-only-timer";
const timeEntry = document.getElementById("time-entry");
const timeEntryPlaceholder = timeEntry.placeholder;
const timeEntryActivatePlaceholder = "00h 00m 00|s";
const timeInputAmtIndicies = [0, 1, 4, 5, 8, 9];
const timeMinSecIndicies = [0, 1, 4, 5];
const btnStartStop = document.getElementById("start-stop");
const btnReset = document.getElementById("reset");
let timeRemaining = timeEntryPlaceholder;
let isRunning;
let timerInterval;
let inputTimeArray = [];
let timeIncrements = [];

const init = () => {
  isRunning = false;
};

// functions
const getSecondsRemaining = (timeValues, decrement = 0) => {
  let inputHours;
  let inputMinutes;
  let inputSeconds;
  let totalSeconds = 0;

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

  totalSeconds += inputHours > 0 ? inputHours * 60 * 60 : 0;
  totalSeconds += inputMinutes > 0 ? inputMinutes * 60 : 0;
  totalSeconds += inputSeconds > 0 ? inputSeconds : 0;
  totalSeconds -= decrement;

  return totalSeconds;
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

const setTimeRemaining = (totalSeconds) => {
  let timerMinutes = Math.floor(totalSeconds / 60);
  let timerSeconds = totalSeconds - timerMinutes * 60;

  return `${timerMinutes.toString().padStart(2, 0)}m ${timerSeconds
    .toString()
    .padStart(2, 0)}s`;
};

const setTimerCookie = (secondsRemaining) => {
  window.sessionStorage.setItem(MINUTES_ONLY_KEY, secondsRemaining);
};

const setTimerValue = (timeValueEntered, decrement = 0) => {
  timeIncrements = getInputTimeArray(timeValueEntered, timeInputAmtIndicies);

  let secondsRemaining = getSecondsRemaining(timeIncrements, decrement);

  timeRemaining = setTimeRemaining(
    // getSecondsRemaining(timeIncrements, decrement)
    secondsRemaining
  );

  timeEntry.placeholder = timeRemaining;

  return secondsRemaining;
};

const timerStart = () => {
  let secondsRemaining = setTimerValue(timeEntry.placeholder);

  setTimerCookie(secondsRemaining);

  if (timeRemaining === timeEntryPlaceholder) return;
  isRunning = true;
  timeEntry.disabled = true;
  timerInterval = setInterval(updateTimer, 1000);
  btnStartStop.innerText = "Stop";
};

const timerStop = () => {
  window.sessionStorage.removeItem(MINUTES_ONLY_KEY);
  clearInterval(timerInterval);
  isRunning = false;
  timeEntry.disabled = false;
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

const updateTimer = () => {
  let secondsRemaining = setTimerValue(timeEntry.placeholder, 1);

  if (
    timeRemaining
      .split("")
      .filter((val) => val.match(/[0-9]/g))
      .every((val) => val === "0")
  ) {
    timerStop();
    new Audio(
      "./assets/skyclad_sound_gong_sound_design_muffled_low_heavy_ponderous_262.mp3"
    ).play();
  } else {
    console.log(secondsRemaining);
    setTimerCookie(secondsRemaining);
  }
};

// event listeners
btnStartStop.addEventListener("click", (e) => {
  e.target.textContent === "Start" ? timerStart() : timerStop();
});

btnReset.addEventListener("click", () => {
  reset();
});

document.addEventListener("click", (e) => {
  if (!["reset", "start-stop", "time-entry"].includes(e.target.id)) {
    setTimerValue(timeEntry.placeholder);
  }
});

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

// Start app
init();
