import { Link } from "react-router-dom";
import { DateFormatter } from "../../utils";
import "./index.css";

function IssueCard(props) {
  return (
    <Link to={`/issue/${props.issue.fixed_slug}`} className="issue-card">
      <div className="cover-container">
        <img src={props.issue.cover} alt={props.issue.title} />
      </div>

      <div className="info">
        <h6 className="title">{props.issue.title}</h6>
        <p className="date">{DateFormatter(props.issue.date_published)}</p>
        <p className="desc">{props.issue.description}</p>
      </div>
    </Link>
  );
}

export default IssueCard;
