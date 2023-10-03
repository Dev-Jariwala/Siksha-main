import React from "react";
import "./Loader1.css";
const Loader1 = () => {
  return (
    <>
      <div className="l-container">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Loader1;
