import IssueViewer from "./IssueViewer";
import pdf from "./test.pdf";
// archives.theguidon.com/freshmanual-2023

export default function Issue() {
  return (
    <main>
      <IssueViewer file={pdf} />
    </main>
  );
}
