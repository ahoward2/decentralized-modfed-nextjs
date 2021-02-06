const NavigationBar = (props) => (
  <div
    style={{
      backgroundColor: "black",
      color: "white",
      width: "100%",
      padding: "1em",
    }}
  >
    <h1>{props.title}</h1>
  </div>
);

export default NavigationBar;
