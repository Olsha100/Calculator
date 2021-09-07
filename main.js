let btn = document.querySelectorAll(
  '.container__button:not(.container__button--sumup)'
);

//score represents the whole equation already typed to the calculator. The equation is composed of numbers and opeartors (+-*/) between them.
let score = document.querySelector('.container__score');

//typedNumber is a number currently being typed to the calculator
//If user uses an operator (+ - etc.) typedNumber becomes an empty string to be able to get digits of the next number in the equation.
let typedNumber = '';

//Auxiliary variable used in numerous tests in functions below
let lastCharacter = '';

document.addEventListener('keydown', addToEquationKeyDown);

function addToEquationKeyDown(e) {
  //Do nothing if the first digit in number is to be zero or a user started number from a fraction and then tries to use an operator
  if (
    (typedNumber === '' && e.key === '0') ||
    (score.textContent === '0.' && /[^0-9]/.test(e.key))
  ) {
  }
  //Remove "0." from the equation if an operator is used i.e. 56+0. => 56+
  else if (
    /[*\/+-]/.test(e.key) &&
    /[*\/+-]/.test(score.textContent[score.textContent.length - 3]) &&
    score.textContent.slice(
      score.textContent.length - 2,
      score.textContent.length
    ) === '0.'
  ) {
    score.textContent =
      score.textContent.slice(0, score.textContent.length - 3) + e.key;
    typedNumber = '';
    lastCharacter = e.key;
  }
  //Change operator in equation
  else if (/[*\/+-]/.test(e.key) && /[*\/+-]/.test(lastCharacter)) {
    score.textContent =
      score.textContent.slice(0, score.textContent.length - 1) + e.key;
    typedNumber = '';
    lastCharacter = e.key;
  }
  //If a number ends with "." and user wants to use an operator the "." should be replaced by the operator
  else if (
    /[*\/+-]/.test(e.key) &&
    /[.,]/.test(score.textContent[score.textContent.length - 1])
  ) {
    score.textContent =
      score.textContent.slice(0, score.textContent.length - 1) + e.key;
    typedNumber = '';
    lastCharacter = e.key;
  }
  //Adding a digit to the equation. F prevents from getting functional keys (F1,F2 etc.)
  else if (/[0-9]/.test(e.key) && !/F/.test(e.key)) {
    score.textContent += e.key;
    typedNumber += e.key;
    lastCharacter = e.key;

    //Adding decimal operator to the number
  } else if (/[.,]/.test(e.key) && !typedNumber.includes('.')) {
    //Add "." if there are already digits in the number
    if (typedNumber !== '') {
      score.textContent += '.';
      typedNumber += '.';

      //Create 0 and then add "." if there is no number yet
    } else {
      score.textContent += '0.';
      typedNumber += '0.';
    }
    lastCharacter = e.key;

    //Add an operator to the equation
  } else if (/[*\/+-]/.test(e.key) && (typedNumber || score.textContent)) {
    score.textContent += e.key;
    typedNumber = '';
    lastCharacter = e.key;
  }
}

btn.forEach((e) => e.addEventListener('click', addToEquationClick));

function addToEquationClick(e) {
  //Do nothing if the first digit in number is to be zero or a user started number from a fraction and then tries to use an operator
  if (
    (typedNumber === '' &&
      (e.target.textContent === '0' || e.target.textContent === '00')) ||
    (score.textContent === '0.' && /[^0-9]/.test(e.target.textContent))
  ) {
  }
  //Remove "0." from the equation if an operator is used i.e. 56+0. => 56+
  else if (
    /[*\/+-]/.test(e.target.textContent) &&
    /[*\/+-]/.test(score.textContent[score.textContent.length - 3]) &&
    score.textContent.slice(
      score.textContent.length - 2,
      score.textContent.length
    ) === '0.'
  ) {
    score.textContent =
      score.textContent.slice(0, score.textContent.length - 3) +
      e.target.textContent;
    typedNumber = '';
    lastCharacter = e.target.textContent;
  }
  //Change operator in equation
  else if (
    /[*\/+-]/.test(e.target.textContent) &&
    /[*\/+-]/.test(lastCharacter)
  ) {
    score.textContent =
      score.textContent.slice(0, score.textContent.length - 1) +
      e.target.textContent;
    typedNumber = '';
    lastCharacter = e.target.textContent;
  }
  //If a number ends with "." and user wants to use an operator the "." should be switched to the operator
  else if (
    /[*\/+-]/.test(e.target.textContent) &&
    /[.]/.test(score.textContent[score.textContent.length - 1])
  ) {
    score.textContent =
      score.textContent.slice(0, score.textContent.length - 1) +
      e.target.textContent;
    typedNumber = '';
    lastCharacter = e.target.textContent;

    //Adding a digit to the equation. F prevents from getting functional keys (F1,F2 etc.)
  } else if (/[0-9]/.test(e.target.textContent)) {
    score.textContent += e.target.textContent;
    typedNumber += e.target.textContent;
    lastCharacter = e.target.textContent;

    //Adding decimal operator to the number
  } else if (/[.]/.test(e.target.textContent) && !typedNumber.includes('.')) {
    //Add "." if there are already digits in the number
    if (typedNumber !== '') {
      score.textContent += '.';
      typedNumber += '.';

      //Create 0 and then add "." if there is no number yet
    } else {
      score.textContent += '0.';
      typedNumber += '0.';
    }
    lastCharacter = ',';

    //Add an operator to the equation
  } else if (
    /[*\/+-]/.test(e.target.textContent) &&
    (typedNumber || score.textContent)
  ) {
    score.textContent += e.target.textContent;
    typedNumber = '';
    lastCharacter = e.target.textContent;
  }
}

//Cancelling

let cancel = document.querySelector('#C');

document.addEventListener('keydown', (e) => {
  if (['c', 'C', 'Escape', 'Backspace', 'Delete'].includes(e.key)) {
    cancelEquation();
  }
});
cancel.addEventListener('click', cancelEquation);

function cancelEquation() {
  score.textContent = '';
  typedNumber = '';
  lastCharacter = '';
}

//Solving equation

let equation = document.querySelector('#equation');

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    solveEquation();
  }
});
equation.addEventListener('click', solveEquation);

function solveEquation() {
  if (score.textContent === '0.') {
    score.textContent = '';
    typedNumber = '';
    lastCharacter = '';
  }
  score.textContent = eval(score.textContent);
  typedNumber = score.textContent;
}
