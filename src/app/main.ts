import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(() => {
        if ('serviceWorker' in navigator) {
            console.log('yeah!!!')
            navigator.serviceWorker.register('worker-basic.min.js')
                .then(() => console.log('service worker installed'))
                .catch(err => console.error('Error', err));
        }
    });
