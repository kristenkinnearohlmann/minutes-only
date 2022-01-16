const timeInput = document.getElementById("time");
const timeInputPlaceholder = "0m 00s";
const timeInputActivate = "00h 00m 00s";
const timeAmtIndicies = [0, 1, 4, 5, 8, 9];
let currentTimeValue;
let currentTimeArr;

const init = () => {
  resetTimerInput();
};

const startStop = () => {
  console.log("Clicked Start Stop");
  console.log(currentTimeValue);
  const currentTimeVals = getCurrentTimeValues();
  console.log(currentTimeVals);
  console.log(currentTimeVals[0], currentTimeVals[1]);
  console.log(currentTimeVals[2], currentTimeVals[3]);
  console.log(currentTimeVals[4], currentTimeVals[5]);
};

const reset = () => {
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
  if (e.target.id === "time") return;

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
  console.log(e.key);
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

// Start app
init();
