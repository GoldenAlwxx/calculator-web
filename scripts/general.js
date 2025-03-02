import * as expressionHandling from "./expressionHandling.js";
import * as operationHandling from "./operationHandling.js";
const previousOperationElement = document.querySelector('.js-previous-text');
const currentOperationElement = document.querySelector('.js-current-text');

let resetTimeout;

/* Buttons Events Listeners */

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

document.querySelector('.js-equal-button')
  .addEventListener('click', () => { 
    previousOperationElement.innerHTML = currentOperationElement.innerText;
    currentOperationElement.innerHTML = expressionHandling.checkNumber(operationHandling.calculate(currentOperationElement.innerText)); 
  });

expressionHandling.resetButtonElement.addEventListener("click", () => {
  if (expressionHandling.resetButtonImage.style.display === "inline") {
    let currentText = currentOperationElement.innerText;
    currentOperationElement.innerHTML = expressionHandling.formatExpression(
      currentText.slice(0, -1) || "0"
    ); // Remove the last character or reset to "0" and format
    expressionHandling.checkOperation(currentOperationElement); // Update the reset button state
  } else {
    expressionHandling.resetCalculator(previousOperationElement, currentOperationElement);
  }
});

expressionHandling.resetButtonElement.addEventListener("mousedown", function () {
  resetTimeout = setTimeout(function () {
    expressionHandling.resetCalculator(previousOperationElement, currentOperationElement);
  }, 250); // 1/4 seconds hold to reset
});

expressionHandling.resetButtonElement.addEventListener("mouseup", function () {
  clearTimeout(resetTimeout);
});

expressionHandling.resetButtonElement.addEventListener("mouseleave", function () {
  clearTimeout(resetTimeout);
});
