import React from "react"
import "./spinner.css"

function Spinner({ color = "#333", size = 50 }) {
  return (
    <div>
      <svg
        className="spinner"
        style={{ width: size, height: size }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          r="32"
          strokeWidth="8"
          stroke={color}
          strokeDasharray="50.26548245743669 50.26548245743669"
          fill="none"
          strokeLinecap="round"
        ></circle>
      </svg>
    </div>
  )
}

export default Spinner
