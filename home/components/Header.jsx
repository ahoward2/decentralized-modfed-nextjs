const Header = (props) => (
  <div
    style={{
      backgroundColor: "darkgreen",
      color: "white",
      width: "100%",
      padding: "1em",
    }}
  >
    <h1>{props.title}</h1>
  </div>
);

export default Header;
