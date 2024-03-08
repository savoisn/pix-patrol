export default defineBackground(() => {
    console.log('Hello background!', { id: browser.runtime.id });

// Déclarer les URL à bloquer
var urlsABloquer = [
    "https://www.google.com/",
    "https://www.google.fr/",
    // Ajouter d'autres URLs à bloquer ici
];
const init = () => {
// Déclarer les URL à bloquer
// Écouter les événements de navigation
browser.webNavigation.onBeforeNavigate.addListener(function(details) {
    // Vérifier si l'URL est dans la liste à bloquer
    if (urlsABloquer.includes(details.url)) {
        // Bloquer la navigation en redirigeant vers une page blanche
        //browser.webNavigation.onBeforeNavigate.removeListener();
        browser.tabs.update(details.tabId, { url: "about:blank" });
    }
});

}

init();

});
