let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const buttons = document.querySelectorAll('[data-time]');
const buttonStop = document.querySelector('.stop');
var alarm = new Audio("/projects/pomdoro/alarmbeep.wav");
let clickSound = () => new Audio("/projects/pomdoro/click.wav").play();

function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    
    countdown = setInterval(() => {
        const secondsLeft = Math.round(then - Date.now()) / 1000;
        if(secondsLeft < 0) {
            clearInterval(countdown);
            alarm.play();
            alarm.destruct();
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
    
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = Math.floor(seconds % 60);
    const display = `${minutes < 10 ? "0" : ""}${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

function stopTimer() {
    clearInterval(countdown);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});
buttonStop.addEventListener('click', stopTimer);
