const timeInput = document.getElementById("time");
const timeInputPlaceholder = "0m 00s";
const timeInputActivate = "00h 00m 00s";
const timeAmtIndicies = [0, 1, 4, 5, 8, 9];
let currentTimeValue;

const init = () => {
  resetTimerInput();
};

const startStop = () => {
  console.log("Clicked Start Stop");
  console.log(currentTimeValue);
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
  if (!parseInt(e.key)) {
    timeInput.value = currentTimeValue;
    setInputCursorPosition();
  } else {
    let currentTimeArr = currentTimeValue.split("");

    const currentTimeVals = currentTimeArr.filter((val, idx) => {
      if (timeAmtIndicies.includes(idx)) {
        return val;
      }
    });

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
