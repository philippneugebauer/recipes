import React from "react";
import { Link } from "react-router-dom";

const HeaderWithBack = (props) => (
  <>
    <h1>{props.title}
      <Link to={props.link} className="ms-2 btn btn-outline-secondary">
        {props.linkText}
      </Link>
    </h1>
  </>
)

export default HeaderWithBack;
