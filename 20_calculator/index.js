const display = document.getElementById("display");

function appendToDisplay(input) {
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    // Sanitize input - only allow numbers, operators, parentheses, and decimal points
    const sanitized = display.value.replace(/[^0-9+\-*/.() ]/g, "");

    // Use Function constructor instead of eval (still not perfect, but safer)
    const result = Function('"use strict"; return (' + sanitized + ")")();

    // Check if result is a valid number
    if (isNaN(result) || !isFinite(result)) {
      display.value = "Error";
    } else {
      display.value = result;
    }
  } catch (error) {
    display.value = "Error";
  }
}
