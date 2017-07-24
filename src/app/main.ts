import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(() => {
        console.log('bootstrap')
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('worker-basic.js')
                .then((reg) => {
                    console.log('SW reg', reg);
                    if (reg.installing) {
                        console.log('SW installing');
                    } else if (reg.waiting) {
                        console.log('SW installed');
                    } else if (reg.active) {
                        console.log('SW active');
                    }
                })
                .catch(err => console.error('SW error', err));
        }
    });
