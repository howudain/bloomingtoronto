// setting flowers dropdown filters, click to open dropdown
// show selected value on chip
// filter gallery items based on selection


// all filter chips (Flowers, Seasons, Colours, etc.)
const chips = document.querySelectorAll(".flower-filter-bar .filter-chip");

// all clickable options inside dropdown menus
const links = document.querySelectorAll(".flower-filter-bar .filter-menu a");

// all flower items in the gallery
const items = document.querySelectorAll(".gallery .item");

// store currently active filters
// keys must match the data attributes on each item
const activeFilters = {};

// save the original label text of each chip (before selection)
chips.forEach((chip) => {
  // grab the text node before the dropdown arrow
  const labelText =
    chip.childNodes[0]?.textContent?.replace("▾", "").trim() || "Filter";

  // store original label so we know which category this chip belongs to
  chip.dataset.label = labelText;
});

// chip click behavior - open/close dropdown on click (not hover)
chips.forEach((chip) => {
  chip.addEventListener("click", (e) => {
    e.stopPropagation();

    // close any other open chips
    chips.forEach((c) => {
      if (c !== chip) c.classList.remove("open");
    });

    // toggle current chip
    chip.classList.toggle("open");
  });
});

// clicking outside closes all dropdowns
document.addEventListener("click", () => {
  chips.forEach((c) => c.classList.remove("open"));
});

// when a dropdown option is clicked, update chip label to show selected value
// store filter, apply filtering and close dropdown
links.forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    // find which chip this option belongs to
    const chip = a.closest(".filter-chip");
    if (!chip) return;

    // category name comes from original chip label
    const category = (chip.dataset.label || "").toLowerCase();

    // selected value
    const value = a.textContent.trim().toLowerCase();

    // map visible category names to data
    const keyMap = {
      "flowers": "flowers",
      "meanings": "meanings",
      "seasons": "seasons",
      "colours": "colours",
      "use/purpose": "use",
      "difficulty": "difficulty",
    };

    const key = keyMap[category];
    if (!key) return;

    // save selected filter
    activeFilters[key] = value;

    // update chip text to show current selection
    chip.childNodes[0].textContent = `${a.textContent.trim()} ▾`;

    // close dropdown
    chip.classList.remove("open");

    // apply filtering to gallery
    applyFilters();
  });
});

// main filtering logic, compare active filters with each item's data-* attributes
function applyFilters() {
  items.forEach((item) => {
    // check if item matches all active filters
    const matchesAll = Object.entries(activeFilters).every(([key, value]) => {
      const itemValue = (item.dataset[key] || "").toLowerCase();
      return itemValue === value;
    });

    // hide items that don't match
    item.classList.toggle("hide", !matchesAll);
  });
}
