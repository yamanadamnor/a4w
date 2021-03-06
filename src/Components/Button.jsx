import React from "react";
import { NavLink } from "react-router-dom";

import "./style/button.scss";

const Button = props => {
  return (
    <div className="button">
      <NavLink to={props.to} style={{ float: props.float }}>
        {props.text}
        <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
          <path
            fill="#000000"
            d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
          />
        </svg>
      </NavLink>
    </div>
  );
};

export default Button;
