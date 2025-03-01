export function calculate(expression) {
  // Remove dots from the expression
  expression = expression.replace(/\./g, "");

  // Replace commas with dots to handle decimal points
  expression = expression.replace(/,/g, ".");

  // Function to evaluate the expression with correct order of operations
  function evaluate(expr) {
    // Evaluate multiplication and division first
    while (/\d+(\.\d+)?[*\/]\d+(\.\d+)?/.test(expr)) {
      expr = expr.replace(
        /(\d+(\.\d+)?)([*\/])(\d+(\.\d+)?)/,
        (match, p1, p2, operator, p3) => {
          switch (operator) {
            case "*":
              return parseFloat(p1) * parseFloat(p3);
            case "/":
              return parseFloat(p1) / parseFloat(p3);
          }
        }
      );
    }

    // Evaluate addition and subtraction
    while (/\d+(\.\d+)?[+\-]\d+(\.\d+)?/.test(expr)) {
      expr = expr.replace(
        /(\d+(\.\d+)?)([+\-])(\d+(\.\d+)?)/,
        (match, p1, p2, operator, p3) => {
          switch (operator) {
            case "+":
              return parseFloat(p1) + parseFloat(p3);
            case "-":
              return parseFloat(p1) - parseFloat(p3);
          }
        }
      );
    }

    return expr;
  }

  // Evaluate the expression
  return evaluate(expression);
}

