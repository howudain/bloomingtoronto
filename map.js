
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
      region: "west",
      description: "Famous cherry blossoms in late April–early May.",
    },
    {
      id: "allan-gardens",
      name: "Allan Gardens Conservatory",
      flowers: ["orchids", "tropical flowers"],
      coords: [43.6613, -79.3726],
      colours: ["yellow", "white", "purple"],
      seasons: ["spring", "summer", "fall"],
      region: "downtown",
      description: "Indoor and outdoor beds with rotating seasonal displays.",
    },
    {
      id: "edwards-gardens",
      name: "Edwards Gardens",
      flowers: ["roses", "tulips", "peonies"],
      coords: [43.7336, -79.3637],
      colours: ["yellow", "pink", "purple"],
      seasons: ["spring", "summer"],
      region: "midtown",
      description: "Formal beds, perennials, and pollinator-friendly plants.",
    },
    {
      id: "trinity-bellwoods",
      name: "Trinity Bellwoods Park",
      flowers: ["wildflowers"],
      coords: [43.646, -79.4148],
      colours: ["white", "yellow"],
      seasons: ["summer"],
      region: "downtown",
      description: "Open lawns with pockets of wildflower and tree blooms.",
    },
    {
      id: "tommy-thompson",
      name: "Tommy Thompson Park",
      flowers: ["goldenrod", "asters"],
      coords: [43.627, -79.33],
      colours: ["yellow", "purple", "white"],
      seasons: ["summer", "fall"],
      region: "east",
      description: "Lakeside meadows and naturalized areas with native species.",
    },
  ];
  

// 3) Filter state (각 그룹 1개만 선택되는 구조)
const selected = {
    flower: null,   // ⭐ 추가

  
  colour: null,
  season: null,
  region: null,
};

// 4) Markers: 처음에 전부 만들어두기
const markers = flowerSpots.map((spot) => {
  const marker = L.marker(spot.coords);
  marker.spotData = spot; // 붙여두기(중요)

  marker.bindPopup(
    `<strong>${spot.name}</strong><br/>
     Colours: ${spot.colours.join(", ")}<br/>
     Season: ${spot.seasons.join(", ")}<br/>
     Region: ${spot.region}<br/>
     <small>${spot.description}</small>`
  );

  marker.addTo(map); // 처음엔 전부 보이게
  return marker;
});

// 5) 필터 매칭
function matches(spot) {

  if (
    selected.flower &&
    !spot.flowers.some(f =>
      f.toLowerCase().includes(selected.flower)
    )
  ) {
    return false;
  }

  // 기존 colour / season / region 조건
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

  // 보이는 마커들로 화면 맞추기
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
    const type = chip.dataset.filterType;   // colour/season/region
    const value = chip.dataset.filterValue; // pink/spring/downtown...

    const wasActive = chip.classList.contains("is-active");

    // 같은 그룹의 칩들 끄기
    document
      .querySelectorAll(`.chip[data-filter-type="${type}"]`)
      .forEach((c) => c.classList.remove("is-active"));

    // 토글: 이미 켜져있던 걸 누르면 해제
    if (wasActive) {
      selected[type] = null;
      updateMarkers();
      return;
    }

    // 새로 선택
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
