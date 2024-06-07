import { useEffect } from "react";
import "./index.css";
import { setDocumentTitle } from "../../utils";

import { ArchivesData } from "../../data/archives";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutCovers } from "../../redux/modules/about-covers";

function AboutPage() {
  const dispatch = useDispatch();
  const covers = useSelector((state) => state.aboutCovers);

  useEffect(() => {
    setDocumentTitle("About");
    dispatch(fetchAboutCovers());
  }, []);

  const getCoverOrder = (isLeft) => {
    if (covers.isReady) {
      if (isLeft)
        return [
          covers.data.standard[0],
          covers.data.legacy[0],
          covers.data.primer[0],
          covers.data.standard[1],
          covers.data.legacy[1],
          covers.data.primer[1],
        ];

      return [
        covers.data.standard[0],
        covers.data.primer[0],
        covers.data.primer[1],
        covers.data.legacy[0],
        covers.data.legacy[1],
        covers.data.standard[1],
      ];
    }

    return [];
  };

  return (
    <div id="about">
      <div className="covers">
        <div className="col left">
          {[...Array(3)].map((_, idx) => (
            <div className="group" key={`col-1-group-${idx}`}>
              {getCoverOrder(true).map((cover, idx2) => (
                <img src={cover} key={`col-1-group-${idx}-img-${idx2}`} />
              ))}
            </div>
          ))}
        </div>
        <div className="col right">
          {[...Array(3)].map((_, idx) => (
            <div className="group" key={`col-2-group-${idx}`}>
              {getCoverOrder(false).map((cover, idx2) => (
                <img src={cover} key={`col-1-group-${idx}-img-${idx2}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <main className="content general-padding-top">
        <p className="subheader first">About</p>
        <h2>The GUIDON Archives</h2>
        <hr className="first" />

        <div className="text-content">
          <p className="text">
            The Archives is a collection of{" "}
            <span className="nowrap">The GUIDON's</span> published content since
            1929, chronicling its history as the official student publication of
            the Ateneo de Manila University. It contains physical broadsheets,
            magazines, and primers all in one place.
          </p>
          <p className="text">
            In this increasingly digitized sphere,{" "}
            <span className="nowrap">The GUIDON</span> is ensuring that its rich
            historical and contemporary publications remain easily accessible to
            all. Through a digital platform, students and alumni can explore the
            journalism of <span className="nowrap">The GUIDON</span> with just a
            few clicks.
          </p>
          <p className="text">
            Email <a href="mailto:desk@theguidon.com">desk@theguidon.com</a> for
            any comments, suggestions, or inquiries.
          </p>
        </div>

        <p className="subheader second">
          In partnership with the University Archives
        </p>
        <hr className="second" />
        <p className="text about-ua">
          The University Archives (UA) safeguards the institutional memory of
          the Ateneo de Manila University as the central repository of official
          and historical records and other related materials.
        </p>

        <div className="rows-container">
          {Object.keys(ArchivesData).map((key, idx) => (
            <div className="row" key={`row-${idx}`}>
              {ArchivesData[key].icon}

              <p dangerouslySetInnerHTML={{ __html: ArchivesData[key].text }} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AboutPage;
