import { useEffect } from "react";
import "./index.css";
import { setDocumentTitle } from "../../utils";

function AboutPage() {
  useEffect(() => {
    setDocumentTitle("About");
  }, []);

  return <div>ABOUT PAGE</div>;
}

export default AboutPage;
