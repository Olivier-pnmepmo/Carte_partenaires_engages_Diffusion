<template>
  <div id="app">
    <router-view></router-view>
  </div>
  <div>
    <!-- Barre de navigation -->
    <NavigationBar />

    <!-- Contenu avec des sections -->
    <main>
      <section id="accueil">
        <PageAccueil />
      </section>

      <section id="charte">
        <ChartePartenairesEngages />
      </section>

      <section id="connaitre">
        <NousConnaitre />
      </section>

      <section id="pnmepmo">
        <PnmEpmo />
      </section>
    </main>

    <div class="mentions_legales" @click="openModal">Mentions légales</div>
    <!-- Affichage de la modal -->
    <ModalMentionsLegales v-if="showModal" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NavigationBar from "@/components/NavigationBar.vue";
import PageAccueil from "@/views/PageAccueil.vue";
import ChartePartenairesEngages from "@/views/ChartePartenairesEngages.vue";
import NousConnaitre from "@/views/NousConnaitre.vue";
import PnmEpmo from "@/views/PnmEpmo.vue";
import ModalMentionsLegales from '@/components/ModalMentionsLegales.vue';

import { useRoute } from 'vue-router';

//Modal
const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};


//Route
const route = useRoute();

console.log('Route active :', route.path);
</script>