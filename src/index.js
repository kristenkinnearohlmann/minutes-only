const timeInput = document.getElementById("time");
const btnStartStop = document.getElementById("start-stop");
const btnReset = document.getElementById("reset");
const timeInputPlaceholder = timeInput.placeholder;
const timeInputActivate = "00h 00m 00s";
const timeInputAmtIndicies = [0, 1, 4, 5, 8, 9];
const timeMinSecIndicies = [0, 1, 4, 5];
let currentTimeValue = timeInputPlaceholder;
let currentTimeArr;
let keyEntered;
let isRunning = false;
let timerInterval;

const init = () => {
  resetTimerInput();
};

const startStop = (e) => {
  const timeIncrements = getInputTimeValues(
    currentTimeValue,
    timeInputAmtIndicies
  );

  if (timeIncrements.every((val) => val === "0")) return;
  if (e.target.innerText === "Start") {
    btnStartStop.innerText = "Stop";
  } else {
    currentTimeValue = timeInput.placeholder;
    timeInput.value = "";
    stopTimer();
    isRunning = false;
    return;
  }

  let inputHours;
  let inputMinutes;
  let inputSeconds;

  if (timeIncrements.length === 6) {
    inputHours = parseTimeIncrement(timeIncrements[0], timeIncrements[1]);
    inputMinutes = parseTimeIncrement(timeIncrements[2], timeIncrements[3]);
    inputSeconds = parseTimeIncrement(timeIncrements[4], timeIncrements[5]);
  } else {
    inputMinutes = parseTimeIncrement(timeIncrements[0], timeIncrements[1]);
    inputSeconds = parseTimeIncrement(timeIncrements[2], timeIncrements[3]);
  }

  if (inputHours > 0) {
    inputMinutes += inputHours * 60;
  }

  if (inputSeconds > 59) {
    inputMinutes += 1;
    inputSeconds -= 60;
  }

  timeInput.placeholder = setIncrementPlaceholder(inputMinutes, inputSeconds);
  currentTimeValue = timeInput.placeholder;
  timeInput.value = "";
  isRunning = true;
  timerInterval = setInterval(updateTimer, 1000);
};

const reset = () => {
  isRunning = false;
  currentTimeValue = "";
  btnStartStop.innerText = "Start";
  timeInput.placeholder = timeInputPlaceholder;
  stopTimer();
  resetTimerInput();
};

const resetTimerInput = () => {
  timeInput.value = "";
  timeInput.placeholder = timeInputPlaceholder;
};

const setInputCursorPosition = () => {
  timeInput.setSelectionRange(10, 10);
};

const getInputTimeValues = (timeValue, timeIndicies) => {
  currentTimeArr = timeValue.split("");

  return currentTimeArr.filter((val, idx) => {
    if (timeIndicies.includes(idx)) {
      return val;
    }
  });
};

const updateTimer = () => {
  const updateTimerVal = getInputTimeValues(
    currentTimeValue,
    timeMinSecIndicies
  );

  if (updateTimerVal.every((val) => val === "0")) {
    stopTimer();
    reset();
    return;
  }

  let inputMinutes;
  let inputSeconds;

  if (updateTimerVal.length === 4) {
    inputMinutes = parseTimeIncrement(updateTimerVal[0], updateTimerVal[1]);
    inputSeconds = parseTimeIncrement(updateTimerVal[2], updateTimerVal[3]);
  } else {
    inputMinutes = 0;
    inputSeconds = parseTimeIncrement(updateTimerVal[0], updateTimerVal[1]);
  }

  let totalNewSeconds = inputMinutes * 60 + (inputSeconds - 1);
  inputMinutes = Math.floor(totalNewSeconds / 60);
  inputSeconds = totalNewSeconds - inputMinutes * 60;

  timeInput.placeholder = setIncrementPlaceholder(inputMinutes, inputSeconds);
  currentTimeValue = timeInput.placeholder;
};

const stopTimer = () => {
  clearInterval(timerInterval);
  btnStartStop.innerText = "Start";
};

const parseTimeIncrement = (pos1, pos2) => {
  if (pos1 === "0" && pos2 === "0") return 0;

  if (pos1 === "0") {
    return parseInt(pos2);
  } else {
    return parseInt(pos1 + pos2);
  }
};

const setIncrementPlaceholder = (inputMinutes, inputSeconds) => {
  return (timeInput.placeholder = `${inputMinutes
    .toString()
    .padStart(2, 0)}m ${inputSeconds.toString().padStart(2, 0)}s`);
};

document.addEventListener("click", (e) => {
  if (e.target.id === "time" || isRunning) return;

  timeInput.value = currentTimeValue;
});

timeInput.addEventListener("click", () => {
  if (isRunning) {
    timeInput.blur();
    return;
  }

  timeInput.value.length == 0
    ? (timeInput.value = timeInputActivate)
    : (timeInput.value = timeInput.value);
  currentTimeValue = timeInput.value;
  setInputCursorPosition();
});

timeInput.addEventListener("keydown", (e) => {
  keyEntered = e.key;
});

timeInput.addEventListener("keyup", (e) => {
  // if (!parseInt(e.key) && e.key !== "0") {
  if (!parseInt(keyEntered) && keyEntered !== "0") {
    timeInput.value = currentTimeValue;
    setInputCursorPosition();
  } else {
    const timeIncrements = getInputTimeValues(
      currentTimeValue,
      timeInputAmtIndicies
    );

    timeIncrements.shift();
    timeIncrements.push(e.key);

    for (let i = timeInputAmtIndicies.length - 1; i >= 0; i--) {
      currentTimeArr[timeInputAmtIndicies[i]] = timeIncrements.pop();
    }

    currentTimeValue = currentTimeArr.join("");

    timeInput.value = currentTimeValue;
    timeInput.placeholder = currentTimeValue;
    setInputCursorPosition();
  }
});

btnStartStop.addEventListener("click", (e) => {
  startStop(e);
});

btnReset.addEventListener("click", () => {
  reset();
});

// Start app
init();
