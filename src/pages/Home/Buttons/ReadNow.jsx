import React from "react";
import { Link } from "react-router-dom";

export default function ReadNow({ link }) {
  return (
    <Link to={link} className="btn-blue-light font-bold mt-4">
      Read now
    </Link>
  );
}
