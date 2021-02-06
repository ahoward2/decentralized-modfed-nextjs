import { useRouter } from "next/router";

const Tabs = () => {
  const router = useRouter();

  return (
    <div
      style={{
        zIndex: 2,
        position: "fixed",
        backgroundColor: "black",
        bottom: 0,
        color: "white",
        width: "100%",
        height: "3em",
        padding: "1em",
        display: "flex",
        textAlign: "center",
      }}
    >
      <div style={{ flex: 1 }}>
        <a onClick={() => router.push("http://localhost:3000/")}>Home</a>
      </div>
      <div style={{ flex: 1 }}>
        <a onClick={() => router.push("http://localhost:3001/tools")}>Tools</a>
      </div>
      <div style={{ flex: 1 }}>
        <a onClick={() => router.push("http://localhost:3002/accounts")}>
          Account
        </a>
      </div>
    </div>
  );
};

export default Tabs;
