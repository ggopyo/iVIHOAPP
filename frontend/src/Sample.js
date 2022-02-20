import React from "react";

const a = ["login", "logout", "loginsuccess", "loginfailure"];
const Sample = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <div>
        {a.map((item, index) => (
          <div style={{ padding: "3px", margin: "3px" }}>
            <div
              style={{
                width: "100%",
                height: "5px",
                backgroundColor: "#0E5711",
              }}
            ></div>
            <div
              style={{
                width: "100%",
                height: "100%",
                marginLeft: "5px",
                paddingLeft: "3px",
                backgroundColor: "white",
                border: "solid 0.01px gray",
              }}
            >
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sample;
