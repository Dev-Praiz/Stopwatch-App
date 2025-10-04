let startTime = 0;
let running = false;
let timer = null;
let lapCount = 0;

function updateDisplay() {
  const now = Date.now() - startTime;
  let hours = Math.floor(now / 3600000);
  let minutes = Math.floor((now % 3600000) / 60000);
  let seconds = Math.floor((now % 60000) / 1000);
  let milliseconds = now % 1000;

  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  if (milliseconds < 100) {
    if (milliseconds < 10) {
      milliseconds = "00" + milliseconds;
    } else {
      milliseconds = "0" + milliseconds;
    }
  }

  document.getElementById("display").innerText =
    hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function start() {
  if (!running) {
    startTime = Date.now() - (startTime ? (Date.now() - startTime) : 0);
    timer = setInterval(updateDisplay, 10);
    running = true;
  }
}

function stop() {
  if (running) {
    clearInterval(timer);
    running = false;
  }
}

function reset() {
  clearInterval(timer);
  running = false;
  startTime = 0;
  document.getElementById("display").innerText = "00:00:00.000";
  document.getElementById("laps").innerHTML = "";
  lapCount = 0;
}

function lap() {
  if (running) {
    lapCount++;
    const lapTime = document.getElementById("display").innerText;
    const lapsDiv = document.getElementById("laps");
    const lapEntry = document.createElement("div");
    lapEntry.innerText = "Lap " + lapCount + ": " + lapTime;
    lapsDiv.prepend(lapEntry);
  }
}
