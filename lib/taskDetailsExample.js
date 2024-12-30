// Example task details structure for a JavaScript programming lesson
export const taskDetailsExample = {
  lessonId: 1,
  skillId: "javascript-basics",
  tasks: [
    "Set up your JavaScript development environment",
    "Write your first JavaScript function",
    "Implement error handling in your function"
  ],
  taskDetails: [
    {
      description: "Before we start coding, let's set up a proper development environment with the tools you'll need.",
      prerequisites: [
        "A computer with internet access",
        "Basic understanding of using a text editor",
        "Terminal/Command prompt familiarity"
      ],
      steps: [
        "Install Visual Studio Code from https://code.visualstudio.com",
        "Install Node.js from https://nodejs.org (LTS version)",
        "Open Visual Studio Code and install the 'JavaScript (ES6) code snippets' extension",
        "Create a new folder for your project and open it in VS Code",
        "Create a new file called 'index.js'"
      ],
      example: "After installation, verify everything is working by opening your terminal and typing:\n\nnode --version\nnpm --version",
      codeExamples: `// Your first JavaScript file
console.log("Hello, World!");

// Run this file using:
// node index.js`,
      commonMistakes: [
        "Installing an outdated version of Node.js",
        "Forgetting to restart the terminal after installation",
        "Not checking if the installation was successful"
      ],
      tips: [
        "Use the LTS (Long Term Support) version for stability",
        "Add VS Code to your system PATH during installation",
        "Bookmark the Node.js and VS Code documentation for future reference"
      ],
      verificationSteps: [
        "Check if Node.js is installed correctly",
        "Verify VS Code opens and recognizes JavaScript files",
        "Test running a simple JavaScript file"
      ]
    },
    {
      description: "Now that our environment is set up, let's write our first JavaScript function to understand the basics of function declaration and execution.",
      prerequisites: [
        "Completed environment setup",
        "Basic understanding of what a function is",
        "VS Code and Node.js installed"
      ],
      steps: [
        "Open your 'index.js' file in VS Code",
        "Write a function declaration that takes two parameters",
        "Add the function logic to add the two numbers",
        "Add a return statement",
        "Test the function with different numbers"
      ],
      example: "Let's create a simple function that adds two numbers together.",
      codeExamples: `// Function declaration
function addNumbers(a, b) {
  return a + b;
}

// Testing the function
console.log(addNumbers(5, 3)); // Should output: 8
console.log(addNumbers(-1, 7)); // Should output: 6`,
      commonMistakes: [
        "Forgetting to use the 'return' keyword",
        "Not testing the function with different inputs",
        "Forgetting to save the file before running"
      ],
      tips: [
        "Use meaningful parameter names",
        "Test your function with both positive and negative numbers",
        "Add comments to explain what your function does"
      ],
      verificationSteps: [
        "Function successfully adds two numbers",
        "Function handles negative numbers",
        "Function returns the correct result"
      ]
    },
    {
      description: "Error handling is crucial in programming. Let's add error checking to our function to make it more robust.",
      prerequisites: [
        "Completed function writing task",
        "Understanding of basic JavaScript data types",
        "Knowledge of if statements"
      ],
      steps: [
        "Add type checking for parameters",
        "Implement error handling using try-catch",
        "Add input validation",
        "Test the function with invalid inputs",
        "Add appropriate error messages"
      ],
      example: "We'll modify our addNumbers function to handle invalid inputs gracefully.",
      codeExamples: `function addNumbers(a, b) {
  // Type checking
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both parameters must be numbers');
  }

  try {
    const result = a + b;
    
    // Check for overflow
    if (!Number.isFinite(result)) {
      throw new Error('Result is too large');
    }
    
    return result;
  } catch (error) {
    console.error('Error in addNumbers:', error.message);
    return null;
  }
}

// Testing error handling
console.log(addNumbers('5', 3)); // Error: Both parameters must be numbers
console.log(addNumbers(Number.MAX_VALUE, Number.MAX_VALUE)); // Error: Result is too large`,
      commonMistakes: [
        "Not checking parameter types",
        "Silently failing without error messages",
        "Not testing edge cases",
        "Forgetting to handle all possible error scenarios"
      ],
      tips: [
        "Always validate input data",
        "Use descriptive error messages",
        "Test with edge cases like null, undefined, and invalid types",
        "Consider using TypeScript for better type safety"
      ],
      verificationSteps: [
        "Function properly validates input types",
        "Function handles edge cases correctly",
        "Error messages are clear and helpful",
        "Function doesn't crash on invalid inputs"
      ]
    }
  ]
}; 