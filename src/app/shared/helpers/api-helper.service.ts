import {Injectable} from '@angular/core';
import {RestConnector} from './rest.connector';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ApiHelperService {
    constructor(private restConnector: RestConnector) {
    }

    // GET
    getAll(path: string, params?: any, hasAuth?: boolean): Observable<any> {
        return this.restConnector.get(path, params, hasAuth);
    }

    getById(path: string, id: string = '', params?: any, hasAuth?: boolean): Observable<any> {
        if (id !== '') {
            path = path.toString().replace(':id', id);
        }
        return this.restConnector.get(path, params, hasAuth);
    }

    getByUrl(url: string, params?: any): Observable<any> {
        return this.restConnector.getByUrl(url, params);
    }

    // POST
    create(path: string, body?: any, params?: any, hasAuth?: boolean): Observable<any> {
        return this.restConnector.post(path, body, params, hasAuth);
    }

    // PUT
    update(path: string, id: string = '', body?: any, params?: any, hasAuth?: boolean): Observable<any> {
        if (id !== '') {
            path = path.toString().replace(':id', id);
        }
        return this.restConnector.put(path, body, params, hasAuth);
    }
}
