<template>
  <div class="nous-connaitre">
      
      <!-- Menu fixe visible uniquement sur la page NousConnaitre et ses sous-pages -->
      <nav v-if="isNousConnaitrePage" class="menu-fixe">
        <ul>
          <router-link to="/connaitre" custom v-slot="{ navigate, isActive }">
            <li @click="navigate" :class="{ 'active-link': isActive && $route.path === '/connaitre' }">
              Nous différencier
            </li>
          </router-link>
          <router-link to="/connaitre/respecter" custom v-slot="{ navigate, isActive }">
            <li @click="navigate" :class="{ 'active-link': isActive }">Nous respecter</li>
          </router-link>
          <router-link to="/connaitre/observer" custom v-slot="{ navigate, isActive }">
            <li @click="navigate" :class="{ 'active-link': isActive }">Nous observer</li>
          </router-link>
          <router-link to="/connaitre/aider" custom v-slot="{ navigate, isActive }">
            <li @click="navigate" :class="{ 'active-link': isActive }">Nous aider</li>
          </router-link>
        </ul>
      </nav>

      <!-- Conteneur horizontal avec les sections -->
      <div class="horizontal-container" ref="container">
        <section id="phoque" class="sectionNC">
          <NousReconnaitre />
        </section>
        <section id="respecter" class="sectionNC">
          <NousRespecter />
        </section>
        <section id="observer" class="sectionNC">
          <NousObserver />
        </section>
        <section id="aider" class="sectionNC">
          <NousAider />
        </section>
      </div>

  </div>
  
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import NousReconnaitre from '../views/NousConnaitre/NousReconnaitre.vue';
import NousRespecter from '../views/NousConnaitre/NousRespecter.vue';
import NousObserver from '../views/NousConnaitre/NousObserver.vue';
import NousAider from '../views/NousConnaitre/NousAider.vue';

// Référence du conteneur
const container = ref(null);

// Obtenir la route actuelle
const route = useRoute();

// Vérification si la route actuelle commence par '/connaitre'
const isNousConnaitrePage = computed(() => {
  return route.path.startsWith('/connaitre');
});

// Détection des changements de route
watch(() => route.path, (newPath) => {
  // Faire défiler vers la section correspondante après que la route ait changé
  const sectionId = newPath.split('/').pop(); // Récupère la dernière partie de l'URL (aider, observer, etc.)
  scrollToSection(sectionId);
});

// Fonction pour faire défiler vers une section spécifique
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section && container.value) {
    const offsetLeft = section.offsetLeft;
    container.value.scrollTo({
      left: offsetLeft,
      behavior: 'smooth',
    });
  }
}

// Assure le défilement vers la section au montage
onMounted(() => {
  const sectionId = route.path.split('/').pop();
  scrollToSection(sectionId);
});

watch(() => route.path, (newPath) => {
  setTimeout(() => {
    const sectionId = newPath.split('/').pop(); 
    scrollToSection(sectionId);
  }, 100);
});
</script>
