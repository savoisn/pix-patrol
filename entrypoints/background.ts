
import { storage } from 'wxt/storage';
import { urls } from "./models/blacklist.js";


export default defineBackground(() => {
    console.log('Hello background!', { id: browser.runtime.id });

    // Déclarer les URL à bloquer
    var urlsABloquer = [
        "google.com",
        "google.fr",
        // Ajouter d'autres URLs à bloquer ici
    ];


    const pixListener = (details: any) => {
        let found = false;
        for (const url of urls) {
            if (details.url.indexOf(url) >= 0) {
                found = true;
            }
        }

        if (found) {
            browser.tabs.update(details.tabId, { url: "about:blank" });
        }
    }

    const init = () => {
        browser.webNavigation.onBeforeNavigate.addListener(pixListener);
    }

    const unwatch = storage.watch<boolean>('local:fitering', (newCount, oldCount) => {
        if (newCount) {
            init()
            if (import.meta.env.FIREFOX) {
                browser.browserAction.setIcon(
                    { path: "icon-on-16.png" }
                );
            }
            if (import.meta.env.CHROME) {

                browser.action.setIcon(
                    { path: "icon-on-16.png" }
                )
            }
        } else {
            browser.webNavigation.onBeforeNavigate.removeListener(pixListener)
            if (import.meta.env.FIREFOX) {
                browser.browserAction.setIcon(
                    { path: "icon-16.png" }
                );
            }
            if (import.meta.env.CHROME) {
                browser.action.setIcon(
                    { path: "icon-16.png" }
                )
            }
        }

    });


});
