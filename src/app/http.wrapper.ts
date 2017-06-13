import { logout } from './../actions/auth';
import { Store } from '@ngrx/store';
import { Injectable, Injector } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptionsArgs,
  Request,
  Response,
  ConnectionBackend,
  RequestOptions,
} from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

import { AppState } from './../reducers';
import { AuthProvider } from './../providers';

@Injectable()
export class HttpWrapper extends Http {
  public store: Store<AppState>;
  public toastCtrl: ToastController;

  constructor(
    protected _backend: ConnectionBackend,
    protected _defaultOptions: RequestOptions,
    public authProvider: AuthProvider,
    public injector: Injector,
  ) {
    super(_backend, _defaultOptions);
    this.toastCtrl = this.injector.get(ToastController);
  }

  request(
    url: string | Request,
    options: RequestOptionsArgs = new RequestOptions({}),
  ): Observable<Response> {
    this.onRequest(url, options);

    return super.request(url, options).do(
      (r: Response) => {
        this.onResponse(url, r);
      },
      err => {
        this.onError(url, err);
      },
    );
  }

  private onRequest(
    url: string | Request,
    options: RequestOptionsArgs = new RequestOptions({}),
  ) {
    console.log('url', url);
    // const headers = new Headers();
    // const { stsTokenManager: { accessToken } } = this.authProvider.getUser();
    // const { access_token_key, access_token_secret } = this.authProvider.getCredential();

    // headers.set('Content-Type', 'application/json');
    // headers.set('Authorization', `Bearer ${accessToken},${access_token_key},${access_token_secret}`);
    // return new RequestOptions({ headers });
    //   let path = (typeof url === 'string') ? url : url.url;
    // if (path.startsWith(this.config.getApiRoute())) {
    //     if (typeof url === 'string') {
    //         options.withCredentials = true;
    //         if (!options.headers) {
    //             options.headers = new Headers();
    //         }
    //         this.store.select('token').take(1).subscribe((token => { options.headers.set('auth-token', String(token)); }));
    //         options.headers.set('app-version', this.config.getVersion());
    //         options.headers.set('app-platform', _get(window, 'cordova.platformId') || 'UNKNOWN');
    //         options.headers.set('app-env', this.config.getEnv());
    //     } else {
    //         url.withCredentials = true;
    //         this.store.select('token').take(1).subscribe((token => { url.headers.set('auth-token', String(token)); }));
    //         url.headers.set('app-version', this.config.getVersion());
    //         url.headers.set('app-platform', _get(window, 'cordova.platformId') || 'UNKNOWN');
    //         url.headers.set('app-env', this.config.getEnv());
    //     }
    // }
  }

  private onResponse(url, response) {
    // Listen to the API response (except authentication).
    // let path = (typeof url === 'string') ? url : url.url;
    // if (path.startsWith(this.config.getApi('baseUrl')) && !path.startsWith(this.config.getApiRoute('/authentication'))) {
    //     let cacheVersion = parseInt(response.headers.get('user-cache-version'));
    //     this.injector.get(Fv).doCacheVersionCheck(cacheVersion);
    //     let userVersion = parseInt(response.headers.get('user-version'));
    //     if (userVersion > this.userVersion) {
    //         this.userVersion = userVersion;
    //         this.store.dispatch(setUserVersion(this.userVersion));
    //     }
    //     let alert = parseInt(response.headers.get('alert-count'));
    //     let feed = parseInt(response.headers.get('feed-count'));
    //     let badge = parseInt(response.headers.get('badge-count'));
    //     this.store.dispatch(setCounter(alert, feed, badge));
    // }
  }

  private onError(url, err): Observable<Response> {
    if (err.status >= 400 && err.status < 600) {
      if (err.status === 403) {
        let toast = this.toastCtrl.create({
          message: 'Unauthorized. Loging out in 3 secs...',
          duration: 3000,
        });
        toast.onDidDismiss((data, role) => this.authProvider.logout());
        toast.present();
      } else {
        const body = JSON.parse(err._body);
        this.toastCtrl.create({
          message: body[0].message,
          duration: 3000,
        }).present();
      }
    }
    return Observable.throw(err);
  }
}
