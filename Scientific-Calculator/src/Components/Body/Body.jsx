import { useState } from "react";
import "./Body.css";

const Body = () => {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState(""); // Stores last calculated answer
  const [isDegree, setIsDegree] = useState(true); // Tracks Rad/Deg mode

  // Function to handle numbers & operators
  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  // Function to clear input
  const handleClear = () => {
    setInput("");
  };

  // Function to delete the last character
  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  // Function to calculate factorial
  const factorial = (num) => {
    if (num < 0) return "Error";
    if (num === 0 || num === 1) return 1;
    return num * factorial(num - 1);
  };

  // Function to evaluate math expressions
  const evaluateExpression = (exp) => {
    try {
      // Replace function names with valid JS Math functions
      let formattedExp = exp
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan")
        .replace(/log/g, "Math.log10")
        .replace(/ln/g, "Math.log")
        .replace(/√/g, "Math.sqrt")
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/EXP/g, "Math.exp")
        .replace(/arcsin/g, "Math.asin")
        .replace(/arccos/g, "Math.acos")
        .replace(/arctan/g, "Math.atan");

      // Convert degrees to radians if needed
      formattedExp = formattedExp.replace(/Math\.(sin|cos|tan|asin|acos|atan)\(([^)]+)\)/g, (match, func, num) => {
        return `Math.${func}(${isDegree ? `(${num} * Math.PI / 180)` : num})`;
      });

      // Handle factorials (x!)
      formattedExp = formattedExp.replace(/(\d+)!/g, (match, num) => factorial(parseInt(num)));

      // Evaluate the formatted expression safely
      let result = new Function(`return ${formattedExp}`)();
      setInput(result.toString());
      setAnswer(result.toString());
    } catch (error) {
      setInput("Error");
    }
  };

  return (
    <div className="calculator">
      {/* Display */}
      <div className="display-container">
        <input type="text" className="display" value={input} readOnly />
      </div>

      {/* Buttons */}
      <div className="buttons-grid">
        <button onClick={() => setIsDegree(true)}>Deg</button>
        <button onClick={() => setIsDegree(false)}>Rad</button>
        <button onClick={() => handleClick("!")} >x!</button>
        <button onClick={() => handleClick("(")}>(</button>
        <button onClick={() => handleClick(")")}>)</button>
        <button className="red-btn" onClick={handleDelete}>DEL</button>
        <button className="red-btn" onClick={handleClear}>AC</button>

        <button onClick={() => handleClick("arcsin(")}>arcsin</button>
        <button onClick={() => handleClick("sin(")}>sin</button>
        <button onClick={() => handleClick("ln(")}>ln</button>
        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("/")}>÷</button>

        <button onClick={() => handleClick("π")}>π</button>
        <button onClick={() => handleClick("arccos(")}>arccos</button>
        <button onClick={() => handleClick("cos(")}>cos</button>
        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("*")}>×</button>

        <button onClick={() => handleClick("e")}>e</button>
        <button onClick={() => handleClick("arctan(")}>arctan</button>
        <button onClick={() => handleClick("tan(")}>tan</button>
        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={() => handleClick("-")}>-</button>

        <button onClick={() => handleClick("Ans")}>Ans</button>
        <button onClick={() => handleClick("EXP(")}>EXP</button>
        <button onClick={() => handleClick("√(")}>√</button>
        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={() => handleClick(".")}>.</button>
        <button className="blue-btn" onClick={() => evaluateExpression(input)}>=</button>
        <button onClick={() => handleClick("+")}>+</button>
      </div>
    </div>
  );
};

export default Body;
