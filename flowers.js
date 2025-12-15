// setting flowers dropdown filters, click to open dropdown
// show selected value on chip, filter gallery items based on selection

// all filter chips (Meanings, Seasons, Colours, etc.)
const chips = document.querySelectorAll(".flower-filter-bar .filter-chip");

// all clickable options inside dropdown menus
const links = document.querySelectorAll(".flower-filter-bar .filter-menu a");

// all flower items in the gallery
const items = document.querySelectorAll(".gallery .item");

// no-results message element
const noResultsEl = document.getElementById("no-results");

// Reset button element (added)
const resetBtn = document.getElementById("reset-filters");

// set hover title from image alt text (used by CSS overlay)
items.forEach((item) => {
  const img = item.querySelector("img");
  if (img && img.alt) item.dataset.title = img.alt;
});

// store currently active filters
// keys must match the data attributes on each item
const activeFilters = {};

// map visible category names to data keys
const keyMap = {
  "flowers": "flowers",
  "meanings": "meanings",
  "seasons": "seasons",
  "colours": "colours",
  "use/purpose": "use",
  "difficulty": "difficulty",
};

// normalize selected values so they match data-* values
function normalizeValue(key, value) {
  const v = (value || "").trim().toLowerCase();

  // keep old wording compatible (if you still have "Gardening" anywhere)
  if (key === "use" && v === "gardening") return "garden";

  return v;
}

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

// update chip text safely (works even if there is whitespace text nodes)
function setChipLabel(chip, text) {
  const firstNode = chip.childNodes[0];
  if (firstNode && firstNode.nodeType === Node.TEXT_NODE) {
    firstNode.textContent = `${text} ▾`;
  } else {
    // fallback if structure changes
    chip.insertBefore(document.createTextNode(`${text} ▾`), chip.firstChild);
  }
}

// find chip by key (meanings/seasons/colours/use/difficulty)
function findChipByKey(key) {
  for (const chip of chips) {
    const category = (chip.dataset.label || "").toLowerCase();
    const mapped = keyMap[category];
    if (mapped === key) return chip;
  }
  return null;
}

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

    const key = keyMap[category];
    if (!key) return;

    // selected value
    const rawValue = a.textContent.trim();
    const value = normalizeValue(key, rawValue);

    // save selected filter
    activeFilters[key] = value;

    // update chip text to show current selection
    setChipLabel(chip, rawValue);

    // close dropdown
    chip.classList.remove("open");

    // apply filtering to gallery
    applyFilters();
  });
});

// apply filters + show/hide "no results"
function applyFilters() {
  let visibleCount = 0;

  items.forEach((item) => {
    // check if item matches all active filters
    const matchesAll = Object.entries(activeFilters).every(([key, value]) => {
      const itemValue = normalizeValue(key, item.dataset[key] || "");
      return itemValue === value;
    });

    // hide items that don't match
    item.classList.toggle("hide", !matchesAll);

    if (matchesAll) visibleCount += 1;
  });

  // toggle no-results message
  if (noResultsEl) {
    noResultsEl.hidden = visibleCount !== 0;
  }
}

// OPTIONAL: read filters from URL query parameters (useful if other pages redirect here)
function initFromQueryParams() {
  const params = new URLSearchParams(window.location.search);
  if (![...params.keys()].length) return;

  params.forEach((val, key) => {
    const k = normalizeValue("", key);
    const v = normalizeValue(k, val);

    // only accept known keys
    const allowed = ["flowers", "meanings", "seasons", "colours", "use", "difficulty"];
    if (!allowed.includes(k)) return;

    activeFilters[k] = v;

    // update chip label visually
    const chip = findChipByKey(k);
    if (chip) setChipLabel(chip, val);
  });

  applyFilters();
}

// Reset all filters (added)
function resetAllFilters() {
  // Clear active filters
  Object.keys(activeFilters).forEach((k) => delete activeFilters[k]);

  // Reset chip labels back to original category names
  chips.forEach((chip) => {
    const original = chip.dataset.label || "Filter";
    setChipLabel(chip, original);
    chip.classList.remove("open");
  });

  // Show all items
  items.forEach((item) => item.classList.remove("hide"));

  // Hide no-results message
  if (noResultsEl) noResultsEl.hidden = true;

  // Clear URL query params (optional)
  if (window.location.search) {
    window.history.replaceState({}, "", window.location.pathname);
  }
}

// Hook up reset button (added)
if (resetBtn) {
  resetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    resetAllFilters();
  });
}

initFromQueryParams();
applyFilters();
