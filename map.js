// 1) Map init
const toronto = [43.65107, -79.347015];
const map = L.map("bloom-map").setView(toronto, 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// 2) Data 
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
    markerImage: "imgs/cherryblossom.png", // add png file 
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
  markerImage: "imgs/phlox.png",
  },
  {
    id: "trinity-cherry",
    name: "Trinity Bellwoods Park – Cherry Blossoms",
    flowers: ["cherry blossom", "sakura"],
    coords: [43.647, -79.408],
    colours: ["pink", "white"],
    seasons: ["spring"],
    region: "downtown",
    description: "Small clusters of cherry blossoms bloom briefly in spring.",
    markerImage: "imgs/cherryblossom.png",
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
    markerImage: "imgs/phlox.png",
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
    markerImage: "imgs/phlox.png",
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
    markerImage: "imgs/azaleas.png",
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
    markerImage: "imgs/azaleas.png",
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
    markerImage: "imgs/tulip.png",
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
    markerImage: "imgs/pansy.png",
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
    markerImage: "imgs/asters.png",
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
    markerImage: "imgs/asters.png",
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
    markerImage: "imgs/oxypetalum.png",
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
    markerImage: "imgs/lisianthus.png",
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
    markerImage: "imgs/rose.png",
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
    markerImage: "imgs/rose.png",
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
    markerImage: "imgs/rose.png",
  }
];

// 3) Filter state (각 그룹 1개만 선택되는 구조)
const selected = {
  flower: null,
  colour: null,
  season: null,
  region: null,
};

// ✅ 3.5) 커스텀 “꽃 사진 마커” 아이콘 생성 함수
function flowerIcon(imgUrl) {
  return L.icon({
    iconUrl: imgUrl,
    iconSize: [44, 44],     // ✅ 작게 (원하면 36,36 or 50,50)
    iconAnchor: [22, 22],   // ✅ 사진 중앙이 좌표에 오도록
    popupAnchor: [0, -22],  // ✅ 팝업이 위로 뜨게
    className: "flower-photo-marker",
  });
}

// 4) Markers: 처음에 전부 만들어두기 (✅ 파란 마커 → 사진 마커)
const markers = flowerSpots.map((spot) => {
  const marker = L.marker(spot.coords, {
    icon: flowerIcon(spot.markerImage || "imgs/IMG_0566.jpg"),
  });

  marker.spotData = spot;

  marker.bindPopup(
    `<strong>${spot.name}</strong><br/>
     <img src="${spot.markerImage || ""}" alt=""
          style="width:140px;height:90px;object-fit:cover;border-radius:12px;margin:8px 0;" /><br/>
     Colours: ${spot.colours.join(", ")}<br/>
     Season: ${spot.seasons.join(", ")}<br/>
     Region: ${spot.region}<br/>
     <small>${spot.description}</small>`
  );

  marker.addTo(map);
  return marker;
});

// 5) 필터 매칭
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

// 6) 마커 갱신 (add/remove)
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

// 7) 칩 클릭 이벤트
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
