// import { enableProdMode } from '@angular/core';
import { bootstrapWorkerUi } from '@angular/platform-webworker';

import { AppModule } from './app.module';
// import { environment } from './environments/environment';

// if (environment.production) {
//   enableProdMode();
// }

bootstrapWorkerUi('build/webworker.js');