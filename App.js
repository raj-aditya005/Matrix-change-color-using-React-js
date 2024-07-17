import React, { useState } from 'react';
import './App.css';

const App = () => {
  const initialMatrix = Array(3).fill(null).map(() => Array(3).fill(''));

  const [matrix, setMatrix] = useState(initialMatrix);
  const [clickOrder, setClickOrder] = useState([]);

  const handleClick = (row, col) => {
    if (matrix[row][col] === '') {
      const newMatrix = matrix.map((rowArr, rowIndex) =>
        rowArr.map((cell, colIndex) => {
          if (rowIndex === row && colIndex === col) {
            return 'green';
          }
          return cell;
        })
      );
      setMatrix(newMatrix);
      setClickOrder([...clickOrder, { row, col }]);

      if (clickOrder.length === 8) {
        changeColorsToOrange([...clickOrder, { row, col }]);
      }
    }
  };

  const changeColorsToOrange = (order) => {
    order.forEach((cell, index) => {
      setTimeout(() => {
        setMatrix(prevMatrix =>
          prevMatrix.map((rowArr, rowIndex) =>
            rowArr.map((cellColor, colIndex) => {
              if (rowIndex === cell.row && colIndex === cell.col) {
                return 'orange';
              }
              return cellColor;
            })
          )
        );
      }, index * 500);
    });
  };

  return (
    <div className="matrix">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="box"
              style={{ backgroundColor: cell }}
              onClick={() => handleClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}; export default App;