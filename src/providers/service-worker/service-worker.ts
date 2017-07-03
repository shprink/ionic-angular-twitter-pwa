import { Injectable } from '@angular/core';
import { NgServiceWorker } from '@angular/service-worker';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the ServiceWorkerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServiceWorkerProvider {

  constructor(
    public sw: NgServiceWorker,
    public toastCtrl: ToastController,
  ) {
    console.log('Hello ServiceWorkerProvider Provider');
  }

  run() {
    this.sw.log().subscribe(logs => console.log('service-worker logs', logs));
    this.sw.updates.subscribe(res => {
      console.log('SW updates', res, res.version);
      switch (res.type) {
        case 'activation':
          let toast = this.toastCtrl.create({
            message: 'A new version is available, reload ',
            duration: 5000,
            closeButtonText: "Reload",
            showCloseButton: true,
          });
          toast.onDidDismiss((data, role) => role === 'close' && location.reload());
          toast.present();
          break;

        default:
          break;
      }
      console.log('service-worker updates', res);
    });
  }
}
