import {Injectable} from '@angular/core';
import {ApiHelperService} from '../shared/helpers/api-helper.service';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ApiService {

    constructor(
        private api: ApiHelperService,
    ) {
    }

    getListProvince(obj?: any): Observable<any> {
        return this.api.getAll(environment.GET_LIST_AREA, obj);
    }

    getListDistrict(obj?: any): Observable<any> {
        return this.api.getAll(environment.GET_LIST_DISTRICT, obj);
    }

    getListWard(obj?: any): Observable<any> {
        return this.api.getAll(environment.GET_LIST_WARD, obj);
    }

    verifyUserInfo(body?: any, params?: any, hasAuth?: boolean): Observable<any> {
        return this.api.create(environment.VERIFY_USER_INFO, body, params, hasAuth);
    }

    getFatcaInfor(obj?: any): Observable<any> {
        return this.api.getAll(environment.GET_FATCA_INFOR, obj);
    }

    approvePolicy(body?: any): Observable<any> {
        return this.api.create(environment.APPROVE_POLICY, body);
    }

    getIpAddress() {
        return this.api.getByUrl('https://httpbin.org/ip');
    }
}
