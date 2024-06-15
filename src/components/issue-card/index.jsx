import { Link } from "react-router-dom";
import { DateFormatter, findQuery } from "../../utils";
import "./index.css";

function IssueCard(props) {
  if (props.loading)
    return (
      <div className="issue-card loading-container">
        <div className="cover-container loading" />

        <div className="info">
          <div
            className="title loading"
            style={{ width: `${Math.random() * 25 + 75}%` }}
          />
          <div
            className="date loading"
            style={{ width: `${Math.random() * 25 + 50}%` }}
          />
          <div className="desc loading" />
        </div>
      </div>
    );

  return (
    <Link to={`/issue/${props.issue.fixed_slug}`} className="issue-card">
      <div className="cover-container">
        <img src={props.issue.cover} alt={props.issue.title} />
      </div>

      <div className="info">
        <h6 className="title">{props.issue.title}</h6>
        <p className="date">{DateFormatter(props.issue.date_published)}</p>
        <p
          className="desc"
          dangerouslySetInnerHTML={{
            __html:
              props.query == null
                ? props.issue.description
                : findQuery(
                    props.query,
                    props.issue.issue_content,
                    props.issue.contributors,
                    props.issue.description
                  ),
          }}
        />
      </div>
    </Link>
  );
}

export default IssueCard;
