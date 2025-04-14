<template>

  <div class="fullscreen_accueil">
    <!--<div class="background_accueil xlarge"></div>
    <div class="background_accueil xlarge2"></div>-->
    <div class="background_accueil"></div>
    <img src="/images/Phoques.jpg" alt="Phoque" class="photo_accueil" />

    <!--Conteneur pour les logos-->
    <div class="image-container">
      <a href="https://www.ofb.gouv.fr/" target="_blank"><img src="/logos/OFB_Mariane.png" alt="OFB" class="image-logo2"></a>
        <a href="https://parc-marin-epmo.fr/" target="_blank"><img src="/logos/PNM_EPMO.png" alt="PNM EPMO" class="image-logo"></a>
    </div>

    <!-- Texte -->
    <div class="cadre_intro">
      
      <h1>S'engager pour les phoques</h1>
      
      <p>Les phoques sont de plus en plus sujets au dérangement avec le succès des activités de découverte et d’observation du littoral. Pour pallier ce problème, le Parc Naturel Marin et les structures concernées se sont concertées pour créer une charte de bonnes pratiques.</p>

      <p>Découvrez sur ce site les partenaires engagés et les bons gestes à adopter pour observer les phoques sans les déranger.</p>

    </div>

    <!-- Navigation -->
    <NavigationBar />

</div>
    
</template>
  

<script setup>
    import NavigationBar from '@/components/NavigationBar.vue';
</script>