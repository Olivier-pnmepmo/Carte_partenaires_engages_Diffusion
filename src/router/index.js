import { createRouter, createWebHistory } from 'vue-router';

import Accueil from '@/views/PageAccueil.vue';
import Charte from '@/views/ChartePartenairesEngages.vue';
import Connaitre from '@/views/NousConnaitre.vue';
import Reconnaitre from '@/views/NousConnaitre/NousReconnaitre.vue';
import Respecter from '@/views/NousConnaitre/NousRespecter.vue';
import Observer from '@/views/NousConnaitre/NousObserver.vue';
import Aider from '@/views/NousConnaitre/NousAider.vue';
import PnmEpmo from '@/views/PnmEpmo.vue';

const routes = [
  { path: '/', name: 'Accueil', component: Accueil },
  { path: '/accueil', redirect: '/' }, // Redirection de /accueil vers /
  { path: '/charte', name: 'Charte', component: Charte },
  { 
    path: '/connaitre', 
    name: 'Connaitre', 
    component: Connaitre,
    children: [
      { path: 'reconnaitre', name: 'Reconnaitre', component: Reconnaitre },
      { path: 'respecter', name: 'Respecter', component: Respecter },
      { path: 'observer', name: 'Observer', component: Observer },
      { path: 'aider', name: 'Aider', component: Aider },
    ],
  },
  { path: '/pnmepmo', name: 'PnmEpmo', component: PnmEpmo },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
