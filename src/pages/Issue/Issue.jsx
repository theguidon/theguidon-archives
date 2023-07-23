import IssueViewer from "./IssueViewer";
import pdf from "./test.pdf";

export default function Issue() {
  return (
    <main>
      <IssueViewer file={pdf} />
    </main>
  );
}
