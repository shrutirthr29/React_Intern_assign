import React, { useState } from 'react';
import './App.css';

const App = () => {
  const initialMatrix = [
    ['white', 'white', 'white'],
    ['white', 'white', 'white'],
    ['white', 'white', 'white'],
  ];

  const [matrix, setMatrix] = useState(initialMatrix);
  const [clickSequence, setClickSequence] = useState([]);

  const handleClick = (row, col) => {

    const newMatrix = matrix.map((row) => row.slice());

    if (newMatrix[row][col] === 'green') return;
    
    newMatrix[row][col] = 'green';
    setMatrix(newMatrix);
    setClickSequence([...clickSequence, [row, col]]);

    if (clickSequence.length === 8) {
      setTimeout(() => changeAllToOrange(), 100);
    }
  };

  const changeAllToOrange = () => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < clickSequence.length) {
        const [row, col] = clickSequence[index];
        setMatrix((prevMatrix) => {
          const newMatrix = prevMatrix.map((row) => row.slice());
          newMatrix[row][col] = 'orange';
          return newMatrix;
        });
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  };

  return (
    <div className="matrix">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((color, colIndex) => (
            <div
              key={colIndex}
              className="box"
              style={{ backgroundColor: color }}
              onClick={() => handleClick(rowIndex, colIndex)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
