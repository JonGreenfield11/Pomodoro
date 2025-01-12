let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');
const toggleModeButton = document.getElementById('toggle-mode');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');
    minutesDisplay.textContent = minutesStr;
    secondsDisplay.textContent = secondsStr;
    
    // Update title
    const newTitle = `${minutesStr}:${secondsStr} - Pomodoro Timer`;
    if (document.title !== newTitle) {
        document.title = newTitle;
    }
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                isWorkTime = !isWorkTime;
                timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
                statusText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
                toggleModeButton.textContent = isWorkTime ? 'Switch to Break' : 'Switch to Work';
                updateDisplay();
                alert(isWorkTime ? 'Work Time!' : 'Break Time!');
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    // Keep the current mode but reset the time
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    updateDisplay();
}

function toggleMode() {
    if (timerId !== null) {
        // Don't allow mode switch while timer is running
        return;
    }
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    statusText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    toggleModeButton.textContent = isWorkTime ? 'Switch to Break' : 'Switch to Work';
    updateDisplay();
}

// Remove any existing favicons and set empty favicon
const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
existingFavicons.forEach(favicon => favicon.remove());
const emptyFavicon = document.createElement('link');
emptyFavicon.rel = 'icon';
emptyFavicon.href = 'data:,';  // Empty favicon
document.head.appendChild(emptyFavicon);

// Initialize the timer
timeLeft = 25 * 60;
updateDisplay();

// Event listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
toggleModeButton.addEventListener('click', toggleMode); 