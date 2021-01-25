import { useState } from "react";

const Stock = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "darkgreen",
          paddingLeft: "0.25em",
          paddingRight: "0.25em",
          marginTop: "0.25em",
          marginBottom: "0.25em",
        }}
      >
        <div
          style={{
            flex: "1",
          }}
        >
          <p>{props.stock.name}</p>
        </div>

        <div
          style={{
            flex: "2",
          }}
        >
          <p>{props.stock.value.toFixed(2)}</p>
        </div>
        <div
          style={{
            flex: "1",
          }}
        >
          <p>{props.stock.dividend.toFixed(2)}</p>
        </div>
        <div
          style={{
            flex: "1",
          }}
        >
          <p>
            {(props.stock.value * (props.stock.dividend * 0.01)).toFixed(2)}
          </p>
        </div>
        <div
          style={{
            flex: "1",
            marginTop: "16px",
            marginBottom: "16px",
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
