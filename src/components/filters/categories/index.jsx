import { NavLink } from "react-router-dom";
import "./index.css";

function CategoriesFilterGroup(props) {
  const categ_filters = [
    {
      slug: "recent",
      text: "All",
    },
    {
      slug: "press",
      text: "Press Issues",
    },
    {
      slug: "gradmag",
      text: "GradMag",
    },
    {
      slug: "freshmanual",
      text: "Freshmanual",
    },
    {
      slug: "uaap-primer",
      text: "UAAP Primers",
    },
    {
      slug: "legacy",
      text: "Over the Years",
    },
    {
      slug: "others",
      text: "Others",
    },
  ];

  const getPageOneSearchParams = () => {
    let nsp = new URLSearchParams(props.searchParams);
    nsp.set("page", "1");
    return nsp;
  };

  return (
    <div className="categ-filters">
      {categ_filters.map((categ) => (
        <NavLink
          to={`/releases${
            categ.slug ? "/" + categ.slug : ""
          }?${getPageOneSearchParams().toString()}`}
          key={`categ-filter-${categ.slug}`}
        >
          {categ.text}
        </NavLink>
      ))}
    </div>
  );
}

export default CategoriesFilterGroup;
