// Map init- set Toronto as the default center point
const toronto = [43.65107, -79.347015];

// Create the Leaflet map inside the element with id="bloom-map"
const map = L.map("bloom-map").setView(toronto, 11);
// Add OpenStreetMap tiles as the background map layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,// maxZoom controls how far users can zoom in
  attribution: "&copy; OpenStreetMap contributors",// attribution shows credit text on the map
}).addTo(map);

// adding datas where each object is one spot that will become one map marker
const flowerSpots = [
  {
    id: "highpark-cherry",
    name: "High Park – Cherry Blossoms",
    flowers: ["cherry blossom", "sakura"],
    coords: [43.6465, -79.4637],
    colours: ["pink", "white"],
    seasons: ["spring"],
    region: "etobicoke",
    description: "Late April to early May.",
    markerImage: "imgs/cherryblossom.png", // icon image path Reference: Stockadobe
  },
  {
  id: "highpark-phlox",
  name: "High Park – Phlox",
  flowers: ["Phlox"],
  coords: [43.6465, -79.4637],
  colours: ["pink", "white", "purple"],
  seasons: ["spring", "early summer"],
  region: "etobicoke",
  description: "Late spring to early summer, commonly found along garden beds and naturalized areas of High Park.",
  markerImage: "imgs/phlox.png",// icon image path Reference: Stockadobe
  },
  {
    id: "trinity-cherry",
    name: "Trinity Bellwoods Park – Cherry Blossoms",
    flowers: ["cherry blossom", "sakura"],
    coords: [43.647, -79.408],
    colours: ["pink", "white"],
    seasons: ["spring"],
    region: "downtown",
    description: "Late spring to early summer to spring.",
    markerImage: "imgs/cherryblossom.png",// icon image path Reference: Stockadobe
  },
  {
    id: "tbg-phlox",
    name: "Toronto Botanical Garden – Phlox",
    flowers: ["phlox"],
    coords: [43.647, -79.408],
    colours: ["pink", "white", "purple"],
    seasons: ["spring", "early summer"],
    region: "midtown",
    description: "Common in perennial beds during late spring.",
    markerImage: "imgs/phlox.png",// icon image path Reference: Stockadobe
  },
  {
    id: "sunnybrook-phlox",
    name: "Sunnybrook Park – Phlox",
    flowers: ["phlox"],
    coords: [43.7196, -79.3584],
    colours: ["pink", "white", "purple"],
    seasons: ["spring", "early summer"],
    region: "midtown",
    description: "Perennial beds and naturalized edges in late spring.",
    markerImage: "imgs/phlox.png",// icon image path Reference: Stockadobe
  },
  {
    id: "edwards-azaleas",
    name: "Edwards Gardens – Azaleas",
    flowers: ["azaleas"],
    coords: [43.7336, -79.3637],
    colours: ["pink", "white"],
    seasons: ["spring"],
    region: "midtown",
    description: "Azaleas bloom in late spring and are commonly found in shaded garden areas of Edwards Gardens.",
    markerImage: "imgs/azaleas.png",// icon image path Reference: Stockadobe
  },
  {
    id: "guild-azaleas",
    name: "Guild Park & Gardens – Azaleas",
    flowers: ["azaleas"],
    coords: [43.7465, -79.1981],
    colours: ["pink", "white"],
    seasons: ["spring"],
    region: "midtown",
    description: "Decorative azaleas bloom throughout formal garden areas.",
    markerImage: "imgs/azaleas.png",// icon image path Reference: Stockadobe
  },
  {
    id: "highpark-tulips",
    name: "High Park – Tulips",
    flowers: ["tulip"],
    coords: [43.6465, -79.4637],
    colours: ["yellow", "pink", "red"],
    seasons: ["spring"],
    region: "west",
    description: "Tulips are planted throughout High Park and bloom in early to mid spring.",
    markerImage: "imgs/tulip.png",
  },
  {
    id: "queenspark-tulips",
    name: "Queen’s Park – Tulips",
    flowers: ["tulip"],
    coords: [43.6635, -79.3920],
    colours: ["red", "yellow", "pink"],
    seasons: ["spring"],
    region: "downtown",
    description: "Tulips bloom across formal beds in early spring.",
    markerImage: "imgs/tulip.png",// icon image path Reference: Stockadobe
  },
  {
    id: "city-pansy",
    name: "Downtown Toronto – Pansies",
    flowers: ["pansy"],
    coords: [43.6529, -79.3849],
    colours: ["purple", "yellow", "white"],
    seasons: ["spring", "fall"],
    region: "downtown",
    description: "Pansies are commonly planted in city planters and park beds across downtown Toronto.",
    markerImage: "imgs/pansy.png",// icon image path Reference: Stockadobe
  },
  {
    id: "tommy-thompson-asters",
    name: "Tommy Thompson Park – Asters",
    flowers: ["asters"],
    coords: [43.627, -79.33],
    colours: ["purple", "white"],
    seasons: ["fall"],
    region: "etobicoke",
    description: "Native asters bloom in late summer to fall throughout the meadows of Tommy Thompson Park.",
    markerImage: "imgs/asters.png",// icon image path Reference: Stockadobe
  },
  {
    id: "donvalley-aster",
    name: "Don Valley Trails – Asters",
    flowers: ["asters"],
    coords: [43.6950, -79.3500],
    colours: ["purple", "white"],
    seasons: ["fall"],
    region: "east",
    description: "Wild asters line trails during early fall.",
    markerImage: "imgs/asters.png",// icon image path Reference: Stockadobe
  },
  {
    id: "florist-oxypetalum",
    name: "Toronto Flower Shops – Oxypetalum",
    flowers: ["oxypetalum", "blue star"],
    coords: [43.6532, -79.3832],
    colours: ["blue"],
    seasons: ["year-round"],
    region: "downtown",
    description: "Oxypetalum is not grown outdoors in Toronto and is mainly seen as a cut flower in local florists.",
    markerImage: "imgs/oxypetalum.png",// icon image path Reference: Stockadobe
  },
  {
    id: "florist-lisianthus",
    name: "Toronto Flower Shops – Lisianthus",
    flowers: ["lisianthus"],
    coords: [43.6532, -79.3832],
    colours: ["white", "pink", "purple"],
    seasons: ["year-round"],
    region: "downtown",
    description: "Lisianthus is commonly sold as a cut flower in Toronto florists but does not grow outdoors locally.",
    markerImage: "imgs/lisianthus.png",// icon image path Reference: Stockadobe
  },
  {
    id: "queenspark-roses",
    name: "Queen’s Park – Roses",
    flowers: ["roses"],
    coords: [43.6649, -79.3926],
    colours: ["pink", "red", "white"],
    seasons: ["summer"],
    region: "downtown",
    description: "Formal rose beds bloom from early summer through early fall.",
    markerImage: "imgs/rose.png",// icon image path Reference: Stockadobe
  },
  {
    id: "edwards-roses",
    name: "Edwards Gardens – Roses",
    flowers: ["roses"],
    coords: [43.7348, -79.3619],
    colours: ["pink", "red", "white"],
    seasons: ["summer"],
    region: "midtown",
    description: "Well-maintained rose beds with continuous summer blooms.",
    markerImage: "imgs/rose.png",// icon image path Reference: Stockadobe
  },
  {
    id: "highpark-roses",
    name: "High Park – Roses",
    flowers: ["roses"],
    coords: [43.6458, -79.4620],
    colours: ["pink", "red", "white"],
    seasons: ["summer"],
    region: "etobicoke",
    description: "Landscape roses planted in formal beds and pathways.",
    markerImage: "imgs/rose.png",// icon image path Reference: Stockadobe
  }
];

// Filter state- one selected value per category
const selected = {
  flower: null,
  colour: null,
  season: null,
  region: null,
};

// Create a custom Leaflet icon from an image URL       Reference: ChatGPT
function flowerIcon(imgUrl) {
  return L.icon({
    iconUrl: imgUrl,
    iconSize: [44, 44],     
    iconAnchor: [22, 22],   
    popupAnchor: [0, -22],  
    className: "flower-photo-marker",
  });
}

// Pre-build all markers once so filtering is just add/remove layers
const markers = flowerSpots.map((spot) => {
  const marker = L.marker(spot.coords, {
    icon: flowerIcon(spot.markerImage || "imgs/IMG_0566.jpg"),
  });

  marker.spotData = spot;

  // Bind popup HTML so clicking marker shows details and a preview image
  marker.bindPopup(
    `<strong>${spot.name}</strong><br/>
     <img src="${spot.markerImage || ""}" alt=""
          style="width:140px;height:90px;object-fit:cover;border-radius:12px;margin:8px 0;" /><br/>
     Colours: ${spot.colours.join(", ")}<br/>
     Season: ${spot.seasons.join(", ")}<br/>
     Region: ${spot.region}<br/>
     <small>${spot.description}</small>`
  );
  // Add marker to map initially
  marker.addTo(map);
  return marker;
});

// Decide if a spot matches the current selected filter state
function matches(spot) {
  if (
    selected.flower &&
    !spot.flowers.some((f) => f.toLowerCase().includes(selected.flower))
  ) {
    return false;
  }

  if (selected.colour && !spot.colours.includes(selected.colour)) return false;
  if (selected.season && !spot.seasons.includes(selected.season)) return false;
  if (selected.region && spot.region !== selected.region) return false;

  return true;
}

// Update which markers are visible based on the filters
function updateMarkers() {
  const visibleMarkers = [];

  markers.forEach((m) => {
    const spot = m.spotData;
    const ok = matches(spot);

    if (ok) {
      if (!map.hasLayer(m)) m.addTo(map);
      visibleMarkers.push(m);
    } else {
      if (map.hasLayer(m)) map.removeLayer(m);
    }
  });

  if (visibleMarkers.length > 0) {
    const group = L.featureGroup(visibleMarkers);
    map.fitBounds(group.getBounds(), { padding: [40, 40] });
  } else {
    map.setView(toronto, 11);
  }
}

// Chip click logic -  
// read which filter group it belongs to
// toggle chip on/off, store selected value and refresh markers        Reference: chatGPT
document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const type = chip.dataset.filterType;
    const value = chip.dataset.filterValue;

    const wasActive = chip.classList.contains("is-active");

    document
      .querySelectorAll(`.chip[data-filter-type="${type}"]`)
      .forEach((c) => c.classList.remove("is-active"));

    if (wasActive) {
      selected[type] = null;
      updateMarkers();
      return;
    }

    chip.classList.add("is-active");
    selected[type] = value;
    updateMarkers();
  });
});

const searchInput = document.getElementById("flowerSearch");
searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  selected.flower = q || null;
  updateMarkers();
});

updateMarkers();
