import React from "react";
import { Link } from "react-router-dom";

const HeaderWithBack = (props) => (
  <>
    <div className="card mb-3 p-3">
      <h1>{props.title}
        <Link to={props.link} className="ms-2 btn btn-outline-secondary">
          {props.linkText}
        </Link>
      </h1>
    </div>
  </>
)

export default HeaderWithBack;
