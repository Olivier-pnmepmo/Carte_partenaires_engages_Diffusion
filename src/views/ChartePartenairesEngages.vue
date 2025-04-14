<template>
  <div class="fullscreen">
    <div id="map"></div>

    <NavigationBar @openIntro="showIntro = true" />

    <Partenaires :map="map" />
  </div>
</template>

<script setup>
import { onMounted, ref, defineEmits, onUnmounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Partenaires from '../components/PartenairesEngagesPoints.vue';

const map = ref(null);
const emit = defineEmits(['map-ready']);

const updateMapSettings = () => {
  if (!map.value) return;

  const isMobile = window.innerWidth <= 751;
  
  // Nouvelle vue et zoom selon la taille d'écran
  const newCenter = isMobile ? [50.32, 1.20] : [50.39, 2.2];
  const newZoom = isMobile ? 9 : 9;

  setTimeout(() => {
    map.value.invalidateSize();  // Force le recalcul de la taille
    map.value.setView(newCenter, newZoom);
    map.value.setMinZoom(9);
    map.value.setMaxZoom(isMobile ? 14 : 16);
  }, 300); // Petit délai pour laisser la carte charger
};

onMounted(() => {
  map.value = L.map('map', {
    center: [50.39, 2.2], // Position initiale
    zoom: 9,
    minZoom: 9,
    maxZoom: 16
  });

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri ...'
  }).addTo(map.value);

  // Attendre que Leaflet charge puis appliquer les réglages
  setTimeout(updateMapSettings, 500);

  emit('map-ready', map.value);
  emit('force-layer-order');

  window.addEventListener('resize', updateMapSettings);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateMapSettings);
});
</script>