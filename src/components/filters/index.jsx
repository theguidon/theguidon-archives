import "./index.css";
import CategoriesFilterGroup from "./categories";
import AdvancedFiltersGroup from "./advanced";
import ViewsFilterGroup from "./views";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMinmaxDates } from "../../redux/modules/minmax-dates";
import { useParams, useSearchParams } from "react-router-dom";
import { validateRangeFilter } from "../../utils";

function FiltersGroup(props) {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const minmaxDates = useSelector((state) => state.minmaxDates);

  const [yearFilter, setYearFilter] = useState(
    searchParams.get("year") != null &&
      !isNaN(searchParams.get("year")) &&
      parseInt(searchParams.get("year")) >= minmaxDates.min.year &&
      parseInt(searchParams.get("year")) <= minmaxDates.max.year
      ? parseInt(searchParams.get("year"))
      : null
  );
  const [rangeFilter, setRangeFilter] = useState({
    from: null,
    until: null,
  });
  const [sortOldestFilter, setSortOldestFilter] = useState(
    searchParams.get("sort") == "oldest"
  );
  const [isGridView, setIsGridView] = useState(
    searchParams.get("view") != "list"
  );
  const [activeFilterPopup, setActiveFilterPopup] = useState(null);

  useEffect(() => {
    dispatch(fetchMinmaxDates());
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

      if (intyear >= minmaxDates.min.year && intyear <= minmaxDates.max.year) {
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

    // range
    let from = searchParams.get("from");
    let until = searchParams.get("until");
    let new_range = {
      from: validateRangeFilter(from, "from"),
      until: validateRangeFilter(until, "until"),
    };
    if (from != null && new_range.from == null)
      toReplace.push({ key: "from", delete: true });
    if (until != null && new_range.until == null)
      toReplace.push({ key: "until", delete: true });

    setRangeFilter(new_range);

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
    if (minmaxDates.isUpdated) {
      if (
        yearFilter < minmaxDates.min.year ||
        yearFilter > minmaxDates.max.year
      )
        props.replaceSearchParams([{ key: "year", delete: true }]);
    }
  }, [minmaxDates]);

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
          minDate={minmaxDates.min}
          maxDate={minmaxDates.max}
          rangeFilter={rangeFilter}
          setRangeFilter={setRangeFilter}
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
