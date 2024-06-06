import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    window.scrollTo(0, 0);
  }, [pathname]);
};

export const DateFormatter = (d) => {
  let date = new Date(d);

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const calculatePageNums = (root, page) => {
  if (root != null) {
    let lim_left = page - 2;
    let lim_right = page + 2;

    // adjust right
    if (lim_right >= root.max_pages) {
      lim_left -= lim_right - root.max_pages;
      lim_right -= lim_right - root.max_pages;
    }

    // adjust left
    if (lim_left <= 0) {
      let excess = 1 - lim_left;
      lim_left += 1 - lim_left;
      if (lim_right < root.max_pages) {
        lim_right += Math.min(excess, root.max_pages - lim_right);
      }
    }

    return [...Array(lim_right - lim_left + 1)].map((_, idx) => idx + lim_left);
  }

  return [1];
};

export const setDocumentTitle = (title) => {
  if (title) document.title = `${title} | The GUIDON Archives`;
  else document.title = "The GUIDON Archives";
};

export const formatBylines = (bylines) => {
  if (bylines.length == 0) return "";

  bylines = bylines.map((byline) => `<span class="nowrap">${byline}</span>`);

  return (
    bylines.slice(0, -1).join(", ") +
    (bylines.length >= 3 ? ", and " : bylines.length > 1 ? " and " : "") +
    bylines.slice(-1)
  );
};
