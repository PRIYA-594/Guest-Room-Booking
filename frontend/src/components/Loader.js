import React from "react";
import { useState, CSSProperties } from "react";
import CircleLoader from "react-spinners/CircleLoader";

function Loader() {
  let [loading, setLoading] = useState(true);

  return (
    <div style={{marginTop:'150px',marginLeft:'600px'}}>
      <div className="sweet-loading">
        <CircleLoader
          color="#000"
          loading={loading}
          css=""
          size={80}
          
        />
      </div>
    </div>
  );
}

export default Loader;
