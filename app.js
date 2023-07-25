// Get the input field
const inputField = document.getElementById("input");
    
// Function to update the input field with clicked button's value
function updateInput(value) {
    
    inputField.value += value;
      
}

// Function to clear the input field
function clearInput() {
  inputField.value = "";
}

// Function to update the output field with the calculated result
function updateOutput(result) {
    const outputField = document.getElementById("output");
    outputField.value = result.toString();
  }
  
// Function to calculate the result and update the output field
function calculateResult() {
    try {
        let result = inputField.value;
        // Replace square root expressions with evaluated values
        result = result.replace(/√\s*\(\s*([^)]+)\s*\)/g, (_, expression) => `Math.sqrt(${expression})`);

        // Check if the result contains only a square root expression
        if (/^√\s*\(\s*([^)]+)\s*\)$/.test(result)) {
            updateOutput(result);
            return; // Stop further evaluation
        }

        // Evaluate the expression using eval
        const mathResult = eval(result);
        updateOutput(mathResult);
    } catch (error) {
        updateOutput("Error, invalid input!");
    }
}

// Function to check if a character is a valid mathematical operator or number
function isValidCharacter(char) {
  const operators = ["+", "-", "*", "/", ".", "%", "(", ")", 's', 'q', 'r', 't'];
  return operators.includes(char) || !isNaN(parseInt(char));
}

// Function to toggle square root mode
function toggleSquareRootMode() {
  if (inputField.value.endsWith("√")) {
    inputField.value = inputField.value.slice(0, -1);
  } else {
    inputField.value += "√";
  }
}

// Function to copy the output value into the input field
function copyOutputToInput() {
    const outputField = document.getElementById("output");
    const inputValue = outputField.value;
    inputField.value = inputValue;
}

// Add click event listener to the copy button
const copyButton = document.getElementById("copy");
copyButton.addEventListener("click", copyOutputToInput);

// Add keydown event listener to the document
document.addEventListener("keydown", function (event) {
    const char = event.key.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    const keycode = event.keyCode;
  
    if (char === "x") {
      event.preventDefault();
      updateInput("*"); // Replace 'x' with '*'
    } else if (char === "^") {
      event.preventDefault();
      updateInput("**");
    } else if (keycode === 8) {
      // Handle Backspace
      event.preventDefault();
      const currentValue = inputField.value;
      inputField.value = currentValue.slice(0, -1);
    } else if (keycode === 13 || char === "=") {
      // Handle Enter key
      event.preventDefault();
      calculateResult();
    } else if (char === "c") {
      event.preventDefault();
      clearInput(); // Clear the input field
    } else if (inputField.value.includes('sqrt')) {
      event.preventDefault();
      inputField.value=inputField.value.replace('sqrt', '√')
    } else if (!isValidCharacter(char)) {
      event.preventDefault(); // Prevent including invalid characters
    }
  });

// Add click event listeners to the buttons
const buttons = document.querySelectorAll('input[type="submit"]');
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const value = button.value;
    const operators = ["+", "-", "*", "/", ".", "%", "(", ")", 's', 'q', 'r', 't'];
    if (value !== "Copy result into input field"){
        if (value === "=") {
            calculateResult();
          } else if (value === 'X') {
            updateInput('*');
          } else if(value === "<-"){
            inputField.value=inputField.value.slice(0,-1);
          } else if (value === "^") {
            updateInput("**");
          } else if (value === "√") {
            toggleSquareRootMode(); // Toggle square root mode
          } else if(value === "n√"){
            const hasOperator = /[-+/*%.()]/.test(inputField.value);
            if(!(hasOperator)){
                inputField.value=inputField.value.replace(inputField.value, `**(1/${inputField.value})`)
            } else{
                updateInput("**(1/");
            }
            
          } else if (button.id === "pi") {
            updateInput(String(Math.PI));
          } else if (value === "Clear") {
            clearInput();
          } else {
            updateInput(value);
          }
    }
    
  });
});
