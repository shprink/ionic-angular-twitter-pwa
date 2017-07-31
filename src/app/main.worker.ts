import 'ionic-angular/polyfills/polyfills.js';
import '@angular/core';
import '@angular/common';
import { platformWorkerAppDynamic } from '@angular/platform-webworker-dynamic';

import { AppModule } from './app.module';

platformWorkerAppDynamic()
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
