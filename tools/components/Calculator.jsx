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

const computeAnnualTotal = (stocksArray, years) => {
  let total = 0;

  const tempStocksArray = _.cloneDeep(stocksArray);

  // compare if object references are shared
  // console.log("arrayReference: ", tempStocksArray === stocksArray);
  // console.log(
  //   "compare stock obj references: ",
  //   tempStocksArray[0] === stocksArray[0]
  // );

  for (let i = 0; i < years * 4; i++) {
    tempStocksArray.map((stock) => {
      if (stock.reinvestDividend) {
        total = total + stock.value * (stock.dividend * 0.01);
        // increase value of stock from reinvestment
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
  // state hook for total annual dividend yield over 30 years
  const [totalThirtyYears, setTotalThirtyYears] = useState(
    computeAnnualTotal(clonedStocksArray, 30)
  );
  // state hook for total annual dividend yield over 10 years
  const [totalTenYears, setTotalTenYears] = useState(
    computeAnnualTotal(clonedStocksArray, 10)
  );
  // state hook for total annual dividend yield over 5 years
  const [totalFiveYears, setTotalFiveYears] = useState(
    computeAnnualTotal(clonedStocksArray, 5)
  );
  // state hook for total annual dividend yeild
  const [totalAnnual, setTotalAnnual] = useState(
    computeAnnualTotal(clonedStocksArray, 1)
  );
  // state hook for total quarterly dividend yeild
  const [totalQuarterly, setTotalQuarterly] = useState(
    computeQuarterlyTotal(clonedStocksArray)
  );
  const [lastStock, setLastStock] = useState(null);
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
    setTotalAnnual(computeAnnualTotal(clonedStocksArray, 1));
    setTotalFiveYears(computeAnnualTotal(clonedStocksArray, 5));
    setTotalTenYears(computeAnnualTotal(clonedStocksArray, 10));
    setTotalThirtyYears(computeAnnualTotal(clonedStocksArray, 30));
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gridTemplateRows: "auto auto",
          alignContent: "right",
          rowGap: "1px",
          paddingBottom: "1em",
        }}
      >
        <div style={{}}>
          <h2 style={{}}>3 months</h2>
        </div>
        <div style={{ textAlign: "right" }}>
          <h2>${totalQuarterly.toFixed(2)}</h2>
        </div>
        <div style={{}}>
          <h2 style={{}}>1 year</h2>
        </div>
        <div style={{ textAlign: "right" }}>
          <h2 style={{}}> ${totalAnnual.toFixed(2)}</h2>
        </div>
        <div style={{}}>
          <h2 style={{}}>5 years</h2>
        </div>
        <div style={{ textAlign: "right" }}>
          <h2>${totalFiveYears.toFixed(2)}</h2>
        </div>
        <div style={{}}>
          <h2 style={{}}>10 years</h2>
        </div>
        <div style={{ textAlign: "right" }}>
          <h2>${totalTenYears.toFixed(2)}</h2>
        </div>
        <div style={{}}>
          <h2 style={{}}>30 years</h2>
        </div>
        <div style={{ textAlign: "right" }}>
          <h2>${totalThirtyYears.toFixed(2)}</h2>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            flex: "1",
          }}
        >
          <p>{"Name"}</p>
        </div>

        <div
          style={{
            flex: "1",
          }}
        >
          <p>{"M. Value"}</p>
        </div>
        <div
          style={{
            flex: "1",
          }}
        >
          <p>{"D. Yield"}</p>
        </div>
        <div
          style={{
            flex: "1",
          }}
        >
          <p>{"Quarterly Dividend Returns"}</p>
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
            <p>{"Reinvest Dividends"}</p>
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
