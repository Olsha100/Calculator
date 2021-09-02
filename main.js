let btn = document.querySelectorAll(
  '.container__button:not(.container__button--sumup)'
);
let score = document.querySelector('.container__score');

btn.forEach((e) => e.addEventListener('click', addToEquationClick));

document.addEventListener('keydown', addToEquationKeyDown);

function addToEquationKeyDown(e) {
  if (
    //Checking if any of the following characters tries to be typed in the beggining of the equation
    (!score.textContent && /[*\/+0.=-]/.test(e.key)) ||
    //There can't be more than one decimal operator in a number
    (score.textContent.includes('.') && e.key === '.') ||
    //There can't be two operators one by one in an equation
    (/([*\/+0.=-])(?!\S)/.test(score.textContent) &&
      /([*\/+0.=-])(?!\S)/.test(e.key))
  ) {
  } else if (/[0-9+\-*\/=]/.test(e.key)) {
    score.textContent += e.key;
  }
}

function addToEquationClick(e) {
  if (
    //Checking if any of the following characters tries to be typed in the beggining of the equation
    (!score.textContent && /[*\/+0.=-]/.test(e.target.textContent)) ||
    //There can't be more than one decimal operator in a number
    (score.textContent.includes('.') && e.target.textContent === '.') ||
    //There can't be two operators one by one in an equation
    (/([*\/+0.=-])(?!\S)/.test(score.textContent) &&
      /([*\/+0.=-])(?!\S)/.test(e.target.textContent))
  ) {
  } else {
    score.textContent += e.target.textContent;
  }
}

//Cancelling

let cancel = document.querySelector('#C');

cancel.addEventListener('click', cancelEquation);
document.addEventListener('keydown', (e) => {
  if (['c', 'C', 'Escape'].includes(e.key)) {
    cancelEquation();
  }
});

function cancelEquation() {
  score.textContent = null;
}

//Solving equation

let equation = document.querySelector('#equation');

equation.addEventListener('click', solveEquation);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    solveEquation();
  }
});

function solveEquation() {
  score.textContent = eval(score.textContent);
}
