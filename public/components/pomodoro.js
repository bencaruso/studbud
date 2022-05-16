// https://freshman.tech/pomodoro-timer/

const timer = {
    pomodoro: 1,
    shortBreak: 1,
    longBreak: 1,
    longBreakInterval: 4,
    sessions: 0,
  };

let interval;

const mainButton = document.getElementById('js-btn');
mainButton.addEventListener('click', () => {
  const { action } = mainButton.dataset;
  if (action === 'start') {
    startTimer();
  } else {
    pauseTimer();
  }
});

const modeButtons = document.querySelector('.mode-buttons');
modeButtons.addEventListener('click', handleMode);

function getRemainingTime(endTime) {
    const currentTime = Date.parse(new Date());
    const difference = endTime - currentTime;
  
    const total = Number.parseInt(difference / 1000, 10);
    const minutes = Number.parseInt((total / 60) % 60, 10);
    const seconds = Number.parseInt(total % 60, 10);
  
    return {
      total,
      minutes,
      seconds,
    };
  }

function startTimer() {
    let { total } = timer.remainingTime;
    const endTime = Date.parse(new Date()) + total * 1000;

    if (timer.mode === 'pomodoro') timer.sessions++;

    mainButton.dataset.action = 'pause';

    mainButton.textContent = 'Pause';

    mainButton.classList.add('active');


    interval = setInterval(function() {
    timer.remainingTime = getRemainingTime(endTime);
    updateClock();

    total = timer.remainingTime.total;
    if (total <= 0) {
        clearInterval(interval);

        switch (timer.mode) {
            case 'pomodoro':
                if (timer.sessions % timer.longBreakInterval === 0) {
                switchMode('longBreak');
                } else {
                switchMode('shortBreak');
                }
                break;
            default:
                switchMode('pomodoro');
            }

            if (Notification.permission === 'granted') {
              const text =
                timer.mode === 'pomodoro' ? 'Time to get back to work.' : 'Time to take a break.';
              new Notification(text);
            }

            startTimer();
        }
    }, 1000);
}

function pauseTimer() {
  clearInterval(interval);

  mainButton.dataset.action = 'start';
  mainButton.textContent = 'Start';
  mainButton.classList.remove('active');
}

function updateClock() {
    const { remainingTime } = timer;
    const minutes = `${remainingTime.minutes}`.padStart(2, '0');
    const seconds = `${remainingTime.seconds}`.padStart(2, '0');
  
    const min = document.getElementById('js-minutes');
    const sec = document.getElementById('js-seconds');
    min.textContent = minutes;
    sec.textContent = seconds;

    const text = timer.mode === 'pomodoro' ? 'Pomodoro' : 'Break';
    document.title = `${text} - ${minutes}:${seconds}`;

  }

function switchMode(mode) {
    timer.mode = mode;
    timer.remainingTime = {
      total: timer[mode] * 60,
      minutes: timer[mode],
      seconds: 0,
    };
  
    document
      .querySelectorAll('button[data-mode]')
      .forEach(e => e.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
  
    updateClock();
  }

  function handleMode(event) {
    const { mode } = event.target.dataset;
  
    if (!mode) return;
  
    switchMode(mode);
    pauseTimer();
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Let's check if the browser supports notifications
    if ('Notification' in window) {
      // If notification permissions have neither been granted or denied
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        // ask the user for permission
        Notification.requestPermission().then(function(permission) {
          // If permission is granted
          if (permission === 'granted') {
            // Create a new notification
            new Notification('Awesome! You will be notified at the start of each session.');
          }
        });
      }
    }
  
    switchMode('pomodoro');
  });