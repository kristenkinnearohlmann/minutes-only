const timeInput = document.getElementById("time");

console.log("Hello world");

const startStop = () => {
  console.log("Clicked Start Stop");
};

const reset = () => {
  console.log("Clicked Reset");
};

timeInput.addEventListener("click", () => {
  console.log("Clicked time input");
});
