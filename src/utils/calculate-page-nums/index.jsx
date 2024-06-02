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
