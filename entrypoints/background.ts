// import { storage } from 'wxt/storage';
import { urls } from "./models/blacklist.js";
import {isBlacklisted} from './utils/hide_some_content.js';


export default defineBackground(() => {

    const pixListener = (details: any) => {
        console.log(details)
        let found = isBlacklisted(details.url);

        if (found) {
            //const path = PublicPath("forbidden.html")
            console.log(details.url+" is forbiden")
            const forbidden_url = browser.runtime.getURL("forbidden.html");
            browser.tabs.update(details.tabId, { url: forbidden_url });
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
