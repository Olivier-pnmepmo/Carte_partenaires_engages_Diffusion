<template>

    <div class="fullscreen">

      <div class="nous_observer">
        
        <div class="grid-nous_observer">
          <div class="item"></div>
          <div class="item">
            <p>
              Le phoque sur un banc de sable se repose, met bas et allaite, mue pour renouveler son pelage. Ces moments sont vitaux pour lui. Tout dérangement entrainant la fuite peut avoir de grands impacts, allant jusqu'à la mort des individus les plus fragiles, comme les nouveau-nés.
            </p>
            <div class="cadre_important2">
              <p>
                <span style="display: block; text-align: center; font-weight: bold; margin-bottom: 10px;">ATTENTION</span>Le phoque est un animal sauvage, pouvant griffer et mordre lorsqu'il se sent en danger. Il peut potentiellement transmettre des maladies.
              </p>
            </div>
          </div>

          <div class="item"></div>
          <div class="item"><h6 style="margin-left: 20px;">Comment bien les observer ?</h6></div>

          <div class="item"><i class="fa-solid fa-face-smile fa-3x"></i></div>
          <div class="item"><i class="fa-solid fa-face-angry fa-3x"></i></div>

          <div class="item">
            Endormi,<br>l'animal est paisible.
            <img src="/images/Phoques_repos_oui2.png" id="picto_observer_repos"/>
          </div>
          <div class="item">
            <img src="/images/Phoques_redresse_non.png" id="picto_observer_aguets"/>
            Aux aguets ? L'animal est inquiet, reculez !<br>Vous risquez de le mettre à l'eau.
          </div>

          <div class="item">
            Des photos ?<br>Oui mais de préférence de l'autre côté du chenal<br>et avec un matériel adapté assurant une distance de tranquilité adéquate.
            <img src="/images/Observer_phoques_oui.png" id="picto_observer_loin"/>
          </div>
          <div class="item">
            <img src="/images/Observer_phoques_non.png" id="picto_observer_proche"/>
            Dans le cas contraire<br>il risque de ce mettre à l'eau.
          </div>

        </div>
      
      </div>
      <NavigationBar />
    </div>

</template>

<script setup>
  import NavigationBar from '@/components/NavigationBar.vue';
</script>