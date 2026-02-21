const mapElement = document.getElementById("map");

if(mapElement){

  const map = L.map('map').setView([23.6850, 90.3563], 7);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'© OpenStreetMap'
  }).addTo(map);

  let markers = [];

  function loadMarkers(filter=""){
    markers.forEach(m=>map.removeLayer(m));
    markers=[];

    let data = JSON.parse(localStorage.getItem("locations")) || [];

    data.forEach(loc=>{
      if(filter && loc.category !== filter) return;

      let marker = L.marker([loc.lat,loc.lng])
        .addTo(map)
        .bindPopup(`<b>${loc.name}</b><br>${loc.category}`);

      markers.push(marker);
    });
  }

  loadMarkers();

  window.filterCategory = function(cat){
    loadMarkers(cat);
  }

  const searchInput = document.getElementById("search");

  if(searchInput){
    searchInput.addEventListener("input", e=>{
      let q = e.target.value.toLowerCase();

      markers.forEach(m=>map.removeLayer(m));
      markers=[];

      let data = JSON.parse(localStorage.getItem("locations")) || [];

      data.forEach(loc=>{
        if(loc.name.toLowerCase().includes(q)){
          let marker = L.marker([loc.lat,loc.lng])
            .addTo(map)
            .bindPopup(loc.name);
          markers.push(marker);
        }
      });
    });
  }

}
