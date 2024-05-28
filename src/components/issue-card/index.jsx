import { Link } from "react-router-dom";
import { DateFormatter } from "../../utils/date-formatter";
import "./index.css";

function IssueCard(props) {
  return (
    <Link
      to={`/issue/${props.data.slug}`}
      className={`issue-card ${props.isList ? "list" : ""}`}
    >
      <div className="cover-container">
        <img src={props.data.cover} alt={props.data.title} />
      </div>

      <div className="info">
        <h6 className="title">{props.data.title}</h6>
        <p className="date">{DateFormatter(props.data.date_published)}</p>
        <p className="blurb">{props.data.description}</p>
      </div>
    </Link>
  );
}

export default IssueCard;
