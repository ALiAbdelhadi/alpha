import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        "name": "Altruvex",
        "short_name": "Altruvex",
        "description": "Altruvex - Web Development Company specializing in innovative web experiences and cutting-edge applications",
        "orientation": "any",
        "dir": "auto",
        "lang": "en-GB",
        "start_url": "/?source=pwa",
        "scope": "/",
        "icons": [
            {
                "src": "/icon-192x192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "any"
            },
            {
                "src": "/icon-192x192-maskable.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "maskable"
            },
            {
                "src": "/icon-512x512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "any"
            },
            {
                "src": "/icon-512x512-maskable.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "maskable"
            },
            {
                "src": "/apple-touch-icon.png",
                "sizes": "180x180",
                "type": "image/png"
            }
        ],
        "theme_color": "#4a6ed4",
        "background_color": "#f7f8fa",
        "display": "standalone",
        "screenshots": [
            {
                "src": "/screenshot-desktop.png",
                "sizes": "1280x720",
                "type": "image/png",
                "form_factor": "wide",
                "label": "Altruvex Desktop view"
            },
            {
                "src": "/screenshot-mobile.png",
                "sizes": "390x844",
                "type": "image/png",
                "form_factor": "narrow",
                "label": "Altruvex Mobile view"
            }
        ]
    }
}

