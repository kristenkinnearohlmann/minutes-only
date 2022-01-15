const timeInput = document.getElementById("time");
const timeInputPlaceholder = "0m 00s";
const timeInputActivate = "00h 00m 00s";
const timeAmtIndicies = [9, 8, 5, 4, 1, 0];
let currentTimeValue;
let currentEntryIndex;

const init = () => {
  resetTimerInput();
  currentEntryIndex = 10;
};

const startStop = () => {
  console.log("Clicked Start Stop");
  timeInput.style.border = "none";
};

const reset = () => {
  resetTimerInput();
  timeInput.style.border = "none";
};

const resetTimerInput = () => {
  timeInput.value = "";
  timeInput.placeholder = timeInputPlaceholder;
};

const setInputCursorPosition = () => {
  timeInput.setSelectionRange(10, 10);
};

timeInput.addEventListener("click", () => {
  timeInput.value.length == 0
    ? (timeInput.value = timeInputActivate)
    : (timeInput.value = timeInput.value);
  currentTimeValue = timeInput.value;
  timeInput.style.border = "1px solid blue";
  setInputCursorPosition();
});

timeInput.addEventListener("keyup", (e) => {
  let currentTimeArr = currentTimeValue.split("");
  let currentUpdateIndex = timeAmtIndicies.find(
    (idx) => currentTimeArr[idx] === "0"
  );
  console.log(currentUpdateIndex);

  currentTimeArr[currentUpdateIndex] = e.key;
  timeInput.value = currentTimeArr.join("");
  setInputCursorPosition();
});

// Start app
init();
