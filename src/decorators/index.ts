import { MenuController } from 'ionic-angular';
import { TwitterProvider } from '../providers/twitter/twitter';

export function canEnterIfAuthenticated(target) {
    target.prototype.ionViewCanEnter = function () {
        let canEnter;
        this.injector.get(TwitterProvider)
            .isAuthenticated().first().subscribe(isAuthenticated => canEnter = isAuthenticated);
        return canEnter;
    }
}

export function bindOpenMenu(target) {
    target.prototype.openMenu = function () {
        this.injector.get(MenuController).open();
    }
}
