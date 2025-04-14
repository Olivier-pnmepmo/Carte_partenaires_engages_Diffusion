<template>
  <div>
    <!-- Overlay appliqué à tout l'écran -->
    <div v-if="showOptions" class="overlay"></div>

    <!-- Cadre de la fiche partenaire -->
    <div class="cadre__fiche_partenaire">
      <!-- <button @click="reloadPage" id="bouton_retour">← Retour</button> -->

      <div class="illustration_partenaire">
        <h2>{{ partenaireNom }}</h2>
        <div v-if="partenaireIllustration" class="illustration" v-html="partenaireIllustration"></div>
      </div>

      <p v-if="partenaireDetails.nom" class="partenaires_contact">
        <strong>
          <i class="fa fa-phone telephone" @click.stop="showOptions = !showOptions" style="cursor: pointer;"></i>
        </strong>
        <strong>
          <a :href="'mailto:' + partenaireDetails.mail" target="_blank">
            <i class="fa fa-envelope enveloppe"></i>
          </a>
        </strong>
        <strong>
          <a :href="partenaireDetails.site" target="_blank">
            <i class="fa fa-globe globe"></i>
          </a>
        </strong>
      </p>

      <p v-else>
        Chargement des informations...
      </p>
    </div>

    <!-- Cadre de la fiche partenaire Mobile -->
    <div v-if="partenaireId" class="cadre__fiche_partenaire_mobile">
      <!-- <button @click="reloadPage" id="bouton_retour">← Retour</button> -->

      <h2>{{ partenaireNom }}</h2> {{ partenaireIllustration }}

      <p v-if="partenaireDetails.nom" class="partenaires_contact_mobile">
        <strong>
          <i class="fa fa-phone telephone" @click.stop="showOptions = !showOptions" style="cursor: pointer;"></i>
        </strong>
        <strong>
          <a :href="'mailto:' + partenaireDetails.mail" target="_blank">
            <i class="fa fa-envelope enveloppe"></i>
          </a>
        </strong>
        <strong>
          <a :href="partenaireDetails.site" target="_blank">
            <i class="fa fa-globe globe"></i>
          </a>
        </strong>
      </p>

      <p v-else>
        Chargement des informations...
      </p>
    </div>

    <!-- Menu de choix pour le téléphone -->
    <div v-if="showOptions" class="options-menu">
      <div @click="callNumber" class="telephone-container">
        <i class="fa fa-phone"></i>
        <span>Appeler directement</span>
      </div>
      <div @click="showModal = true" class="eye-container">
        <i class="fa fa-eye"></i>
        <span>Voir le numéro</span>
      </div>

      <!-- Bouton fermer centré sous les icônes -->
      <button @click="showOptions = false" class="close-btn" id="bouton_fermer">Fermer</button>
    </div>

    <!-- Menu de choix pour le téléphone VERSION MOBILE -->
    <div v-if="showOptions" class="options-menu_mobile">
      <div @click="callNumber" class="telephone-container">
        <i class="fa fa-phone"></i>
        <span>Appeler directement</span>
      </div>
      <div @click="showModal = true" class="eye-container">
        <i class="fa fa-eye"></i>
        <span>Voir le numéro</span>
      </div>

    <!-- Bouton fermer centré sous les icônes -->
    <button @click="showOptions = false" class="close-btn" id="bouton_fermer">Fermer</button>
  </div>


    <!-- Modal pour afficher le numéro -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>Numéro : <strong>{{ partenaireDetails.telephone }}</strong></p>
        <button @click="showModal = false">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { partenaires } from "../data/partenaires";

// Props
const props = defineProps({
  partenaireId: {
    type: Number,
    required: true,
  },
  showOverlay: {
    type: Boolean,
    required: true, // S'assurer que la prop est fournie
  },
});

// Variables réactives
const partenaireNom = ref("");
const partenaireIllustration =ref("");
const partenaireDetails = ref({
  nom: "",
  telephone: "",
  mail: "",
  site: "",
});
const showOptions = ref(false);
const showModal = ref(false);

// Mettre à jour les détails du partenaire lorsqu'un partenaire est sélectionné
watch(
  () => props.partenaireId,
  (newId) => {
    console.log("Partenaire ID:", newId); // Debug

    if (newId >= 1 && partenaires[newId]) {
      const details = partenaires[newId];
      partenaireNom.value = details.nom || "";
      partenaireIllustration.value = details.illustration || "";
      partenaireDetails.value = {
        nom: details.nom || "",
        telephone: details.telephone || "",
        mail: details.mail || "",
        site: details.site || "",
      };
    } else {
      console.warn(`Partenaire avec l'ID ${newId} non trouvé`);
    }
  },
  { immediate: true }
);

// Fonction pour appeler directement
const callNumber = () => {
  window.location.href = "tel:" + partenaireDetails.value.telephone;
};

// Fonction pour recharger la page au clic sur "Retour"
/*const reloadPage = () => {
  window.location.reload(); // Recharger la page
};*/
</script>
