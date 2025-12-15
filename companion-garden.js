// =======================
// Flower dataset
// =======================

const flowers = [
  {
    id: "double-tulip",
    image: "imgs/IMG_0566.jpg",
    name: "Double Tulip",
    color: "pink, yellow",
    season: "Spring",
    description: "Layered tulip with peony-like petals. Common in spring city planters.",
    toxicity: "Toxic to cats and dogs",
    bestFor: "City planters, garden beds",
    companions: ["pansy", "hyacinth"]
  },
  {
    id: "pansy-purple",
    image: "imgs/IMG_0567.jpg",
    name: "Purple Pansy",
    color: "purple",
    season: "Spring, Fall",
    description: "Cold-tolerant annual often used in urban planters.",
    toxicity: "Non-toxic to cats and dogs",
    bestFor: "Planters, balcony pots",
    companions: ["tulip", "snapdragon"]
  },
  {
    id: "white-azalea",
    image: "imgs/IMG_0568.jpg",

  name: "Azalea",
  color: "white",
  season: "Spring",
  description: "Ornamental flowering shrub with dense spring blooms.",
  toxicity: "Highly toxic to cats and dogs",
  bestFor: "Garden landscapes, park shrubs",
  companions: ["hosta", "fern"]
  },
  {
    id: "blue-star-flower",
    image: "imgs/IMG_0569.jpg",

    name: "Oxypetalum",
    color: "blue",
    season: "Late Spring, Summer",
    description: "Star-shaped blue flowers used as soft garden accents.",
    toxicity: "Use caution around pets",
    bestFor: "Garden beds, mixed planters",
    companions: ["lavender", "salvia"]
  },
  {
    id: "pansy-light",
    image: "imgs/IMG_0571.jpg",

    name: "Pansy",
    color: "white, purple",
    season: "Spring, Fall",
    description: "Soft-colored pansy variety suitable for cool seasons.",
    toxicity: "Non-toxic to cats and dogs",
    bestFor: "Planters, window boxes",
    companions: ["tulip", "alyssum"]
  },
  {
    id: "lisianthus-purple",
    image: "imgs/IMG_0572.jpg",

    name: "Lisianthus",
    color: "purple",
    season: "Summer",
    description: "Rose-like blooms often used in decorative plantings.",
    toxicity: "Use caution around pets",
    bestFor: "Decorative beds, pots",
    companions: ["eucalyptus", "baby’s breath"]
  },
  {
    id: "aster-purple",
    image: "imgs/IMG_0575.jpg",

    name: "Aster",
    color: "purple",
    season: "Late Summer, Fall",
    description: "Pollinator-friendly perennial commonly found in Ontario.",
    toxicity: "Non-toxic to cats and dogs",
    bestFor: "Pollinator gardens, parks",
    companions: ["goldenrod", "coreopsis"]
  },
  {
    id: "white-phlox",
    image: "imgs/IMG_0576.jpg",

    name: "Phlox",
    color: "white",
    season: "Summer",
    description: "Fragrant clusters of flowers that bloom mid-summer.",
    toxicity: "Non-toxic to cats and dogs",
    bestFor: "Garden borders, beds",
    companions: ["coneflower", "black-eyed susan"]
  },
  {
    id: "coreopsis-yellow",
    image: "imgs/IMG_0577.jpg",

    name: "Coreopsis",
    color: "yellow",
    season: "Summer",
    description: "Long-blooming wildflower popular in pollinator gardens.",
    toxicity: "Non-toxic to cats and dogs",
    bestFor: "Wildflower gardens, borders",
    companions: ["aster", "salvia"]
  },
  {
    id: "rose-light",
    image: "imgs/IMG_0578.jpg",
  
    name: "Rose",
    color: "pink, red",
    season: "Summer",
    description: "Soft-toned garden rose with repeated blooms throughout summer.",
    toxicity: "Non-toxic to cats and dogs",
    bestFor: "Formal gardens, borders, landscape beds",
    companions: ["lavender", "salvia", "phlox"]
  }
];

// compatibility matrix (optional)
const compatibilityMatrix = {
  calendula: { nasturtium: 80, chrysanthemum: 75, tulip: 70, daisy: 85 },
  nasturtium: { calendula: 80, tulip: 65, daisy: 78 },
  tulip: { calendula: 70, nasturtium: 65 },
  chrysanthemum: { calendula: 75 },
  daisy: { calendula: 85, nasturtium: 78 },
};

// DOM references
const panel = document.querySelector(".companion-panel");


const flowerListEl = document.getElementById("flowerList");
const selectedStripEl = document.getElementById("selectedStrip");

const panelSelectedEl = document.getElementById("panelSelected");
const mainCardEl = document.getElementById("mainCard");
const panelCompanionsEl = document.getElementById("panelCompanions");

const compatibilityLabelEl = document.getElementById("compatibilityLabel");
const compatibilityTextEl = document.getElementById("compatibilityText");

const searchInputEl = document.getElementById("flowerSearch");
const clearSearchBtnEl = document.getElementById("clearSearch");
const noResultsEl = document.getElementById("noResults");

// State

let selectedIds = [];         
let filteredFlowers = [...flowers]; 

// Rendering helpers

// 아래 카드 리스트 (Select flowers)

function renderFlowerList() {
  flowerListEl.innerHTML = "";

  if (filteredFlowers.length === 0) {
    noResultsEl.hidden = false;
    return;
  }
  noResultsEl.hidden = true;

  filteredFlowers.forEach((flower) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "flower-card";
    if (selectedIds.includes(flower.id)) {
      button.classList.add("flower-card--selected");
    }

    button.innerHTML = `
    <div class="flower-card__thumb" aria-hidden="true"
    style="background-image:url('${flower.image}')"></div>
      <div class="flower-card__season">${flower.season}</div>
      <div class="flower-card__name">${flower.name}</div>
      <div class="flower-card__meta">
        ${flower.description}<br />
        <strong>${flower.toxicity}</strong>
      </div>
    `;

    button.addEventListener("click", () => toggleSelection(flower.id));
    flowerListEl.appendChild(button);
  });
}

// 중간 스트립 (Companion group)
function renderSelectedStrip() {
  selectedStripEl.innerHTML = "";
  if (selectedIds.length === 0) return;

  selectedIds.forEach((id) => {
    const f = flowers.find((fl) => fl.id === id);
    if (!f) return;

    const card = document.createElement("div");
    card.className = "mini-card";
    card.innerHTML = `
    <div class="mini-card__thumb" aria-hidden="true"
    style="background-image:url('${f.image}')"></div>

      <div class="mini-card__name">${f.name}</div>
      <div class="mini-card__meta">${f.season} • ${f.color}</div>
    `;
    selectedStripEl.appendChild(card);
  });
}

// 상단 큰 패널
function renderPanel() {
  if (selectedIds.length === 0) {
    panelSelectedEl.hidden = true;
    compatibilityLabelEl.textContent = "";
    compatibilityTextEl.textContent =
      "Select flowers below to explore how they can be planted together.";
    return;
  }

  panelSelectedEl.hidden = false;

  const mainId = selectedIds[0];
  const mainFlower = flowers.find((f) => f.id === mainId);

  // 메인 카드
  mainCardEl.innerHTML = `
  <article class="mini-card">
    <div class="mini-card__thumb"
         style="background-image:url('${mainFlower.image}')"
         aria-hidden="true"></div>

    <div class="mini-card__name">${mainFlower.name}</div>
    <div class="mini-card__meta">${mainFlower.season} • ${mainFlower.color}</div>
    <div class="mini-card__desc">${mainFlower.description}</div>
    <div class="mini-card__tox"><strong>${mainFlower.toxicity}</strong></div>
  </article>
`;



  // 패널 안의 companions (선택된 나머지)
  panelCompanionsEl.innerHTML = "";
  const companionIds = selectedIds.slice(1);

  companionIds.forEach((id) => {
    const f = flowers.find((fl) => fl.id === id);
    if (!f) return;

    const card = document.createElement("article");
    card.className = "mini-card";
    card.innerHTML = `
    <div class="mini-card__thumb" aria-hidden="true"
    style="background-image:url('${f.image}')"></div>

      <div class="mini-card__name">${f.name}</div>
      <div class="mini-card__meta">
        ${f.season} • ${f.color}<br />
        <span>${f.bestFor}</span>
      </div>
    `;
    panelCompanionsEl.appendChild(card);
  });

  // compatibility 표시
  const score = computeCompatibility(selectedIds);
  if (score == null) {
    compatibilityLabelEl.textContent = "Compatibility – add at least two flowers";
  } else {
    compatibilityLabelEl.textContent = `Compatibility – ${score}%`;
  }
  compatibilityTextEl.textContent = buildCompatibilityExplanation(selectedIds, score);
}

// =======================
// Compatibility helpers
// =======================

function computeCompatibility(ids) {
  if (ids.length < 2) return null;

  let total = 0;
  let count = 0;

  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const a = ids[i];
      const b = ids[j];

      const row = compatibilityMatrix[a] || {};
      const revRow = compatibilityMatrix[b] || {};
      const value = row[b] ?? revRow[a] ?? 60; // 디폴트 중간값

      total += value;
      count += 1;
    }
  }
  return Math.round(total / count);
}

function buildCompatibilityExplanation(ids, score) {
  if (ids.length === 0) {
    return "Select flowers below to explore how they can be planted together.";
  }

  const names = ids
    .map((id) => {
      const f = flowers.find((fl) => fl.id === id);
      return f ? f.name : id;
    })
    .join(", ");

  if (ids.length === 1) {
    return `${names} is selected. Add one or more companion flowers to see how they interact in a shared bed or container.`;
  }

  if (score == null) {
    return `You have selected ${names}.`;
  }

  if (score >= 80) {
    return `${names} make a strong companion group with good overlap in season and habit. They are well suited to mixed beds or containers where you want a cohesive look.`;
  } else if (score >= 65) {
    return `${names} can work together in the same area, but may prefer slightly different spacing or light conditions. Consider staggering them or mixing with foliage plants.`;
  } else {
    return `${names} have a lower companion score. They might still be grown near each other, but check spacing, moisture, and potential competition before planting closely.`;
  }
}


function toggleSelection(id) {
  const idx = selectedIds.indexOf(id);

  if (idx === -1) {
    // 새로 추가
    if (selectedIds.length >= 4) {
      selectedIds.shift(); // 최대 4개 유지
    }
    selectedIds.push(id);
  } else {
    // 이미 있으면 제거
    selectedIds.splice(idx, 1);
  }

  renderFlowerList();
  renderSelectedStrip();
  renderPanel();
}

function applySearch() {
  const q = (searchInputEl.value || "").trim().toLowerCase();

  if (!q) {
    filteredFlowers = [...flowers];
  } else {
    filteredFlowers = flowers.filter((f) => {
      return (
        f.name.toLowerCase().includes(q) ||
        f.color.toLowerCase().includes(q) ||
        f.season.toLowerCase().includes(q)
      );
    });
  }

  renderFlowerList();
}

// =======================
// Init
// =======================

document.addEventListener("DOMContentLoaded", () => {
  filteredFlowers = [...flowers];
  renderFlowerList();
  renderSelectedStrip();
  renderPanel();

  if (searchInputEl) {
    searchInputEl.addEventListener("input", applySearch);
  }
  if (clearSearchBtnEl) {
    clearSearchBtnEl.addEventListener("click", () => {
      searchInputEl.value = "";
      applySearch();
      searchInputEl.focus();
    });
  }
});
