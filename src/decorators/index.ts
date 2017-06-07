import { MenuController } from 'ionic-angular';
import { AuthProvider } from '../providers';

export function canEnterIfAuthenticated(target) {
    target.prototype.ionViewCanEnter = function () {
        return this.injector.get(AuthProvider).isAuthenticated();
    }
}

export function bindOpenMenu(target) {
    target.prototype.openMenu = function () {
        this.injector.get(MenuController).open();
    }
}
