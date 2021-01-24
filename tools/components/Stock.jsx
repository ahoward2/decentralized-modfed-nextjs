import { useState } from "react";

const Stock = ({ stock }, updateCalculatorState) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            flex: "1",
          }}
        >
          {stock.name}
        </div>

        <div
          style={{
            flex: "1",
          }}
        >
          {stock.value.toFixed(2)}
        </div>
        <div
          style={{
            flex: "1",
          }}
        >
          {stock.dividend.toFixed(2)}
        </div>
        <div
          style={{
            flex: "1",
          }}
        >
          {(stock.value * (stock.dividend * 0.01)).toFixed(2)}
        </div>
        <div
          style={{
            flex: "1",
          }}
        >
          <input
            type="radio"
            id={stock.name}
            name={stock.value}
            readOnly
            checked={isChecked}
            onClick={(event) => {
              setIsChecked(!isChecked);
              // updateCalculatorState();
              console.log(stock);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Stock;
