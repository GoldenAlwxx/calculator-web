export function calculate(expression) {
  if (typeof expression !== "string" || !expression.trim()) {
    throw new Error("Invalid input: expression must be a non-empty string.");
  }

  // Replace commas with a temporary marker for decimals.
  expression = expression.replace(/,/g, "__DECIMAL__");

  // Remove dots assumed to be thousands separators.
  expression = expression.replace(/\./g, "");

  // Restore the decimal point.
  expression = expression.replace(/__DECIMAL__/g, ".");

  function evaluate(expr) {
    // Evaluate multiplication and division first.
    while (/^-?\d+(\.\d+)?[*\/]-?\d+(\.\d+)?/.test(expr)) {
      expr = expr.replace(
        /(-?\d+(\.\d+)?)([*\/])(-?\d+(\.\d+)?)/,
        (match, p1, p2, operator, p3) => {
          const num1 = parseFloat(p1);
          const num2 = parseFloat(p3);
          if (operator === "/" && num2 === 0) {
            throw new Error("Division by zero is not allowed.");
          }
          switch (operator) {
            case "*":
              return num1 * num2;
            case "/":
              return num1 / num2;
          }
        }
      );
    }

    // Evaluate addition and subtraction.
    while (/^-?\d+(\.\d+)?[+\-]\d+(\.\d+)?/.test(expr)) {
      expr = expr.replace(
        /(-?\d+(\.\d+)?)([+\-])(\d+(\.\d+)?)/,
        (match, p1, p2, operator, p3) => {
          const num1 = parseFloat(p1);
          const num2 = parseFloat(p3);
          switch (operator) {
            case "+":
              return num1 + num2;
            case "-":
              return num1 - num2;
          }
        }
      );
    }

    return expr;
  }

  let result;
  try {
    result = evaluate(expression);
  } catch (error) {
    throw new Error("Error during calculation: " + error.message);
  }

  if (isNaN(result)) {
    throw new Error("The calculation did not yield a valid number.");
  }

  // Format the result by converting to a string and replacing the dot with a comma.
  let resultStr = result.toString();
  if (resultStr.includes('.')) {
    resultStr = resultStr.replace('.', ',');
  }
  
  return resultStr;
}
