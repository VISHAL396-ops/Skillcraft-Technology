// DOM Elements
const timeDisplay = document.getElementById('timeDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

// Stopwatch state variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 1;

// --- Core Functions ---

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10); // Update every 10ms for accuracy

    // Update button visibility
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    lapBtn.disabled = false;
}

function pauseTimer() {
    if (!isRunning) return;
    isRunning = false;
    
    clearInterval(timerInterval);
    
    // Update button visibility
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
}

function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    
    elapsedTime = 0;
    startTime = 0;
    lapCounter = 1;
    
    timeDisplay.textContent = '00:00:00.00';
    lapsList.innerHTML = '';
    
    // Update button visibility
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    lapBtn.disabled = true;
}

function recordLap() {
    if (!isRunning) return;
    
    const lapTime = formatTime(elapsedTime);
    
    const li = document.createElement('li');
    li.innerHTML = `<span class="lap-number">Lap ${lapCounter}</span> <span>${lapTime}</span>`;
    lapsList.prepend(li); // Add new laps to the top
    
    lapCounter++;
}


// --- Helper Functions ---

function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const totalMilliseconds = time % 1000;
    const totalSeconds = Math.floor(time / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    const milliseconds = Math.floor(totalMilliseconds / 10).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    const minutes = (totalMinutes % 60).toString().padStart(2, '0');
    const hours = totalHours.toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}


// --- Event Listeners ---
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

// --- Initial State ---
lapBtn.disabled = true; // Lap button should be disabled at the start