// new CountdownTimer({
//   selector: '#timer-1',
//   targetDate: new Date('Nov 11, 2020'),
// });

const refs = {
  days: document.querySelector('span[data-value="days"]'),
  hours: document.querySelector('span[data-value="hours"]'),
  mins: document.querySelector('span[data-value="mins"]'),
  secs: document.querySelector('span[data-value="secs"]'),
  timerFace: document.querySelector('#timer-1')
}

const countdownTimer = {
  start() {
    // const startTime = Date.now();
    const targetTime = new Date(2022, 10, 11, 12, 0, 0, 0);

    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = targetTime - currentTime;
      const { days, hours, mins, secs } = getTimeComponents(deltaTime);

      updateTimerFace({ days, hours, mins, secs });

      console.log(`${days}:${hours}:${mins}:${secs}`);
    }, 1000);
  },
};

countdownTimer.start();

function updateTimerFace({ days, hours, mins, secs }) {
  refs.days.textContent = `${days}`,
    refs.hours.textContent = `${hours}`,
    refs.mins.textContent = `${mins}`,
    refs.secs.textContent = `${secs}`;
  // refs.timerFacetextContent = `${days}:${hours}:${mins}:${secs}`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

// function padDays(value) {
//   return String(value).padStart(3, '0');
// }
// Для подсчета значений используй следующие готовые формулы,
// где time - разница между targetDate и текущей датой.
function getTimeComponents(time) {
  /*
   * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
   * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
   */
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));

  /*
   * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
   * остатка % и делим его на количество миллисекунд в одном часе
   * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
   */
  const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

  /*
   * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
   * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
   */
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

  /*
   * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
   * миллисекунд в одной секунде (1000)
   */
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
}