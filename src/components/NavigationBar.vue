<template>
   
  <!-- Menu principal ou menu burger -->
  <div>

    <!-- Menu principal -->
    <div v-if="!isMobile" class="top-banner bg-custom">
      <ul>
        <router-link to="/" :class="{ active: $route.path === '/' }">
          <li @click="scrollToSection('accueil')">
            <font-awesome-icon icon="home" />
          </li>
        </router-link>

        <router-link to="/charte" :class="{ active: $route.path === '/charte' }">
          <li @click="scrollToSection('charte')">Ils s'engagent pour nous !</li>
        </router-link>

        <router-link to="/connaitre" :class="{ active: $route.path.startsWith('/connaitre') }">
          <li @click="scrollToSection('connaitre')">Mieux nous connaître</li>
        </router-link>

        <router-link to="/pnmepmo" :class="{ active: $route.path === '/pnmepmo' }">
          <li @click="scrollToSection('pnmepmo')">Le Parc naturel marin</li>
        </router-link>
      </ul>
    </div>

    <!-- Menu burger -->
    <div v-else class="fixed-top bg-custom-mobile d-flex align-items-center">
      <button @click="toggleMenu" class="burger-button">
        <span :class="{ 'burger-icon': !isMenuOpen, 'close-icon': isMenuOpen }">
          <span v-if="!isMenuOpen">☰</span>
          <span v-else id="croix">✖</span>
        </span>
      </button>
      <!-- Menu burger déroulé -->
      <div :class="['burger-menu', { open: isMenuOpen }]" class="bg-custom-mobile">
        <ul class="m-0 p-0" style="list-style-type: none;">
          <li><router-link to="/" @click="toggleMenu">Accueil</router-link></li>
          <li><router-link to="/charte" @click="toggleMenu">Ils s'engagent pour nous !</router-link></li>
          <li><router-link to="/connaitre" @click="toggleMenu">Mieux nous connaître</router-link></li>
          <li><router-link to="/pnmepmo" @click="toggleMenu">Le Parc Naturel Marin ?</router-link></li>
        </ul>
      </div>
    </div>

  </div>
  
</template>
  
<script setup>

  import { ref } from "vue";
  
  // Fonction de défilement
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
    }
  }

  // Gestion du menu
  const isMenuOpen = ref(false);

  // Détection mobile
  const isMobile = ref(window.innerWidth <= 751);

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
  }

</script>