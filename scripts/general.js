import * as expressionHandling from "./expressionHandling.js";
import * as operationHandling from "./operationHandling.js";
const previousOperationElement = document.querySelector('.js-previous-text');
const currentOperationElement = document.querySelector('.js-current-text');

let resetTimeout;
export let operationDone = false;

/* Buttons Events Listeners */

document.querySelectorAll(".js-number-button").forEach((button) => {
  const action = button.dataset.action; // The number imputed by the user
  button.addEventListener("click", () => {
    // Add the brightenAnim class
    button.classList.add("brightenAnim");

    // Remove the brightenAnim class after 1 second
    setTimeout(() => {
      button.classList.remove("brightenAnim");
    }, 350);

    expressionHandling.renderNumber(action, currentOperationElement);
    operationDone = false;
    console.log(operationDone);
    expressionHandling.checkOperation(currentOperationElement);
  });
});

document.querySelectorAll(".js-control-button").forEach(button => {
  button.addEventListener("click", () => {
    // Add the brightenAnim class
    button.classList.add("brightenAnim");

    // Remove the brightenAnim class after 1 second
    setTimeout(() => {
      button.classList.remove("brightenAnim");
    }, 350);
  });
});

document.querySelectorAll(".js-operation-button").forEach(button => {
  const action = button.dataset.action; // The operator imputed by the user
  button.addEventListener("click", () => {
    // Add the brightenAnim class
    button.classList.add("brightenAnim");

    // Remove the brightenAnim class after 1 second
    setTimeout(() => {
      button.classList.remove("brightenAnim");
    }, 350);

    expressionHandling.renderOperator(action, currentOperationElement);
    operationDone = false;
    console.log(operationDone);
    expressionHandling.checkOperation(currentOperationElement);
  });
});

document.querySelector(".js-equal-button").addEventListener("click", () => {
  // Add the brightenAnim class
  document.querySelector(".js-equal-button").classList.add("brightenAnim");

  // Remove the brightenAnim class after 1 second
  setTimeout(() => {
    document.querySelector(".js-equal-button").classList.remove("brightenAnim");
  }, 350);

  previousOperationElement.innerHTML = currentOperationElement.innerText;
  currentOperationElement.innerHTML = expressionHandling.checkNumber(
    operationHandling.calculate(currentOperationElement.innerText)
  );
  operationDone = true;
  console.log(operationDone);
  expressionHandling.checkOperation(currentOperationElement);
});

expressionHandling.resetButtonElement.addEventListener("click", () => {
  // Add the brightenAnim class
  expressionHandling.resetButtonElement.classList.add("brightenAnim");

  // Remove the brightenAnim class after 1 second
  setTimeout(() => {
    expressionHandling.resetButtonElement.classList.remove("brightenAnim");
  }, 350);

  if (
    expressionHandling.resetButtonImage.style.display === "inline" &&
    !operationDone
  ) {
    let currentText = currentOperationElement.innerText;
    currentOperationElement.innerHTML = expressionHandling.formatExpression(
      currentText.slice(0, -1) || "0"
    ); // Remove the last character or reset to "0" and format
    expressionHandling.checkOperation(currentOperationElement); // Update the reset button state
  } else {
    expressionHandling.resetCalculator(
      previousOperationElement,
      currentOperationElement
    );
  }
});

expressionHandling.resetButtonElement.addEventListener(
  "mousedown",
  () => {
    // Add the brighten class
    expressionHandling.resetButtonElement.classList.add("brighten");

    resetTimeout = setTimeout(function () {
      expressionHandling.resetCalculator(
        previousOperationElement,
        currentOperationElement
      );
    }, 250); // 1/4 seconds hold to reset
  }
);

expressionHandling.resetButtonElement.addEventListener("mouseup", function () {
  // Add the darken class
  expressionHandling.resetButtonElement.classList.add("darken");
  expressionHandling.resetButtonElement.classList.remove('brighten', 'darken');

  clearTimeout(resetTimeout);
});

expressionHandling.resetButtonElement.addEventListener(
  "mouseleave",
  () => {
    clearTimeout(resetTimeout);
  }
);
