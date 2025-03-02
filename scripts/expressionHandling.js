import { operationDone } from "./general.js";
export const resetButtonElement = document.querySelector(".js-reset-button");
export const resetButtonImage = document.createElement("img");
resetButtonImage.src = "icons/backspace-icon.png"; // Set the path to your image
resetButtonImage.style.display = "none"; // Initially hide the image
resetButtonElement.appendChild(resetButtonImage);

export function resetCalculator(previousOperationElement, currentOperationElement) {
  previousOperationElement.innerHTML = "";
  currentOperationElement.innerHTML = "0";
  resetButtonImage.style.display = "none"; 
  resetButtonElement.innerHTML = "AC";
}

export function renderNumber(action, currentOperationElement) {
  const lastCharacter = currentOperationElement.innerText.slice(-1);
  const secondToLastCharacter = currentOperationElement.innerText.slice(-2, -1);
  
  if (action === '0' && ["*", "+", "-", "/"].includes(secondToLastCharacter) && lastCharacter === '0') {
    alert('Invalid input.');

  } else if (action === ',') {
    const parts = currentOperationElement.innerText.split(/[*+\-/]/);
    const lastPart = parts[parts.length - 1];

    if (!lastPart.includes(",") && !["*", "+", "-", "/"].includes(lastCharacter)) {
      currentOperationElement.innerHTML += action;
    } else {
      alert("Invalid operation.");
    }

  } else if (["*", "+", "-", "/"].includes(secondToLastCharacter) && lastCharacter === '0') {
    currentOperationElement.innerText = currentOperationElement.innerText.slice(0, -1) + action;
  } else if (currentOperationElement.innerText === '0') {
    currentOperationElement.innerText = action;
    console.log('updated2');
    currentOperationElement.innerText = formatExpression(currentOperationElement.innerText);
  
  } else {
    currentOperationElement.innerText += action;
    console.log('updated3');
    currentOperationElement.innerText = formatExpression(currentOperationElement.innerText);
  }

  checkOperation(currentOperationElement);
}

export function checkOperation(currentOperationElement) {
  if (currentOperationElement.innerText !== "0" && !operationDone) {
    resetButtonImage.style.display = "inline"; // Show the image
    resetButtonElement.innerHTML = ""; // Clear the button text
    resetButtonElement.appendChild(resetButtonImage); // Append the image
  } else {
    resetButtonImage.style.display = "none"; // Hide the image
    resetButtonElement.innerHTML = "AC"; // Reset the button text
  }
}

export function renderOperator(action, currentOperationElement) {
  const lastCharacter = currentOperationElement.innerText.slice(-1);

  if ([',', '-', '+', '/', '*'].includes(lastCharacter)) {
    currentOperationElement.innerText = currentOperationElement.innerText.slice(0, -1) + action;
  } else {
    currentOperationElement.innerText += action;
  }
  currentOperationElement.innerText = formatExpression(currentOperationElement.innerText);
}

/* Functions For Formatting */

/*
  Formats a mathematical expression by adding dots as thousands separators to the numbers and retaining the operators.

  **Parameters:**
  - `expression` (String): The mathematical expression to format.

  **Returns:**
  - (String): The formatted expression.
*/
export function formatExpression(expression) {
  return expression
    .split(/([*+\-/])/)
    .map((part) => {
      if (["*", "+", "-", "/"].includes(part)) {
        return part;
      } else {
        return checkNumber(part);
      }
    })
    .join("");
}

/*
  Formats a number string by adding dots as thousands separators to the integer part and retaining the comma as the decimal separator.

  **Parameters:**
  - `string` (String): The number string to format.

  **Returns:**
  - (String): The formatted number string.
*/
export function checkNumber(string) {
  let [integerPart, decimalPart] = string.split(",");

  // Remove existing dots to avoid incorrect formatting
  integerPart = integerPart.replace(/\./g, "");

  // Add dots as thousands separators
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Update the currentOperation with the formatted number
  return decimalPart ? `${integerPart},${decimalPart}` : integerPart;
}