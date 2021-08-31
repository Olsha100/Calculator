let btn = document.querySelectorAll(
  '.container__button:not(.container__button--sumup)'
);
let score = document.querySelector('.container__score');

for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', addToEquation, false);
}

function addToEquation(e) {
  if (
    //Checking if any of the following characters tries to be typed in the beggining of the equation
    (!score.textContent && /[*\/+0.00=-]/.test(e.target.textContent)) ||
    //There can't be more than one decimal operator in a number
    (score.textContent.includes('.') && e.target.textContent === '.') ||
    //There can't be two operators one by one in an equation
    (/([*\/+0.00=-])(?!\S)/.test(score.textContent) &&
      /([*\/+0.00=-])(?!\S)/.test(e.target.textContent))
  ) {
  } else {
    score.textContent += e.target.textContent;
  }
}

let cancel = document.querySelector('#C');
cancel.addEventListener(
  'click',
  () => {
    score.textContent = null;
  },
  false
);

let equation = document.querySelector('#equation');
equation.addEventListener('click', () => {
  score.textContent = eval(score.textContent);
});
