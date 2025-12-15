/* setting filter bar logic - 
clicking a filter option redirects to flowers.html,
selected filters are passed through URL query parameters
*/

// below are all filter chips (Flowers, Seasons, Colours, etc.)
const chips = document.querySelectorAll(".flower-filter-bar .filter-chip");

// below are all links inside each dropdown menu
const links = document.querySelectorAll(".flower-filter-bar .filter-menu a");

// object to store selected filters
const active = {};

// setting to store original label text for each chip
chips.forEach(chip => {
  const label =
    chip.childNodes[0]?.textContent?.replace("▾", "").trim() || "Filter";

  // saving category name on the chip itself
  chip.dataset.label = label;
});

// handling opening/closing dropdowns on click
chips.forEach(chip => {
  chip.addEventListener("click", (e) => {
    e.stopPropagation();

    // close other open chips
    chips.forEach(c => c !== chip && c.classList.remove("open"));

    // toggle current chip
    chip.classList.toggle("open");
  });
});

// clicking outside closes all dropdowns
document.addEventListener("click", () => {
  chips.forEach(c => c.classList.remove("open"));
});

// mapping visible category names to data keys
const keyMap = {
  "flowers": "flowers",
  "meanings": "meanings",
  "seasons": "seasons",
  "colours": "colours",
  "use/purpose": "use",
  "difficulty": "difficulty",
};

// when a dropdown option is clicked,
links.forEach(a => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    // find which chip this option belongs to
    const chip = a.closest(".filter-chip");

    // get category name from saved label
    const cat = (chip.dataset.label || "").toLowerCase();

    // map category to correct data key
    const key = keyMap[cat];
    if (!key) return;

    // selected value
    const value = a.textContent.trim().toLowerCase();

    // store selected filter
    active[key] = value;

    // build query string and redirect - eg. flowers.html?seasons=spring&colours=pink
    const qs = new URLSearchParams(active).toString();
    window.location.href = `flowers.html?${qs}`;
  });
});


// below is setting flower detail page logic

// reading query parameter from URL
const params = new URLSearchParams(window.location.search);
const name = params.get("name") || "doubleTulip"; // fallback if no name is provided

// adding main flower datas, each represents one flower profile
const FLOWERS = {
  doubleTulip: {
    displayName: "Double Tulip",
    image: "imgs/IMG_0566.jpg",
    symbolism: [
      "In Europe: perfect love and elegance",
      "In modern gardens: renewal and the arrival of spring"
    ],
    season: "Blooms in spring",
    petSafety: "Toxic to cats and dogs. Can cause drooling, vomiting, and gastrointestinal irritation if ingested.",
    scent: "Very mild floral scent",
    palette: "pink, orange, yellow, and multicoloured varieties.",
    tips: "Plant in full sun with well-drained soil. Avoid overwatering bulbs."
  },

  pansyPurple: {
    displayName: "Pansy",
    image: "imgs/IMG_0567.jpg",
    symbolism: [ "Thoughtfulness and remembrance", "Associated with loving thoughts and reflection"
    ],
    season: "Blooms in spring and fall",
    petSafety: "Non-toxic to cats and dogs.",
    scent: "Very mild, almost scentless",
    palette: "purple, blue, yellow, white, and multicoloured varieties.",
    tips: "Cold-tolerant and beginner-friendly. Thrives in full sun to partial shade."
  },

  whiteAzalea: {
    displayName: "White Azalea",
    image: "imgs/IMG_0568.jpg",
    symbolism: [ "Temperance and emotional restraint", "In East Asia: femininity and fragility"
    ],
    season: "Blooms in late spring",
    petSafety: "Highly toxic to cats and dogs. Ingestion can cause vomiting, diarrhea, weakness, and cardiac issues.",
    scent: "Light, sweet floral scent",
    palette: "white, pink, red, and lavender varieties.",
    tips: "Prefers partial shade and acidic, well-drained soil."
  },

  blueStarFlower: {
    displayName: "Blue Star Flower",
    image: "imgs/IMG_0569.jpg",
    symbolism: [ "Calmness and serenity", "Symbol of gentle encouragement and hope"
    ],
    season: "Blooms in late spring to summer",
    petSafety: "Use caution around pets. Toxicity is not well-documented.",
    scent: "Mild, fresh scent",
    palette: "soft blue and pale lavender varieties.",
    tips: "Grows best in full sun and moderate watering."
  },

  pansyLight: {
    displayName: "Light Pansy",
    image: "imgs/IMG_0571.jpg",
    symbolism: [ "Tenderness and gentle affection", "Often used to express quiet admiration"
    ],
    season: "Blooms in spring and fall",
    petSafety: "Non-toxic to cats and dogs.",
    scent: "Very mild, almost scentless",
    palette: "white, lavender, pale yellow, and soft purple varieties.",
    tips: "Ideal for pots and window boxes. Deadhead for longer blooming."
  },
    roseLight: {
    displayName: "Light Rose",
    image: "imgs/IMG_0578.jpg",
    symbolism: [
      "Grace, elegance, and gentle love",
      "Often associated with appreciation and quiet romance"
    ],
    season: "Blooms from early summer to early fall",
    petSafety: "Non-toxic to cats and dogs, but thorns may cause injury.",
    scent: "Light, soft floral fragrance",
    palette: "soft blush pink, cream, and pale peach tones",
    tips: "Thrives in full sun. Regular pruning and good air circulation help maintain healthy blooms."
  },
  roseRed: {
    displayName: "Red Rose",
    image: "imgs/IMG_0579.jpg",
    symbolism: [
      "Love, passion, and strong emotional expression",
      "Traditionally used to convey deep affection"
    ],
    season: "Blooms from early summer through late summer",
    petSafety: "Non-toxic to cats and dogs, but thorns may cause injury.",
    scent: "Moderate to strong classic rose fragrance",
    palette: "deep red, crimson, and vibrant pink shades",
    tips: "Prefers full sun and nutrient-rich soil. Remove spent blooms to encourage continuous flowering."
  },
  
  lisianthusPurple: {
    displayName: "Lisianthus",
    image: "imgs/IMG_0572.jpg",
    symbolism: [ "Appreciation and gratitude", "Associated with elegance and calm beauty"
    ],
    season: "Blooms in summer",
    petSafety: "Use caution around pets. Generally considered low toxicity.",
    scent: "Very mild, slightly sweet scent",
    palette: "purple, white, pink, blue, and bi-colour varieties.",
    tips: "Requires bright light and consistent watering. Not ideal for beginners."
  },

  purpleAster: {
    displayName: "Aster",
    image: "imgs/IMG_0575.jpg",
    symbolism: [ "Patience and elegance", "In folk, a symbol of love and wisdom"
    ],
    season: "Blooms in late summer and fall",
    petSafety: "Non-toxic to cats and dogs.",
    scent: "Mild, herbal scent",
    palette: "purple, blue, pink, and white varieties.",
    tips: "Excellent for pollinator gardens. Prefers full sun."
  },

  whitePhlox: {
    displayName: "White Phlox",
    image: "imgs/IMG_0576.jpg",
    symbolism: [ "Harmony and unity", "Represents shared hearts and cooperation"
    ],
    season: "Blooms in summer",
    petSafety: "Non-toxic to cats and dogs.",
    scent: "Sweet, noticeable floral scent",
    palette: "white, pink, lavender, and bi-colour varieties.",
    tips: "Water regularly and provide good air circulation to prevent mildew."
  },

  coreopsisYellow: {
    displayName: "Coreopsis",
    image: "imgs/IMG_0577.jpg",
    symbolism: [ "Cheerfulness and optimism", "Associated with resilience and joy"
    ],
    season: "Blooms from early summer to fall",
    petSafety: "Non-toxic to cats and dogs.",
    scent: "Very mild, slightly earthy scent",
    palette: "yellow, orange, and red-accented varieties.",
    tips: "Extremely easy to grow. Thrives in full sun and tolerates drought."
  }
};

// get selected flower data (fallback to double tulip)
const data = FLOWERS[name] || FLOWERS["doubleTulip"];


// below is injecting data to dom

// main title and image
document.getElementById("flower-name").textContent = data.displayName;
document.getElementById("flower-image").src = data.image;
document.getElementById("flower-image").alt = data.displayName;

// breadcrumb text
document.getElementById("breadcrumb").textContent =
  `Home > Flowers > ${data.displayName}s > ${data.displayName}`;

// populate symbolism list
const ul = document.getElementById("symbolism-list");
ul.innerHTML = ""; // clear existing content

data.symbolism.forEach(text => {
  const li = document.createElement("li");
  li.textContent = text;
  ul.appendChild(li);
});

// other flower details
document.getElementById("season").textContent = data.season;
document.getElementById("pet-safety").textContent = data.petSafety;
document.getElementById("scent").textContent = data.scent;
document.getElementById("palette").textContent = data.palette;
document.getElementById("growing-tips").textContent = data.tips;


// generating suggested flowers

// get all flower keys
const allFlowerNames = Object.keys(FLOWERS);

// remove current flower from list
const otherFlowers = allFlowerNames.filter(f => f !== name);

// shuffle array randomly
const shuffled = otherFlowers.sort(() => Math.random() - 0.5);

// select 3 random flowers
const suggested = shuffled.slice(0, 3);

// render suggested flower cards
const container = document.getElementById("suggested-container");
container.innerHTML = ""; // reset container

suggested.forEach(flowerKey => {
  const f = FLOWERS[flowerKey];

  // create clickable card
  const card = document.createElement("a");
  card.classList.add("suggested-card");
  card.href = `flower-detail.html?name=${flowerKey}`;
  card.innerHTML = `
    <img src="${f.image}" alt="${f.displayName}">
  `;

  container.appendChild(card);
});
