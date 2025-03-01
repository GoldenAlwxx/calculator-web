export function resetCalculator(previousOperationElement, currentOperationElement) {
  previousOperationElement.innerHTML = "";
  currentOperationElement.innerHTML = "0";
}

export function renderButtonAction(action, currentOperationElement) {
  if (currentOperationElement.innerText === '0') {
    currentOperationElement.innerText = action;
  } else {
    currentOperationElement.innerText += action;
  }
}