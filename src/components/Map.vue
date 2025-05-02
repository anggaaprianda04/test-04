<template>
  <div id="map" style="height: 80vh"></div>
</template>

<script>
import { onMounted, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../node_modules/leaflet.markercluster/dist/MarkerCluster.css";
import "../../node_modules/leaflet.markercluster/dist/leaflet.markercluster.js";

export default {
  name: "Map",
  props: {
    locations: Array,
  },
  setup(props) {
    let map;
    let markers;

    onMounted(() => {
      map = L.map("map").setView([-2.5, 118], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      markers = L.markerClusterGroup({
        showCoverageOnHover: false, // Jangan tampilkan jumlah marker saat hover
        zoomToBoundsOnClick: true,
        iconCreateFunction: function (cluster) {
          return new L.icon({
            iconUrl:
              "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          });
        },
        maxClusterRadius: 30,
      });

      map.addLayer(markers);
    });

    watch(
      () => props.locations,
      (newLocations) => {
        if (!map || !newLocations || !newLocations.length) return;

        let markerList = [];

        newLocations.forEach((loc) => {
          if (loc.latitude && loc.longitude) {
            const marker = L.marker([loc.latitude, loc.longitude], {
              icon: L.icon({
                iconUrl:
                  "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
              }),
            })
              .bindPopup(`<b>${loc.name}</b>`, { autoClose: false })
              .addTo(map);

            markers.addLayer(marker);

            marker.openPopup();

            marker.on("click", function () {
              marker.openPopup();
            });

            markerList.push(marker);

            marker.on("popupopen", function () {
              if (markerList.length >= 2) {
                const latLngs = markerList.map((marker) => marker.getLatLng());
                L.polyline(latLngs, { color: "red", weight: 0.3 }).addTo(map);
              }
            });
          } else {
            console.error("Data lokasi tidak lengkap: ", loc);
          }
        });
      },
      { immediate: true }
    );
  },
};
</script>
