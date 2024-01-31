import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { Router } from "@angular/router";
// import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class OpenCardService {
    // private _flowSubject = new BehaviorSubject<string>('');
    // flow$ = this._flowSubject.asObservable();
    // private _paramsSubject = new BehaviorSubject<Params>(null);
    // params$ = this._paramsSubject.asObservable();

    constructor(
        private envService: EnvService,
        private router: Router,
    ) {
    }

    // setFlow(path: string) {
    //     this._flowSubject.next(path);
    // }
    //
    // clearFlow() {
    //     this._flowSubject.next(null);
    // }
    //
    // setParams(params: Params) {
    //     this._paramsSubject.next(params);
    // }
    //
    // clearParams() {
    //     this._paramsSubject.next(null);
    // }

    nextStep(valid = true) {
        const flow = localStorage.getItem('flow') || '';
        const urlPath = this.router.url;
        const path = urlPath.slice(0, urlPath.indexOf('?') > -1 ? urlPath.indexOf('?') : urlPath.length);
        const params = new URLSearchParams(window.location.search);
        let updatedParams = this.replaceKeys(params, path);
        
        switch (path) {
            case '/jv1':
                if (!updatedParams.has('utm_source')) {
                    updatedParams.set('utm_source', 'DGT');
                }
                if (!updatedParams.has('utm_campaign')) {
                    updatedParams.set('utm_campaign', 'TPC.JarvisCustCC');
                }
                window.location.href = `/enter-info?${updatedParams.toString()}${window.location.hash}`;
                break;
            case '/enter-info':
                history.replaceState({}, '', `${flow}?${updatedParams.toString()}${window.location.hash}`);
                // Patch browser cache doesn't cooperate
                this.router.navigateByUrl(`${flow}?${updatedParams.toString()}${window.location.hash}`);
                if (valid) {
                    window.location.href = `/success?${updatedParams.toString()}${window.location.hash}`;
                } else {
                    window.location.href = `/fail?${updatedParams.toString()}${window.location.hash}`;
                }
                break;
            case '/success':
                history.replaceState({}, '', `${flow}?${updatedParams.toString()}${window.location.hash}`);
                // Patch browser cache doesn't cooperate
                window.location.href = `${this.envService.JV1_URL}?${updatedParams.toString() ?? ''}${window.location.hash}`;
                break;
            case '/fb1':
                window.location.href = `${this.envService.FB1_URL}?${updatedParams.toString() ?? ''}${window.location.hash}`;
                break;
            case '/tt1':
                window.location.href = `${this.envService.TT1_URL}?${updatedParams.toString() ?? ''}${window.location.hash}`;
                break;
            case '/tt2':
                window.location.href = `${this.envService.TT2_URL}?${updatedParams.toString() ?? ''}${window.location.hash}`;
                break;
            case '/fb2':
                window.location.href = `${this.envService.FB2_URL}?${updatedParams.toString() ?? ''}${window.location.hash}`;
                break;
            case '/gg2':
                window.location.href = `${this.envService.GG2_URL}?${updatedParams.toString() ?? ''}${window.location.hash}`;
                break;
            case '/':
                window.location.href = `${this.envService.DEFAULT_URL}?${updatedParams.toString() ?? ''}${window.location.hash}`;
                break;
            case '/fail':
                window.location.href = `${flow}?${updatedParams.toString() ?? ''}${window.location.hash}`;
                break;
            default:
                console.warn('Unhandled path!');
        }
    }

    replaceKeys(params: URLSearchParams, path: string): URLSearchParams {
        const replacements = ['gclid', 'fbclid', 'ttclid', 'MSCLKID', 'msclkid'];
        if (path == '/jv1') {
            const keyToRemove = 'ttclid';
            if (params.has(keyToRemove)) {
                params.delete(keyToRemove);
            }
        }
        for (const [key, value] of (params as any).entries()) {
            if (replacements.includes(key)) {
                params.set('utm_term', value);
                params.delete(key);
            }
        }

        return params;
    }

}
