import { useEffect, useState } from "react";
import lodash, { clone } from "lodash";
import Stock from "./Stock";

const stocks = [
  {
    name: "voo",
    value: 765.35,
    dividend: 1.5,
    reinvestDividend: false,
  },
  {
    name: "vti",
    value: 230.02,
    dividend: 1.38,
    reinvestDividend: false,
  },
  {
    name: "nvda",
    value: 140.97,
    dividend: 0.12,
    reinvestDividend: false,
  },
  {
    name: "aapl",
    value: 601.79,
    dividend: 0.61,
    reinvestDividend: false,
  },
  {
    name: "ba",
    value: 9.73,
    dividend: 1.98,
    reinvestDividend: false,
  },
  {
    name: "wmt",
    value: 49.31,
    dividend: 1.49,
    reinvestDividend: false,
  },
  {
    name: "msft",
    value: 140.01,
    dividend: 0.93,
    reinvestDividend: false,
  },
];

const updateStockValue = (stockArray, valueToUpdate) => {};

// input: array of stocks
// compute: quarterly dividend accounting
// output: total expected annual dividend yeild

const computeQuarterlyTotal = (stocksArray) => {
  let total = 0;

  stocksArray.map((stock) => {
    total = total + stock.value * (stock.dividend * 0.01);
  });

  return total;
};

// input: array of stocks
// compute: sum(quarterly dividend yield) accounting for reinvestment if toggled
// output: total expected annual dividend yeild

const computeAnnualTotal = (stocksArray) => {
  let total = 0;

  const tempStocksArray = _.cloneDeep(stocksArray);

  // objects references are currently still shared
  console.log("arrayReference: ", tempStocksArray === stocksArray);
  console.log(
    "compare stock obj references: ",
    tempStocksArray[0] === stocksArray[0]
  );

  for (let i = 0; i < 4; i++) {
    tempStocksArray.map((stock) => {
      if (stock.reinvestDividend) {
        total = total + stock.value * (stock.dividend * 0.01);
        stock.value = stock.value + stock.value * (stock.dividend * 0.01);
      } else {
        total = total + stock.value * (stock.dividend * 0.01);
      }
    });
  }
  return total;
};

const Calculator = (props) => {
  // deep clone of initial state of stock array using lodash's _.cloneDeep function
  const [clonedStocksArray, setClonedStocksArray] = useState(
    _.cloneDeep(stocks)
  );
  // state hook for total annual dividend yeild
  const [totalAnnual, setTotalAnnual] = useState(
    computeAnnualTotal(clonedStocksArray)
  );
  // state hook for total quarterly dividend yeild
  const [totalQuarterly, setTotalQuarterly] = useState(
    computeQuarterlyTotal(clonedStocksArray)
  );

  // goal is to fire re-compute functions for totals when the local array copy changes
  useEffect(() => {
    console.log("running useEffect()");
    setTotalAnnual(computeAnnualTotal(clonedStocksArray));
  }, [clonedStocksArray]);

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        width: "100%",
        padding: "1em",
      }}
    >
      <div style={{ textAlign: "center", paddingBottom: "1em" }}>
        <div>Annual: {totalAnnual.toFixed(2)}</div>
        <div>Quarterly: {totalQuarterly.toFixed(2)}</div>
      </div>
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
          {"N"}
        </div>

        <div
          style={{
            flex: "1",
          }}
        >
          {"V"}
        </div>
        <div
          style={{
            flex: "1",
          }}
        >
          {"Y"}
        </div>
        <div
          style={{
            flex: "1",
          }}
        >
          {"Q/R"}
        </div>
        <div
          style={{
            flex: "1",
          }}
        >
          <div
            style={{
              flex: "1",
            }}
          >
            {"R/I"}
          </div>
        </div>
      </div>
      {clonedStocksArray.map((stock) => (
        <Stock
          stock={stock}
          key={stock.name}
          // updateCalculatorState={setClonedStocksArray}
        ></Stock>
      ))}
    </div>
  );
};

export default Calculator;
