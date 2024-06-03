import "./index.css";
import "./fullscreen.css";
import { useState } from "react";

import sample from "./../../../assets/sample-2.pdf";
import { Document, Page, pdfjs } from "react-pdf";

function IssueReader(props) {
  const [tx, setTx] = useState(0.0);
  const [ty, setTy] = useState(0.0);
  const [docIsDragging, setDocIsDragging] = useState(false);
  const [ox, setOx] = useState(0.0);
  const [oy, setOy] = useState(0.0);
  const [loadedPages, setLoadedPages] = useState(0);

  // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  //   "pdfjs-dist/build/pdf.worker.min.mjs",
  //   import.meta.url
  // ).toString();

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  const determineShowPage = (p) => {
    if (props.isDoubleReader) {
      if (props.page == 1) {
        return p == 1;
      } else {
        return p == props.page || p == props.page + 1;
      }
    } else {
      return p == props.page;
    }
  };

  const onStartDragging = (e) => {
    e.preventDefault();
    setDocIsDragging(true);
    // setOx(e.screenX);
    // setOy(e.screenY);
  };

  const onDrag = (e) => {
    // if (docIsDragging) {
    //   setTx(e.screenX - ox);
    //   setTy(e.screenY - oy);
    // }
  };

  const onEndDragging = (e) => {
    setDocIsDragging(false);
  };

  const isLocalhost = () =>
    location.hostname === "localhost" || location.hostname === "127.0.0.1";

  const content = [
    {
      name: "News",
      articles: [
        {
          page: 1,
          title: "Ateneo to undergo renovations as part of Campus Master Plan",
          bylines: "Joaquin Baang, Azra Cagsawa, and Anna Claudia Durban",
        },
        {
          page: 2,
          title:
            "HEC faculty dissatisfaction prompts admin to open communication lines, explore potential compensation updates",
          bylines: "Derreck De Leon and Luis Feliciano",
        },
        {
          page: 3,
          title:
            "Ateneo trials Digital Days, eyes to support alternative learning modalities",
          bylines: "Isabel Candida Gonzales, Gabby Jacinto, and Anri Mendoza",
        },
        {
          page: 4,
          title:
            "Sanggunian’s AY 2023–2024 performance draws mixed evaluations, highlights student engagement gaps",
          bylines: "ANA RUFA PADUA, RALPH NUÑEZ, AND ASHLEY PE",
        },
        {
          page: 5,
          title: "A-VOICE",
          bylines: "LUIS FELICIANO AND ASHLEY PE",
        },
      ],
    },
    {
      name: "Opinion",
      articles: [
        {
          page: 6,
          title: "Still the Hill?",
          bylines: "The GUIDON",
        },
        {
          page: 8,
          title: "To be trapped in a box",
          bylines: "BRYCE GARRETT G. TAMAYO",
        },
        {
          page: 8,
          title: "Nevertheless, I hold out hope",
          bylines: "ANGELA VILLANO",
        },
        {
          page: 8,
          title: "That's the game",
          bylines: "ALIA TUPRIO",
        },
        {
          page: 9,
          title: "Embracing uncertainty",
          bylines: "FRANCE VICENTE",
        },
        {
          page: 9,
          title: "Leaving a legacy",
          bylines: "ANTON E. MERCADO",
        },
        {
          page: 9,
          title: "What the heart wants",
          bylines: "JURIS SALVANERA",
        },
        {
          page: 9,
          title: "Au revoir",
          bylines: "Emman Evangelista",
        },
        {
          page: 10,
          title: "A losing game",
          bylines: "Therese Garcia",
        },
        {
          page: 10,
          title: "In a galaxy far, far away",
          bylines: "Anna Pineda",
        },
        {
          page: 10,
          title: "At the renaissance of organizational culture",
          bylines: "Ralf Borja",
        },
      ],
    },
    {
      name: "Multimedia",
      articles: [
        {
          page: 11,
          title: "Future L(AI)bor?",
          bylines: "CHEVIN PAUL GEALONE",
        },
        {
          page: 11,
          title: "Getaway plane: Business or pleasure?",
          bylines: "DANNI S. PIMENTEL",
        },
        {
          page: 12,
          title: "Taxing pink",
          bylines: "JIZELLE AROLLADO",
        },
        {
          page: 12,
          title: "Silent struggle: Period poverty in plain sight",
          bylines: "Danelle Erin Natividad",
        },
      ],
    },
    {
      name: "Sports",
      articles: [
        {
          page: 13,
          title:
            "Relentless pursuit: The road to the UAAP general championship title",
          bylines: "LUIS ANTONIO LICAS AND VINCENT SOMERA",
        },
        {
          page: 14,
          title: "Freshman Phenom: Lance Vargas",
          bylines: "ALFONSO M. NAVARRO",
        },
        {
          page: 15,
          title: "The UAAP-NCAA Merger: Is it possible?",
          bylines: "RAV AYAG AND GABRIEL RENEE QUIZAN",
        },
        {
          page: 16,
          title: "Heart of an Eagle, spirit of an Olympian",
          bylines: "MATTHEA P. LAZO AND SUMYER REIN O. SANTOS",
        },
      ],
    },
    {
      name: "Beyond Loyola",
      articles: [
        {
          page: 17,
          title:
            "Cha-cha for AFAM?: Foreign ownership in higher education through charter change",
          bylines: "RONNEL BERMAS, RAEKINT F. CORPUZ, AND ALLEN P. GACUTAN",
        },
        {
          page: 18,
          title: "The peak of populist politics",
          bylines: "CHELSEA FERNANDEZ AND PAOLO VELILLA",
        },
        {
          page: 18,
          title: "Position of the opposition",
          bylines: "ANNA FERNANDEZ AND ALEXANDREA KATE L. NOBLE",
        },
        {
          page: 19,
          title: "Cerberus politics",
          bylines: "ANNA FERNANDEZ AND ALEXANDREA KATE L. NOBLE",
        },
        {
          page: 20,
          title: "Counterproductive security",
          bylines: "SAM A. RAMOS YEO AND SOHAILA SOMERA",
        },
        {
          page: 20,
          title: "Women at work",
          bylines: "ALEKXIE CASTAÑOS AND JULIA UY",
        },
      ],
    },
    {
      name: "Features",
      articles: [
        {
          page: 21,
          title: "Making space for “third places”",
          bylines: "GAB APLASCA AND ISABEL VICTORINO",
        },
        {
          page: 22,
          title: "An urban Ramadan",
          bylines: "ODESSA JULIENNE REBAYA AND INGRID LEANNE MANUEL",
        },
        {
          page: 23,
          title: "Launching the raket era",
          bylines: "RIE TESORO AND ALYSSA E. DUQUE",
        },
        {
          page: 23,
          title: "Mapping the Ateneo’s security guards",
          bylines: "MARGARET M. GILTENDEZ",
        },
        {
          page: 24,
          title: "Kuwento ng mga barbero",
          bylines: "ZAKI DAYRIT",
        },
      ],
    },
    {
      name: "Inquiry",
      articles: [
        {
          page: 25,
          title: "Staging the arena: A look into new political parties",
          bylines: "JUAN M. IGNACIO AND ALEXANDRA G. LUMBIS",
        },
        {
          page: 26,
          title: "The future of Ateneo’s flora and fauna",
          bylines: "CIELO BAUTISTA AND SEAN KILEM",
        },
        {
          page: 26,
          title: "Ateneo biodiversity check",
          bylines: "Bienne Montaller",
        },
        {
          page: 27,
          title: "Where credit is due",
          bylines: "MAXIENE BARRION AND ALEXANDRA P. ELICANO",
        },
        {
          page: 28,
          title:
            "Of bans and band-aid solutions: Uncovering the impact of the tricycle ban in Katipunan",
          bylines: "ALYANA FABELLA, SAB MERCADO, AND NICOLE ANNE KELSY SY",
        },
      ],
    },
  ];

  return (
    <main id="reader">
      <div className="edge left" onClick={props.onLeftClick}>
        <svg
          className="chevron"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 45"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.1998 41.0315C22.7391 41.0315 22.2783 40.8246 21.9273 40.413L7.52759 23.5242C6.82381 22.6987 6.82381 21.3645 7.52759 20.5391L21.9273 3.65033C22.6311 2.82489 23.7686 2.82489 24.4724 3.65033C25.1762 4.47577 25.1762 5.80998 24.4724 6.63542L11.3453 22.0316L24.4724 37.4279C25.1762 38.2533 25.1762 39.5875 24.4724 40.413C24.1214 40.8246 23.6606 41.0315 23.1998 41.0315Z"
          />
        </svg>
      </div>

      <div
        className={`document-container ${docIsDragging ? "dragging" : ""}`}
        style={{
          transform: `translate(${tx}px, ${ty}px) scale(${props.scale})`,
        }}
        onMouseDown={onStartDragging}
        onMouseMove={onDrag}
        onMouseUp={onEndDragging}
      >
        <Document
          file={isLocalhost() ? sample : props.issue.full_issue}
          // file={`/issues/${issue.fixed_slug}.pdf`}
          // file={sample}
          loading={null}
          onLoadError={console.error}
          className="document"
        >
          {[...Array(props.issue.num_pages)].map((_, idx) => (
            <Page
              key={`page-${idx}`}
              canvasBackground="white"
              pageNumber={idx + 1}
              onRenderSuccess={() => {
                setLoadedPages((loaded) => loaded + 1);
              }}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              height={2400}
              className={`page ${determineShowPage(idx + 1) ? "active" : ""}`}
            />
          ))}
        </Document>
      </div>

      <div className="edge right" onClick={props.onRightClick}>
        <svg
          className="chevron"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 45"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.80015 41.0315C9.26094 41.0315 9.72173 40.8246 10.0727 40.413L24.4724 23.5242C25.1762 22.6987 25.1762 21.3645 24.4724 20.5391L10.0727 3.65033C9.36894 2.82489 8.23137 2.82489 7.52758 3.65033C6.8238 4.47577 6.8238 5.80998 7.52758 6.63542L20.6547 22.0316L7.52758 37.4279C6.8238 38.2533 6.8238 39.5875 7.52758 40.413C7.87857 40.8246 8.33937 41.0315 8.80015 41.0315Z"
          />
        </svg>
      </div>
    </main>
  );
}

export default IssueReader;
