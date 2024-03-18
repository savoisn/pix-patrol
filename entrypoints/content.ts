import { Unwatch, storage } from 'wxt/storage';

import {blurClassContent} from './utils/hide_some_content.js';

//TODO : 
// - improve isBlackListed in hide_some_content - indexOf is not smart enough
// - more search engine
// - content loaded while scrolling in google is not blured... 
//   maybe it's worth trying to blur that content also

export default defineContentScript({
    //matches: ['*://*.wxt.dev/*'],
    matches: ['<all_urls>'],
    main(ctx) {
        let unwatch: Unwatch;
        const ui = createIntegratedUi(ctx, {
            position: 'inline',
            onMount: async (container) => {
                // Append children to the container
                unwatch = storage.watch<boolean>('local:fitering', (newValue, _oldValue) => {
                    if (newValue) {
                        const p = document.getElementById("pix-companion-p")
                        if (p) p.textContent = "filtrage actif";
                    } else {
                        const p = document.getElementById("pix-companion-p")
                        if (p) p.textContent = "filtrage inactif";
                    }
                })


                const app = document.createElement('div');
                app.id = "pix-companion"
                const p = document.createElement('p');
                p.id = "pix-companion-p"

                const filtering = await storage.getItem<boolean>('local:fitering');
                if (filtering) {
                    p.textContent = "filtrage actif";

                    const googleClassList = ["BYM4Nd", "MjjYud"]
                    
                    for(const googleClass of googleClassList){
                        blurClassContent(googleClass, document)
                    }


                } else {
                    p.textContent = "filtrage inactif";
                }
                app.append(p)
                container.append(app);
            },
            onRemove: () => {
                unwatch()
            }
        })

        // Call mount to add the UI to the DOM
        ui.mount();
    },

});
