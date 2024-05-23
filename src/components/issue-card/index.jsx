import "./index.css";

function IssueCard(props) {
  return (
    <div className={`issue-card ${props.isList ? "list" : ""}`}>
      <div className="cover-container">
        <img />
      </div>

      <div className="info">
        <h6 className="title">April–May 2024</h6>
        <p className="date">23 May 2024</p>
        <p className="blurb">
          With 2022 nearing its end, The GUIDON takes a look at the events,
          issues, and developments that have come to define the past year
        </p>
      </div>
    </div>
  );
}

export default IssueCard;
