import { Link } from "react-router-dom";
import "./index.css";

function IssueCard(props) {
  return (
    <Link to="/" className={`issue-card ${props.isList ? "list" : ""}`}>
      <div className="cover-container">
        <img src={props.data.cover} alt={props.data.title} />
      </div>

      <div className="info">
        <h6 className="title">{props.data.title}</h6>
        <p className="date">{props.data.date}</p>
        <p className="blurb">{props.data.blurb}</p>
      </div>
    </Link>
  );
}

export default IssueCard;
