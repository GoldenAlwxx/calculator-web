import * as buttonHandling from "./buttonHandling.js";
const previousOperationElement = document.querySelector('.js-previous-text');
const currentOperationElement = document.querySelector('.js-current-text');

document.querySelector('.js-reset-button')
  .addEventListener('click', () => buttonHandling.resetCalculator(previousOperationElement, currentOperationElement));

document.querySelectorAll('.js-number-button')
  .forEach(button => { 
    const action = button.dataset.action;
    button.addEventListener('click', () => { buttonHandling.renderButtonAction(action, currentOperationElement) });
    console.log('event listener added');
  });