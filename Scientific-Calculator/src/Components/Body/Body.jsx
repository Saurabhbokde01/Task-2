import { useState, useRef, useEffect } from "react";
import "./Body.css";

const Body = () => {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState(""); // Stores last calculated answer
  const [isDegree, setIsDegree] = useState(true); // Tracks Rad/Deg mode
  const [isInverse, setIsInverse] = useState(false); // Tracks Inv mode
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [input]);

  // Function to handle numbers & operators
  const handleClick = (value) => {
    setInput((prev) => {
      if (prev && /\d$/.test(prev) && /^[a-z(]/i.test(value)) {
        return prev + "*" + value;
      }
      return prev + value;
    });
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
      let formattedExp = exp
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/EXP\(/g, "Math.exp(")
        .replace(/√\(/g, "Math.sqrt(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/(\d+)\^(\d+)/g, "Math.pow($1,$2)");

      formattedExp = formattedExp.replace(
        /(sin|cos|tan)\(([^)]+)\)/g,
        (match, func, num) =>
          `Math.${func}(${isDegree ? `(${num} * Math.PI / 180)` : num})`
      );

      formattedExp = formattedExp.replace(
        /(arcsin|arccos|arctan)\(([^)]+)\)/g,
        (match, func, num) => {
          const trigFunc = {
            arcsin: "asin",
            arccos: "acos",
            arctan: "atan",
          }[func];
          return isDegree
            ? `(Math.${trigFunc}(${num}) * 180 / Math.PI)`
            : `Math.${trigFunc}(${num})`;
        }
      );

      formattedExp = formattedExp.replace(/(\d+)!/g, (match, num) =>
        factorial(parseInt(num))
      );

      if (answer) {
        formattedExp = formattedExp.replace(/Ans/g, answer);
      }

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
        <input ref={inputRef} type="text" className="display" value={input} readOnly />
      </div>

      {/* Buttons */}
      <div className="buttons-grid">
        <button onClick={() => setIsDegree(true)}>Deg</button>
        <button onClick={() => setIsDegree(false)}>Rad</button>
        <button onClick={() => handleClick("!")}>x!</button>
        <button onClick={() => handleClick("(")}> (</button>
        <button onClick={() => handleClick(")")}>)</button>
        <button className="red-btn" onClick={handleDelete}>DEL</button>
        <button className="red-btn" onClick={handleClear}>AC</button>

        <button onClick={() => handleClick("log(")}>log</button>
        <button onClick={() => handleClick("sin(")}>sin</button>
        <button onClick={() => handleClick("ln(")}>ln</button>
        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("/")}>÷</button>

        <button onClick={() => handleClick("π")}>π</button>
        <button onClick={() => setIsInverse(!isInverse)}>Inv</button>
        <button onClick={() => handleClick("cos(")}>cos</button>
        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("*")}>×</button>

        <button onClick={() => handleClick("e")}>e</button>
        <button onClick={() => handleClick("^")}>xʸ</button>
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
