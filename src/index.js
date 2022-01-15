const timeInput = document.getElementById("time");
const timeInputPlaceholder = "0m 00s";

console.log("Hello world");

const init = () => {
  resetTimerInput();
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
  timeInput.placeholder = timeInputPlaceholder;
};

timeInput.addEventListener("click", () => {
  timeInput.placeholder = "00h 00m 00s";
  timeInput.style.border = "1px solid blue";
});

// Start app
init();
