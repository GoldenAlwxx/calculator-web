import * as buttonHandling from "./buttonHandling.js";
const previousOperationElement = document.querySelector('.js-previous-span');
const currentOperationElement = document.querySelector('.js-current-span');

document.querySelector('.js-reset-button')
  .addEventListener('click', () => buttonHandling.resetCalculator(previousOperationElement, currentOperationElement));