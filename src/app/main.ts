import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(() => {
        console.log('bootstrap')
        if ('serviceWorker' in navigator && __PROD__) {
            navigator.serviceWorker.register('worker-basic.js')
                .then((reg) => {
                    if (reg.installing) {
                        console.log('service worker installing');
                    } else if (reg.waiting) {
                        console.log('service worker installed');
                    } else if (reg.active) {
                        console.log('service worker active');
                    }
                })
                .catch(err => console.error('Service worker error', err));
        }
    });
