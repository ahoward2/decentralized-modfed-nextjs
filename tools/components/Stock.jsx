import { useState } from "react";

const Stock = (props) => {
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
          {props.stock.name}
        </div>

        <div
          style={{
            flex: "1",
          }}
        >
          {props.stock.value.toFixed(2)}
        </div>
        <div
          style={{
            flex: "1",
          }}
        >
          {props.stock.dividend.toFixed(2)}
        </div>
        <div
          style={{
            flex: "1",
          }}
        >
          {(props.stock.value * (props.stock.dividend * 0.01)).toFixed(2)}
        </div>
        <div
          style={{
            flex: "1",
          }}
        >
          <input
            type="radio"
            id={props.stock.name}
            name={props.stock.value}
            readOnly
            checked={isChecked}
            onClick={(event) => {
              setIsChecked(!isChecked);
              props.changeLastStock(props.stock);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Stock;
