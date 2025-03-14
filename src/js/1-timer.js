import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const mainInp = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');

button.addEventListener('click', setTimer);
const todayDate = new Date();
let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: todayDate,
  minuteIncrement: 1,

  onClose(SelectedDate) {
    if (SelectedDate[0].getTime() <= Date.now()) {
      iziToast.show({
        title: '',
        message: `Please choose the date in the future.`,
        messageColor: 'white',
        backgroundColor: '#E25757',
        position: 'topRight',
      });
    } else {
      userSelectedDate = SelectedDate[0];
      updateDate(userSelectedDate.getTime() - Date.now());
      button.removeAttribute('disabled');
    }
  },
};

flatpickr(mainInp, options);

function setTimer() {
  if (userSelectedDate !== undefined) {
    button.setAttribute('disabled', '');
    const currentTime = Date.now();
    let timeDiff = userSelectedDate.getTime() - currentTime;
    updateDate(timeDiff);
    const timer = setInterval(() => {
      const time = Date.now();
      timeDiff = userSelectedDate.getTime() - time;
      if (timeDiff < 0) {
        clearInterval(timer);
        button.removeAttribute('disabled');
        iziToast.show({
          title: '',
          message: `Time is up`,
          messageColor: 'white',
          backgroundColor: '#57E29A',
          position: 'topRight',
        });
        return;
      }
      updateDate(timeDiff);
    }, 1000);
  }
}
function updateDate(timeDiff) {
  const { days, hours, minutes, seconds } = convertMs(timeDiff);

  spanDays.textContent = days.toString().padStart(2, '0');
  spanHours.textContent = hours.toString().padStart(2, '0');
  spanMinutes.textContent = minutes.toString().padStart(2, '0');
  spanSeconds.textContent = seconds.toString().padStart(2, '0');
}
