import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';

// See https://wxt.dev/api/config.html
export default defineConfig({
    manifest: {

        permissions: [
            "webNavigation",
            "webRequest",
            "storage",

        ],
        host_permissions: ['*://google.com/*'],
    },
    imports: {
        addons: {
            vueTemplate: true,
        },
    },
    vite: () => ({
        plugins: [vue()],
    }),
});
