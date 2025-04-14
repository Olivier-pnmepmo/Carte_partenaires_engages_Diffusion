<template>

  <div class="fullscreen">

    <div class="nous_aider">

      <div class="grid-nous_aider">

        <div class="item"></div>
        <div class="item">

          <div class="cadre_important2">
            <p>
              <span style="display: block; text-align: center; font-weight: bold; margin-bottom: 10px;">JE NE LE TOUCHE PAS</span>Lorsque je trouve un phoque échoué sur la plage, je ne le manipule pas et reste à une certaine distance. Il s'agit d'un animal sauvage, il peut occasionner des blessures.<br>Ces précautions permettent aussi d’éviter un risque de transmission de maladie et de ne pas « abîmer » ou blesser l’animal en le bougeant.
            </p>
          </div>

          <div class="grid-nous_aider2">
            <div class="item">
              <p>Que l'animal soit mort ou vivant, appelez l'observatoire PELAGIS.</p>
              <p> Je signale au téléphone le lieu de l’échouage le plus précisément possible et l’état de l’animal. Une personne habilitée à intervenir se rendra au plus vite sur les lieux pour examiner l’animal.</p>
              <p>Un phoque posé sur la plage n’est pas forcément en difficulté, il peut simplement être en train de se reposer. Éloignez-vous et gardez une distance de 300m.</p>
              <div class="lien-container">
                <a href="/docs/Les_bons_gestes.pdf" target="_blank">
                  <h5>Phoques en vue<br>"Les bons gestes à adopter"</h5>
                </a>
              </div>
            </div>
            <div class="item" id="cadre_pelagis">
              <img src="/images/PELAGIS.png" id="logo_pelagis" /><br>
              <a href="tel:0546449910">
                <i class="fa fa-phone"></i>
              </a><br><br>
              05 46 44 99 10<br>(disponible 7j/7)
            </div>
          </div>

        </div>
      
      </div>
    
    </div>
    <NavigationBar />
  </div>

</template>

<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
</script>