const timeEntry = document.getElementById("time-entry");
const timeActivatePlaceholder = "00h 00m 00|s";
const timeInputAmtIndicies = [0, 1, 4, 5, 8, 9];
let inputTimeArray = [];
let timeIncrements = [];
let entryTime = [];
// const timeInput = document.getElementById("time");
// const timeInputNew = document.getElementById("time-new");
// const timeInputNew2 = document.getElementById("time-new-entry");
// const btnStartStop = document.getElementById("start-stop");
// const btnReset = document.getElementById("reset");
// const timeInputPlaceholder = timeInput.placeholder;

// const timeMinSecIndicies = [0, 1, 4, 5];
// // let currentTimeValue = timeInputPlaceholder;
// let currentTimeValue = timeInputActivate;
// let currentTimeArr;
// let keyEntered;
// let isRunning = false;
// let timerInterval;
// let isActiveTimeEntry = false;

const init = () => {};

// const startStop = (e) => {
//   const timeIncrements = getInputTimeValues(
//     currentTimeValue,
//     timeInputAmtIndicies
//   );

//   if (timeIncrements.every((val) => val === "0")) return;
//   if (e.target.innerText === "Start") {
//     btnStartStop.innerText = "Stop";
//   } else {
//     currentTimeValue = timeInput.placeholder;
//     timeInput.value = "";
//     stopTimer();
//     isRunning = false;
//     return;
//   }

//   let inputHours;
//   let inputMinutes;
//   let inputSeconds;

//   if (timeIncrements.length === 6) {
//     inputHours = parseTimeIncrement(timeIncrements[0], timeIncrements[1]);
//     inputMinutes = parseTimeIncrement(timeIncrements[2], timeIncrements[3]);
//     inputSeconds = parseTimeIncrement(timeIncrements[4], timeIncrements[5]);
//   } else {
//     inputMinutes = parseTimeIncrement(timeIncrements[0], timeIncrements[1]);
//     inputSeconds = parseTimeIncrement(timeIncrements[2], timeIncrements[3]);
//   }

//   if (inputHours > 0) {
//     inputMinutes += inputHours * 60;
//   }

//   if (inputSeconds > 59) {
//     inputMinutes += 1;
//     inputSeconds -= 60;
//   }

//   timeInput.placeholder = setIncrementPlaceholder(inputMinutes, inputSeconds);
//   currentTimeValue = timeInput.placeholder;
//   timeInput.value = "";
//   isRunning = true;
//   timerInterval = setInterval(updateTimer, 1000);
// };

// const reset = () => {
//   isRunning = false;
//   currentTimeValue = "";
//   btnStartStop.innerText = "Start";
//   timeInput.placeholder = timeInputPlaceholder;
//   stopTimer();
//   resetTimerInput();
// };

// const resetTimerInput = () => {
//   timeInput.value = "";
//   timeInput.placeholder = timeInputPlaceholder;
// };

// const setInputCursorPosition = () => {
//   timeInput.setSelectionRange(10, 10);
// };

// const updateTimer = () => {
//   const updateTimerVal = getInputTimeValues(
//     currentTimeValue,
//     timeMinSecIndicies
//   );

//   if (updateTimerVal.every((val) => val === "0")) {
//     stopTimer();
//     reset();
//     return;
//   }

//   let inputMinutes;
//   let inputSeconds;

//   if (updateTimerVal.length === 4) {
//     inputMinutes = parseTimeIncrement(updateTimerVal[0], updateTimerVal[1]);
//     inputSeconds = parseTimeIncrement(updateTimerVal[2], updateTimerVal[3]);
//   } else {
//     inputMinutes = 0;
//     inputSeconds = parseTimeIncrement(updateTimerVal[0], updateTimerVal[1]);
//   }

//   let totalNewSeconds = inputMinutes * 60 + (inputSeconds - 1);
//   inputMinutes = Math.floor(totalNewSeconds / 60);
//   inputSeconds = totalNewSeconds - inputMinutes * 60;

//   timeInput.placeholder = setIncrementPlaceholder(inputMinutes, inputSeconds);
//   currentTimeValue = timeInput.placeholder;
// };

// const stopTimer = () => {
//   clearInterval(timerInterval);
//   btnStartStop.innerText = "Start";
// };

// const parseTimeIncrement = (pos1, pos2) => {
//   if (pos1 === "0" && pos2 === "0") return 0;

//   if (pos1 === "0") {
//     return parseInt(pos2);
//   } else {
//     return parseInt(pos1 + pos2);
//   }
// };

// const setIncrementPlaceholder = (inputMinutes, inputSeconds) => {
//   return (timeInput.placeholder = `${inputMinutes
//     .toString()
//     .padStart(2, 0)}m ${inputSeconds.toString().padStart(2, 0)}s`);
// };

// document.addEventListener("click", (e) => {
//   if (e.target.id === "time" || isRunning) return;

//   timeInput.value = currentTimeValue;
// });

// timeInput.addEventListener("click", () => {
//   if (isRunning) {
//     timeInput.blur();
//     return;
//   }

//   timeInput.value.length == 0
//     ? (timeInput.value = timeInputActivate)
//     : (timeInput.value = timeInput.value);
//   currentTimeValue = timeInput.value;
//   setInputCursorPosition();
// });

// timeInput.addEventListener("keyup", (e) => {
//   if (!parseInt(e.key) && e.key !== "0") {
//     timeInput.value = currentTimeValue;
//     setInputCursorPosition();
//   } else {
//     const timeIncrements = getInputTimeValues(
//       currentTimeValue,
//       timeInputAmtIndicies
//     );

//     timeIncrements.shift();
//     timeIncrements.push(e.key);

//     for (let i = timeInputAmtIndicies.length - 1; i >= 0; i--) {
//       currentTimeArr[timeInputAmtIndicies[i]] = timeIncrements.pop();
//     }

//     currentTimeValue = currentTimeArr.join("");

//     timeInput.value = currentTimeValue;
//     timeInput.placeholder = currentTimeValue;
//     setInputCursorPosition();
//   }
// });

// timeInputNew.addEventListener("click", () => {
//   console.log("Clicked time-new");
//   timeInputNew.innerHTML = `<span>0</span><span>0</span><span>h</span><span>&nbsp;</span><span>0</span><span>0</span><span>m</span><span>&nbsp;</span><span>0</span><span>0</span><span>s</span>`;

//   timeInputNew.getElementsByTagName("span")[9].style.borderRight =
//     "1px solid black";

//   isActiveTimeEntry = true;
// });

// timeInputNew2.addEventListener("click", () => {
//   timeInputNew2.placeholder = "00h 00m 00|s";
//
// });

// timeInputNew2.addEventListener("keyup", (e) => {
//   timeInputNew2.placeholder = `00h 00m 0${e.key}s`;
//   timeInputNew2.value = "";
// });

// document.addEventListener("keyup", (e) => {
//   if (isActiveTimeEntry) {
//     console.log("Key is up");
//     document.getElementById("mind-it").textContent = e.key;

//     console.log(e.key);
//     const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//     if (nums.includes(parseInt(e.key))) {
//       console.log("It's a number");
//     }
//     const newInputs = Array.from(timeInputNew.getElementsByTagName("span"));
//     const timeIncrements = getInputTimeValues(
//       currentTimeValue,
//       timeInputAmtIndicies
//     );

//     timeIncrements.shift();
//     timeIncrements.push(e.key);

//     for (let i = timeInputAmtIndicies.length - 1; i >= 0; i--) {
//       currentTimeArr[timeInputAmtIndicies[i]] = timeIncrements.pop();
//     }

//     console.log(currentTimeArr);
//     document.getElementById("mind-it").textContent = e.key;
//     currentTimeValue = currentTimeArr.join("");
//     console.log(currentTimeValue);

//     newInputs.forEach((item) => {
//       item.textContent = currentTimeArr.shift();
//     });
//   }
// });

// timeInputNew2.addEventListener("keyup", (e) => {
//   console.log(e.key);

//   const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//   if (nums.includes(parseInt(e.key))) {
//     console.log("It's a number");
//   }
//   const newInputs = Array.from(timeInputNew.getElementsByTagName("span"));
//   // let nextIndex;
//   // if (newInputs.length === 11) {
//   //   newInputs.forEach((item, idx) => {
//   //     if (parseInt(item.textContent) && parseInt(item.textContent) !== 0) {
//   //       console.log(idx);
//   //       nextIndex = idx;
//   //     }
//   //   });

//   //   console.log(nextIndex - 1);
//   //   i = nextIndex - 1;
//   //   while (i < 9) {
//   //     newInputs[i].textContent = newInputs[i + 1].textContent;
//   //     i++;
//   //   }
//   //   newInputs[9].textContent = e.key;
//   //   newInputs.forEach((item) => {
//   //     console.log(item.textContent);
//   //   });

//   // const inputTimeValue = newInputs.map((item) => item.textContent).join("");

//   const timeIncrements = getInputTimeValues(
//     currentTimeValue,
//     timeInputAmtIndicies
//   );

//   timeIncrements.shift();
//   timeIncrements.push(e.key);

//   for (let i = timeInputAmtIndicies.length - 1; i >= 0; i--) {
//     currentTimeArr[timeInputAmtIndicies[i]] = timeIncrements.pop();
//   }

//   console.log(currentTimeArr);
//   document.getElementById("mind-it").textContent = e.key;
//   currentTimeValue = currentTimeArr.join("");
//   console.log(currentTimeValue);

//   newInputs.forEach((item) => {
//     item.textContent = currentTimeArr.shift();
//   });

//   // const entrySpans = Array.from(timeInputNew.getElementsByTagName("span"));
//   // console.log(entrySpans);
//   // console.log(timeInputNew.getElementsByTagName("span")[9].innerText);
//   // timeInputNew.getElementsByTagName("span")[8].outerText =
//   //   entrySpans[9].outerText;
//   // timeInputNew.getElementsByTagName("span")[9].outerText = e.key;
// });

// functions
const getInputTimeArray = (timeValue, timeIndicies) => {
  return timeValue.split("").filter((val, idx) => {
    if (timeIndicies.includes(idx)) {
      return val;
    }
  });
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

// event listeners
timeEntry.addEventListener("click", () => {
  timeEntry.placeholder = timeActivatePlaceholder;
});

timeEntry.addEventListener("keyup", (e) => {
  // TODO: Add check for number key
  timeIncrements = getInputTimeArray(
    timeEntry.placeholder,
    timeInputAmtIndicies
  );
  timeIncrements.shift();
  timeIncrements.push(e.key);

  timeEntry.placeholder = setDisplayPlaceholder(
    timeIncrements,
    timeInputAmtIndicies,
    timeActivatePlaceholder
  );
  timeEntry.value = "";
  // for (let i = timeInputAmtIndicies.length - 1; i >= 0; i--) {
  //   newTime[timeInputAmtIndicies[i]] = timeIncrements.pop();
  // }
  // TODO: Reset placeholder and remove value
});

// btnStartStop.addEventListener("click", (e) => {
//   startStop(e);
// });

// btnReset.addEventListener("click", () => {
//   reset();
// });

// Start app
init();
