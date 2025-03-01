import * as expressionHandling from "./expressionHandling.js";
const previousOperationElement = document.querySelector('.js-previous-text');
const currentOperationElement = document.querySelector('.js-current-text');

/* Buttons Events Listeners */

document.querySelector('.js-reset-button')
  .addEventListener('click', () => expressionHandling.resetCalculator(previousOperationElement, currentOperationElement));

document.querySelectorAll('.js-number-button')
  .forEach(button => { 
    const action = button.dataset.action; // The number imputed by the user
    button.addEventListener('click', () => { expressionHandling.renderNumber(action, currentOperationElement) });
  });

document.querySelectorAll('.js-operation-button')
  .forEach(button => { 
    const action = button.dataset.action; // The operator imputed by the user
    button.addEventListener('click', () => { expressionHandling.renderOperator(action, currentOperationElement) });
  });