import {Component, OnInit} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'paso-landing-page';

    constructor(
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const urlPath = event.url;
                const path = urlPath.slice(0, urlPath.indexOf('?') > -1 ? urlPath.indexOf('?') : urlPath.length);
                if (['/', '/jv1', '/fb1', '/tt1'].includes(path)) {
                    localStorage.setItem('flow', path);
                }
            }
        });
    }
}
