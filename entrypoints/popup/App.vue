<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue';

console.log("coucou")

// Déclarer les URL à bloquer
var urlsABloquer = [
    "https://www.google.com/",
    "https://www.google.fr/",
    // Ajouter d'autres URLs à bloquer ici
];


const initialize = () => {
// Écouter les événements de navigation
    chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
        console.log("listnener connecter ici");
        console.log(details);
        // Vérifier si l'URL est dans la liste à bloquer
        if (urlsABloquer.includes(details.url)) {
            // Bloquer la navigation en redirigeant vers une page blanche
            chrome.webNavigation.onBeforeNavigate.removeListener();
            chrome.tabs.update(details.tabId, { url: "about:blank" });
        }
    });
};



</script>

<template>
  <div>
    <a href="https://www.google.com" target="_blank">
      <img src="@/assets/google.svg" class="logo" alt="google com" />
    </a>
    <a href="https://wxt.dev" target="_blank">
      <img src="/wxt.svg" class="logo" alt="WXT logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="WXT + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #54bc4ae0);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
