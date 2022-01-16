const timeInput = document.getElementById("time");
const btnStartStop = document.getElementById("start-stop");
const btnReset = document.getElementById("reset");
const timeInputPlaceholder = timeInput.placeholder;
const timeInputActivate = "00h 00m 00s";
const timeInputAmtIndicies = [0, 1, 4, 5, 8, 9];
const timeDisplayAmtIndicies = [0, 1, 4, 5];
let currentTimeValue;
let currentTimeArr;
let isRunning = false;
let timerInterval;

const init = () => {
  resetTimerInput();
};

const startStop = (e) => {
  if (timeInput.value === "" && timeInput.placeholder === timeInputPlaceholder)
    return;
  if (e.target.innerText === "Start") {
    btnStartStop.innerText = "Stop";
  } else {
    btnStartStop.innerText = "Start";
    stopTimer();
    return;
  }

  const currentTimeVals = getInputTimeValues(
    currentTimeValue,
    timeInputAmtIndicies
  );

  let inputHours = parseTimeIncrement(currentTimeVals[0], currentTimeVals[1]);
  let inputMinutes = parseTimeIncrement(currentTimeVals[2], currentTimeVals[3]);
  let inputSeconds = parseTimeIncrement(currentTimeVals[4], currentTimeVals[5]);

  if (inputHours > 0) {
    inputMinutes += inputHours * 60;
  }

  if (inputSeconds > 59) {
    inputMinutes += 1;
    inputSeconds -= 60;
  }

  timeInput.placeholder = `${inputMinutes.toString()}m ${inputSeconds
    .toString()
    .padStart(2, 0)}s`;
  timeInput.value = "";
  isRunning = true;
  timerInterval = setInterval(updateTimer, 1000);
};

const reset = () => {
  isRunning = false;
  currentTimeValue = "";
  btnStartStop.innerText = "Start";
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
  console.log("Running...");
  const updateTimerVal = getInputTimeValues(
    timeInput.placeholder,
    timeDisplayAmtIndicies
  );
  console.log(updateTimerVal);
  let inputMinutes = parseTimeIncrement(updateTimerVal[0], updateTimerVal[1]);
  let inputSeconds = parseTimeIncrement(updateTimerVal[2], updateTimerVal[3]);

  console.log(inputMinutes);
  console.log(inputSeconds);
  console.log(inputMinutes * 60 + inputSeconds);
};

const stopTimer = () => {
  console.log("Stopping timer");
  clearInterval(timerInterval);
};

const parseTimeIncrement = (pos1, pos2) => {
  console.log(pos1, pos2);
  if (pos1 === "0" && pos2 === "0") return 0;

  if (pos1 === "0") {
    return parseInt(pos2);
  } else {
    return parseInt(pos1 + pos2);
  }
};

document.addEventListener("click", (e) => {
  if (e.target.id === "time" || isRunning) return;

  if (timeInput.value === "" || timeInput.value === timeInputActivate) {
    reset();
  } else {
    timeInput.value = currentTimeValue;
  }
});

timeInput.addEventListener("click", () => {
  timeInput.value.length == 0
    ? (timeInput.value = timeInputActivate)
    : (timeInput.value = timeInput.value);
  currentTimeValue = timeInput.value;
  setInputCursorPosition();
});

timeInput.addEventListener("keyup", (e) => {
  if (!parseInt(e.key) && e.key !== "0") {
    timeInput.value = currentTimeValue;
    setInputCursorPosition();
  } else {
    const currentTimeVals = getInputTimeValues(
      currentTimeValue,
      timeInputAmtIndicies
    );

    currentTimeVals.shift();
    currentTimeVals.push(e.key);

    for (let i = timeInputAmtIndicies.length - 1; i >= 0; i--) {
      currentTimeArr[timeInputAmtIndicies[i]] = currentTimeVals.pop();
    }

    currentTimeValue = currentTimeArr.join("");

    timeInput.value = currentTimeValue;
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
