<template>

  <!-- Introduction -->
  <div v-if="showIntro" class="cadre_intro_carte">
      <h1>Ils s'engagent pour nous !</h1>

      <p>Le Parc naturel marin des estuaires picards et de la mer d’Opale, ses partenaires et les prestataires de sorties en mer (canoë, kayak, pirogues ou bateaux motorisés) ou à terre (guides nature) ont mis en place <a href="/docs/Charte_engagement-mai23.pdf" target="_blank" id="lien_charte">une charte de bonnes pratiques</a> pour lutter contre le dérangement des phoques.
          <img src="/logos/partenaire_engage.png" alt="logo Partenaires engagés" class="logo_partenaires_engages" />
      </p>

      <p>Le dérangement, c’est l’interaction entre l’animal et un humain, un chien, un drone, un fat bike, un cheval ou toute autre activité qui va entrainer un changement du comportement de l’animal tel que la fuite...</p>

      <h3><span class="arrow">&#8592;</span> Cliquez sur un point de la carte pour faire connaissance avec nos partenaires engagés</h3>
  </div>

  <!-- Introduction Mobile -->
  <div v-if="showIntro" class="overlay_mobile" @click="showIntro = false"></div>
  <div v-if="showIntro" class="cadre_intro_carte_mobile" @click.stop>
    
      <button class="fermer-btn-intro" @click="showIntro = false">✖</button>
      <h1>Ils s'engagent pour nous !</h1>

      <a href="/docs/Charte_engagement-mai23.pdf" target="_blank">
        <img src="/logos/partenaire_engage.png" alt="logo Partenaires engagés" class="logo_partenaires_engages_mobile" /><img src="/logos/partenaire_engage.png" alt="logo Partenaires engagés" class="logo_partenaires_engages" />
      </a>

      <p>Le Parc naturel marin, ses partenaires et les prestataires de sorties en mer ou à terre ont mis en place <a href="/docs/Charte_engagement-mai23.pdf" target="_blank" id="lien_charte">une charte de bonnes pratiques</a> pour lutter contre le dérangement des phoques.
      </p>

      <p>Zoomez et cliquez sur un point de la carte pour faire connaissance avec nos partenaires engagés.</p>
    
  </div>



  <div class="cadre_legende">
    Les partenaires engagés :

    <div class="sous_grille_cercles">
      <span class="cercle_croisieres"></span><span>Croisières</span>
      <span class="cercle_kayak"></span><span>Kayak</span>
      <span class="cercle_randonnee"></span><span>Randonnée</span>
      <span class="cercle_voile"></span><span>Voile</span>
    </div><br>
    
    <div class="ligne_cercle">
      <span class="carre_parc"></span><span>Le Parc naturel marin</span>
    </div>
  </div>



  <!--<div v-if="showPartenaires" class="cadre_partenaires">
    <p>- Association Rando Nature en Somme</p>
    <p>- La canoterie</p>
    <p>- Commune d’Étaples-sur-Mer</p>
    <p>- Commune du Touquet-Paris-Plage</p>
    <p>- Découvrons la baie de Somme</p>
    <p>- Doc Nature</p>
    <p>- Julie Barbier Photographie</p>
    <p>- Maxim Guide en baie de Somme</p>
    <p>- Pat Rando</p>
    <p>- Sens Naturel</p>
    <p>- La vie buissonière</p>
  </div>-->

  <CartePartenaires ref="carteRef" />

  <div v-if="showPartenaires" class="cadre_partenaires">
    <div class="titre_partenaires">Découvrez les sites Internet de nos partenaires :</div>
    <p
      v-for="(partenaire, index) in partenairesList"
      :key="index"
      :class="{'highlighted': hoveredPartenaireId === partenaire.nom}"
      @mouseover="highlightPoints(partenaire.ids, partenaire.nom)"
      @mouseout="resetHighlights(partenaire.ids, partenaire.nom)"
    >
      {{ partenaire.nom }}
    </p>
  </div>

  <!-- Fiche Partenaire -->
  <FichePartenaire 
      v-if="!showIntro" 
      @back="handleBack" 
      @partenaire-selected="onPartenaireSelected" 
      :partenaireId="selectedPartenaireId" 
  />

</template>
  
<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { GeoJSON, circleMarker } from 'leaflet';
import FichePartenaire from '../components/FichesPartenaires.vue';

const props = defineProps(['map']);
const geoJsonData = ref(null);
const showIntro = ref(true);
const selectedPartenaireId = ref(null);
const showPartenaires = ref(false);
const pointsPartenaires = ref({});
const hoveredPartenaireId = ref(null); // ID du partenaire survolé
const hoveredMarker = ref(null); // Pour garder la référence du marker survolé

const partenairesList = [
  { nom: 'Association Rando Nature en Somme', ids: [8] },
  { nom: 'La canoterie', ids: [15, 16, 17] },
  { nom: 'Commune d’Étaples-sur-Mer', ids: [1, 2, 3, 4] },
  { nom: 'Commune du Touquet-Paris-Plage', ids: [18] },
  { nom: 'Découvrons la baie de Somme', ids: [9] },
  { nom: 'Doc Nature', ids: [10] },
  { nom: 'Julie Barbier Photographie', ids: [7, 12] },
  { nom: 'Maxim Guide en baie de Somme', ids: [13] },
  { nom: 'Pat Rando', ids: [5, 6] },
  { nom: 'Sens Naturel', ids: [11] },
  { nom: 'La vie buissonière', ids: [14] }
];

function highlightPoints(ids) {
  const zoomLevel = props.map.getZoom();
  ids.forEach(id => {
    const marker = pointsPartenaires.value[id];
    if (marker) {
      marker.setStyle({
        fillColor: '#16A8C1',
        radius: getCircleRadius(zoomLevel) + 2,
      });
    }
  });

  // Mettre à jour l'ID du partenaire survolé
  hoveredPartenaireId.value = partenairesList.find(p => p.ids.includes(ids[0]))?.nom;
}

function resetHighlights(ids) {
  const zoomLevel = props.map.getZoom();
  ids.forEach(id => {
    const marker = pointsPartenaires.value[id];
    if (marker) {
      const activityColors = {
        'Randonnée': '#0e823a',
        'Kayak': '#ed6a53',
        'Voile': '#C2133E',
        'Croisières': '#9a7b67',
      };
      const activity = marker.feature.properties.Activité;
      const fillColor = activityColors[activity] || '#cccccc';
      
      // Réinitialiser le style du marker
      marker.setStyle({
        fillColor: fillColor,
        radius: getCircleRadius(zoomLevel),
      });
    }
  });

  // Réinitialiser l'ID du partenaire survolé
  hoveredPartenaireId.value = null;
  hoveredMarker.value = null;  // Réinitialiser la référence
}

const getCircleRadius = (zoomLevel) => {
  return zoomLevel <= 10 ? 5 : 15;
};

onMounted(async () => {
  try {
    const responsea = await fetch('/geojson/pnm_epmo.geojson');
    geoJsonData.value = await responsea.json();

    if (geoJsonData.value) {
      const geoJsonLayer = new GeoJSON(geoJsonData.value, {
        style: {
          color: '#16A8C1',
          weight: 2,
          opacity: 1,
          fillOpacity: 0,
          zIndex: 1,
        }
      });

      geoJsonLayer.addTo(props.map);
    }

    const responsePartenaires = await fetch('/geojson/Partenaires_engages2.geojson');
    if (!responsePartenaires.ok) throw new Error('Erreur chargement Partenaires_engages2.geojson');
    const geoJsonDataPartenaires = await responsePartenaires.json();

    const geoJsonLayerPartenaires = new GeoJSON(geoJsonDataPartenaires, {
      pointToLayer: (feature, latlng) => {
        const zoomLevel = props.map.getZoom();
        const radius = getCircleRadius(zoomLevel);

        const activityColors = {
          'Randonnée': '#0e823a',
          'Kayak': '#ed6a53',
          'Voile': '#C2133E',
          'Croisières': '#9a7b67',
        };

        const fillColor = activityColors[feature.properties.Activité] || '#cccccc';

        const marker = circleMarker(latlng, {
          radius,
          fillColor,
          color: 'transparent',
          weight: 0,
          opacity: 1,
          fillOpacity: 1,
          zIndex: 1000,
        });

        const id = feature.properties.id;
        if (id != null) {
          pointsPartenaires.value[id] = marker;
        }

        // Ajout des événements de survol
        marker.on('mouseover', () => {
          if (hoveredMarker.value && hoveredMarker.value !== marker) {
            // Réinitialiser le marker précédent
            hoveredMarker.value.setStyle({
              fillColor: hoveredMarker.value.feature.properties.Activité
                ? activityColors[hoveredMarker.value.feature.properties.Activité] || '#cccccc'
                : '#cccccc',
            });
          }

          // Mettre à jour le style du marker survolé
          marker.setStyle({
            fillColor: '#16A8C1',
            radius: getCircleRadius(props.map.getZoom()) + 2,
          });

          hoveredMarker.value = marker; // Suivi du marker survolé

          // Mettre en surbrillance le partenaire associé
          highlightPoints([id]);
        });

        marker.on('mouseout', () => {
          // Réinitialiser le style du marker
          marker.setStyle({
            fillColor: activityColors[feature.properties.Activité] || '#cccccc',
            radius: getCircleRadius(props.map.getZoom()),
          });

          hoveredMarker.value = null; // Réinitialiser la référence

          // Réinitialiser la surbrillance du partenaire
          resetHighlights([id]);
        });

        marker.on('click', () => {
          selectedPartenaireId.value = id;
          showIntro.value = false;
          showPartenaires.value = true;

          const isMobile = window.innerWidth <= 751;
          const offsetLng = isMobile ? 0.02 : 0.08;
          const offsetLat = -0.01;

          const newCenter = [latlng.lat + offsetLat, latlng.lng + offsetLng];
          props.map.flyTo(newCenter, 12);
        });

        return marker;
      }
    });

    geoJsonLayerPartenaires.addTo(props.map);
    geoJsonLayerPartenaires.bringToFront();

    // Événements de zoom
    props.map.on('zoomstart', () => {
      geoJsonLayerPartenaires.eachLayer((layer) => {
        layer.setStyle({ opacity: 0 });
      });
    });

    props.map.on('zoomend', () => {
      const zoomLevel = props.map.getZoom();
      geoJsonLayerPartenaires.eachLayer((layer) => {
        layer.setStyle({ opacity: 1 });
        layer.setRadius(getCircleRadius(zoomLevel));
      });
    });
  } catch (error) {
    console.error('Erreur pendant le chargement des données GeoJSON :', error);
  }
});
</script>
