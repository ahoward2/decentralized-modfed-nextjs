import { useCallback, useEffect, useState } from "react";
import lodash from "lodash";
import Stock from "./Stock";
import stocks from "./../utils/stocks";

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

  // compare if object references are shared
  // console.log("arrayReference: ", tempStocksArray === stocksArray);
  // console.log(
  //   "compare stock obj references: ",
  //   tempStocksArray[0] === stocksArray[0]
  // );

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

// Calculator component holds dividend calculator
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
  // callback for toggling reinvesting dividends option for local stocks array
  const updateLastStock = useCallback(
    (n) => {
      setLastStock(() => {
        // this can probably be done more efficiently with just spread operator
        // grab index of stock from reinvest toggle event
        const index = clonedStocksArray.indexOf(n);
        // grab reference of object from reinvest toggle event
        const stockObjRef = clonedStocksArray[index];
        // toggle reinvestDividend boolean to opposite of current value
        stockObjRef.reinvestDividend = !stockObjRef.reinvestDividend;
        // reset local stock array
        setClonedStocksArray([...clonedStocksArray]);
      });
    },
    [setClonedStocksArray]
  );

  // fire re-compute functions for annual return total when the local array copy changes
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
          changeLastStock={updateLastStock}
        ></Stock>
      ))}
    </div>
  );
};

export default Calculator;
