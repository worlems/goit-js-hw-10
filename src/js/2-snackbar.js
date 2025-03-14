import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('form'),
  delayInput: document.querySelector('input[type="number"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
};

const createPromise = (isFulfilled, delay) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      isFulfilled ? resolve(delay) : reject(delay);
    }, delay);
  });

refs.form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(refs.delayInput.value);
  const selectedRadio = document.querySelector('input[type="radio"]:checked');

  const isFulfilled = selectedRadio.value === 'fulfilled';

  createPromise(isFulfilled, delay)
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        messageColor: 'white',
        backgroundColor: '#E25757',
        position: 'topRight',
      });
    });
  refs.delayInput.value = '';
});

refs.delayInput.addEventListener('input', () => {
  refs.submitBtn.disabled =
    refs.delayInput.value.trim() === '' || Number(refs.delayInput.value) <= 0;
});
