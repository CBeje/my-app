import React, { useState } from "react";
import "./App.css";

function App() {
  const [circles, setCircles] = useState([]);
  const [selectedCircleIndex, setSelectedCircleIndex] = useState({});
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const handleCircleClick = (id, event) => {
    const selectedCircle = circles.find((item) => item.id === id);
    if (selectedCircle !== undefined && selectedCircle.id) {
      setSelectedCircleIndex(selectedCircle);
      event.stopPropagation();
    }
  };

  const handleClick = (event) => {
    const { clientX, clientY } = event;
    const circle = {
      id: Number(Date.now()),
      x: clientX,
      y: clientY,
      size: Math.random() * 100 + 50,
      color: getRandomColor(),
    };
    setCircles([...circles, circle]);
    setSelectedCircleIndex(circle);
    event.stopPropagation();
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  function handleButtonClick() {
    setIsDarkTheme(!isDarkTheme);
  }

  function handleKeyPress(event) {
    const keyCode = event.keyCode;
    let selectedCircle = selectedCircleIndex;
    if (keyCode === 38) {
      // up arrow
      selectedCircle.size += 10;
      setCircles([...circles]); // Update the state to trigger a re-render
    } else if (keyCode === 40) {
      // down arrow
      selectedCircle.size -= 10;
      setCircles([...circles]); // Update the state to trigger a re-render
    }
  }

  return (
    <div>
      <button className="theme-button" onClick={handleButtonClick}>
        {isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
      </button>
      <div
        className={isDarkTheme ? "dark-theme" : "light-theme"}
        onClick={handleClick}
        tabIndex="0"
        onKeyDown={handleKeyPress}
      >
        {circles.map((circle, index) => (
          <div
            tabIndex="1"
            key={index}
            style={{
              position: "absolute",
              left: circle.x - circle.size / 2,
              top: circle.y - circle.size / 2,
              width: circle.size,
              height: circle.size,
              borderRadius: "50%",
              backgroundColor: circle.color,
            }}
            onClick={(event) => handleCircleClick(circle.id, event)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
