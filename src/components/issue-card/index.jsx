import { Link } from "react-router-dom";
import "./index.css";

import img from "./../../assets/images/broadsheet-sample.png";

function IssueCard(props) {
  const data = {
    cover: img,
    slug: "aprmay-2024",
    title: "April–May 2024",
    date: "23 May 2024",
    blurb:
      "With 2022 nearing its end, The GUIDON takes a look at the events, issues, and developments that have come to define the past year.",
  };

  return (
    <Link to="/" className={`issue-card ${props.isList ? "list" : ""}`}>
      <div className="cover-container">
        <img src={data.cover} alt={data.title} />
      </div>

      <div className="info">
        <h6 className="title">{data.title}</h6>
        <p className="date">{data.date}</p>
        <p className="blurb">{data.blurb}</p>
      </div>
    </Link>
  );
}

export default IssueCard;
