const timeInput = document.getElementById("time");
const btnStartStop = document.getElementById("start-stop");
const btnReset = document.getElementById("reset");
const timeInputPlaceholder = timeInput.placeholder;
const timeInputActivate = "00h 00m 00s";
const timeAmtIndicies = [0, 1, 4, 5, 8, 9];
let currentTimeValue;
let currentTimeArr;
let isRunning = false;

const init = () => {
  resetTimerInput();
};

const startStop = (e) => {
  const currentTimeVals = getCurrentTimeValues();
  let inputHours = parseInt(currentTimeVals[0] + currentTimeVals[1]);
  let inputMinutes = parseInt(currentTimeVals[2] + currentTimeVals[3]);
  let inputSeconds = parseInt(currentTimeVals[4] + currentTimeVals[5]);

  console.log(e.target.innerText);

  if (inputHours > 0) {
    inputMinutes += inputHours * 60;
  }

  if (inputSeconds > 59) {
    inputMinutes += 1;
    inputSeconds -= 60;
  }

  console.log(
    `${inputMinutes.toString()}m ${inputSeconds.toString().padStart(2, 0)}s`
  );
  timeInput.placeholder = `${inputMinutes.toString()}m ${inputSeconds
    .toString()
    .padStart(2, 0)}s`;
  timeInput.value = "";
  isRunning = true;
};

const reset = () => {
  isRunning = false;
  resetTimerInput();
};

const resetTimerInput = () => {
  timeInput.value = "";
  timeInput.placeholder = timeInputPlaceholder;
};

const setInputCursorPosition = () => {
  timeInput.setSelectionRange(10, 10);
};

const getCurrentTimeValues = () => {
  currentTimeArr = currentTimeValue.split("");

  return currentTimeArr.filter((val, idx) => {
    if (timeAmtIndicies.includes(idx)) {
      return val;
    }
  });
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
    const currentTimeVals = getCurrentTimeValues();

    currentTimeVals.shift();
    currentTimeVals.push(e.key);

    for (let i = timeAmtIndicies.length - 1; i >= 0; i--) {
      currentTimeArr[timeAmtIndicies[i]] = currentTimeVals.pop();
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
