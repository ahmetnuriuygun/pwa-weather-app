import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),

        VitePWA({
            registerType: 'autoUpdate',
            strategies: "generateSW",

            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg}'],
            },
            manifest: {
                name: 'Skyguess',
                short_name: 'Skyguess',
                description: 'PWA Weather Application',
                theme_color: '#ffffff',
                icons: [
                    {
                        "src": "/pwa-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png",
                        "purpose": "any"
                    },
                    {
                        "src": "/pwa-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "any"
                    },
                    {
                        "src": "/pwa-maskable-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png",
                        "purpose": "maskable"
                    },
                    {
                        "src": "/pwa-maskable-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "maskable"
                    }
                ]
            },
        })
    ],


})
