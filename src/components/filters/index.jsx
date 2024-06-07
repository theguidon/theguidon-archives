import "./index.css";
import CategoriesFilterGroup from "./categories";
import AdvancedFiltersGroup from "./advanced";
import ViewsFilterGroup from "./views";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMinmaxYears } from "../../redux/modules/minmax-years";
import { useParams, useSearchParams } from "react-router-dom";

function FiltersGroup(props) {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const minmaxYears = useSelector((state) => state.minmaxYears);

  const [yearFilter, setYearFilter] = useState(
    searchParams.get("year") != null &&
      !isNaN(searchParams.get("year")) &&
      parseInt(searchParams.get("year")) >= minmaxYears.min &&
      parseInt(searchParams.get("year")) <= minmaxYears.max
      ? parseInt(searchParams.get("year"))
      : null
  );
  const [sortOldestFilter, setSortOldestFilter] = useState(
    searchParams.get("sort") == "oldest"
  );
  const [isGridView, setIsGridView] = useState(
    searchParams.get("view") != "list"
  );
  const [activeFilterPopup, setActiveFilterPopup] = useState(null);

  useEffect(() => {
    dispatch(fetchMinmaxYears());
  }, []);

  /**
   * Update document title
   * Checking all search params
   */
  useEffect(() => {
    // console.log("checking search params");

    // if (slug != null) {
    let toReplace = [];

    // year
    let year = searchParams.get("year");
    if (!isNaN(year)) {
      let intyear = parseInt(year);

      if (intyear >= minmaxYears.min && intyear <= minmaxYears.max) {
        if (parseFloat(year) % 1 == 0) setYearFilter(intyear);
        else toReplace.push({ key: "year", value: intyear });
      } else {
        toReplace.push({ key: "year", delete: true });
        setYearFilter(null);
      }
    } else {
      toReplace.push({ key: "year", delete: true });
      setYearFilter(null);
    }

    // sort
    let sort = searchParams.get("sort");
    setSortOldestFilter(sort == "oldest");
    if (sort != "newest" && sort != "oldest")
      toReplace.push({ key: "sort", value: "newest" });

    // view
    let view = searchParams.get("view");
    setIsGridView(view != "list");
    if (view != "grid" && view != "list")
      toReplace.push({ key: "view", value: "grid" });

    props.replaceSearchParams(toReplace);
    // }
  }, [slug, searchParams]);

  /**
   * Remove yearFilter if out of bounds
   */
  useEffect(() => {
    if (minmaxYears.isUpdated) {
      if (yearFilter < minmaxYears.min || yearFilter > minmaxYears.max)
        props.replaceSearchParams([{ key: "year", delete: true }]);
    }
  }, [minmaxYears]);

  return (
    <div className="filters">
      {!props.hideCategories && (
        <CategoriesFilterGroup searchParams={searchParams} />
      )}

      <div className="advanced-group">
        <AdvancedFiltersGroup
          activeFilterPopup={activeFilterPopup}
          setActiveFilterPopup={setActiveFilterPopup}
          yearFilter={yearFilter}
          minYear={minmaxYears.min}
          maxYear={minmaxYears.max}
          sortOldestFilter={sortOldestFilter}
          replaceSearchParams={props.replaceSearchParams}
        />

        <ViewsFilterGroup
          isGridView={isGridView}
          replaceSearchParams={props.replaceSearchParams}
        />
      </div>
    </div>
  );
}

export default FiltersGroup;
