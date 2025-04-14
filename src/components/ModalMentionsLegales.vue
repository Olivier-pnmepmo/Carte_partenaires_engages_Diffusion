<template>
    <div class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2 style="text-align:center;">Illustrations</h2>
        <p>Dessins :<br>Camille Dégardin / Office Français de la Biodiversité</p>
        <p>Bateau de tourisme :<br><a href="https://www.freepik.com" target="_blank" style="color:black; text-decoration:none;">Freepik</a></p>
        <p>Photos :<br>- Gilles Martin<br>- Benjamin Guichard / Office Français de la Biodiversité</p>
        <p>Fond de carte :<br>Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri</p>
        <button @click="closeModal">Fermer</button>
      </div>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    emit('close');
  };
  </script>