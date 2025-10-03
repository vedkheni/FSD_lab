const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index", { result: null, error: null });
});

app.post("/calculate", (req, res) => {
  const { number1, number2, operation } = req.body;

  // Input validation - check for empty values
  if (!number1 || !number2 || !operation) {
    return res.render("index", {
      result: null,
      error: "Oops! Please fill in all the boxes! 📝",
    });
  }

  // Convert to numbers and validate
  const num1 = parseFloat(number1);
  const num2 = parseFloat(number2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.render("index", {
      result: null,
      error: "Please enter numbers only! No letters allowed! 🔢",
    });
  }

  // Check for very large numbers (keep it simple for kids)
  if (Math.abs(num1) > 1000000 || Math.abs(num2) > 1000000) {
    return res.render("index", {
      result: null,
      error: "Wow! Those numbers are too big! Try smaller numbers! 🐘",
    });
  }

  let result;
  let error = null;

  try {
    switch (operation) {
      case "add":
        result = num1 + num2;
        break;
      case "subtract":
        result = num1 - num2;
        break;
      case "multiply":
        result = num1 * num2;
        break;
      case "divide":
        if (num2 === 0) {
          error = "Oops! We cannot divide by zero! Try a different number! 🤔";
        } else {
          result = num1 / num2;
        }
        break;
      default:
        error = "Please choose what you want to do with the numbers! ➕➖✖️➗";
    }

    // Round result to 2 decimal places if needed
    if (result !== undefined && !Number.isInteger(result)) {
      result = Math.round(result * 100) / 100;
    }
  } catch (err) {
    error = "Something went wrong! Let's try again! 🔄";
  }

  res.render("index", { result, error });
});

app.listen(PORT, () => {
  console.log(`Kids Calculator running on http://localhost:${PORT}`);
});
