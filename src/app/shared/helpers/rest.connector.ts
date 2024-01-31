'use strict';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core'
// @ts-ignore
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {EnvService} from '../../services/env.service';
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class RestConnector {
    httpOption: any = {};

    constructor(
        private httpClient: HttpClient,
        private env: EnvService,
        private router: Router
    ) { }

    getApiUrl() {
        return this.env.API_URL;
    }

    checkHttpCode(httpCode: any) {
        return;
    }

    handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            if (error.status == 401) {
                this.router.navigate(['/home']).then();
            }
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(`Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    private getHttpOption(hasAuth = true, params?: any, responseType = 'application/json;charset=utf-8') {
        let httpOption = {
            headers: new HttpHeaders({
                    'Accept': [responseType],
                    'Content-Type': responseType,
                    'Access-Control-Allow-Origin': '*',
                },
            ),
            params: new HttpParams(),
        };
        if (hasAuth) {
            let token = sessionStorage.getItem('token');
            if (token) {
                httpOption.headers = httpOption.headers.set('token', token);
            }
        }

        if (params) {
            const field: any = Object.keys(params);
            const valueField: any = Object.values(params);
            for (let i = 0; i < field.length; i++) {
                if (valueField[i] && valueField[i] !== null) {
                    httpOption.params = httpOption.params.append(field[i], valueField[i].toString());
                }
            }
        }
        return httpOption;
    }

    public get(path: string, params?: any, hasAuth?: boolean): Observable<any> {
        const url: string = this.getApiUrl() + path;
        this.httpOption = this.getHttpOption(hasAuth, params);
        try {
            return this.httpClient.get<any>(url, this.httpOption).pipe(
                map((resp: any) => {
                    if (!resp.status) {
                        this.checkHttpCode(resp.httpCode);
                    }
                    return resp;
                }),
                catchError((error) => throwError(() => error))
            );
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public getByUrl(url: string, params?: any): Observable<HttpResponse<any>> {
        this.httpOption = this.getHttpOption(false, params);
        try {
            return this.httpClient.get<any>(url, this.httpOption).pipe(
                map((resp: any) => {
                    if (!resp.status) {
                        this.checkHttpCode(resp.httpCode);
                    }
                    return resp;
                }),
                catchError(error => this.handleError(error))
            );
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public post(path: string, body: any, params?: any, hasAuth?: boolean): Observable<HttpResponse<any>> {
        const url: string = this.getApiUrl() + path;
        this.httpOption = this.getHttpOption(hasAuth, params);
        try {
            return this.httpClient.post<any>(url, body, this.httpOption).pipe(
                map((resp: any) => {
                    if (!resp.status) {
                        this.checkHttpCode(resp.httpCode);
                    }
                    return resp;
                }),
                catchError(error => this.handleError(error))
            );
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public postHeader(path: string, body?: any): Observable<HttpResponse<any>> {
        const url: string = this.getApiUrl() + path;
        try {
            return this.httpClient.post<any>(url, this.httpOption, {headers: body}).pipe(
                map((resp: any) => {
                    if (!resp.status) {
                        this.checkHttpCode(resp.httpCode);
                    }
                    return resp;
                }),
                catchError(error => this.handleError(error))
            );
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public patch(path: string, body: any, params?: any, hasAuth?: boolean): Observable<HttpResponse<any>> {
        const url: string = this.getApiUrl() + path;
        this.httpOption = this.getHttpOption(hasAuth, params);
        try {
            return this.httpClient.patch<any>(url, body, this.httpOption).pipe(
                map((resp: any) => {
                    if (!resp.status) {
                        this.checkHttpCode(resp.httpCode);
                    }
                    return resp;
                }),
                catchError((error) => throwError(() => error))
            );
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public postByUrl(url: string, body: any, params?: boolean): Observable<HttpResponse<any>> {
        this.httpOption = this.getHttpOption(false, params);
        try {
            return this.httpClient.post<any>(url, body, this.httpOption).pipe(
                map((resp: any) => {
                    if (!resp.status) {
                        this.checkHttpCode(resp.httpCode);
                    }
                    return resp;
                }),
                catchError(error => this.handleError(error))
            );
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public put(path: string, body: any, params?: any, hasAuth?: boolean): Observable<HttpResponse<any>> {
        const url: string = this.getApiUrl() + path;
        this.httpOption = this.getHttpOption(hasAuth, params);
        try {
            return this.httpClient.put<any>(url, body, this.httpOption).pipe(
                map((resp: any) => {
                    if (!resp.status) {
                        this.checkHttpCode(resp.httpCode);
                    }
                    return resp;
                }),
                catchError(error => this.handleError(error))
            );
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public delete(path: string, params?: any, hasAuth?: boolean): Observable<HttpResponse<any>> {
        const url: string = this.getApiUrl() + path;
        this.httpOption = this.getHttpOption(hasAuth, params);
        try {
            return this.httpClient.delete(url, this.httpOption).pipe(
                map((resp: any) => {
                    if (!resp.status) {
                        this.checkHttpCode(resp.httpCode);
                    }
                    return resp;
                }),
                catchError(error => this.handleError(error))
            );
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public exportFile(path: string, params?: any, responseType?: any, hasAuth?: any): Observable<Blob> {
        const url: string = this.getApiUrl() + path;
        this.httpOption = this.getHttpOption(hasAuth, params, responseType);
        try {
            return this.httpClient.get<HttpResponse<Blob>>(url, this.httpOption).pipe(
                map((resp: any) => {
                    if (!resp.status) {
                        this.checkHttpCode(resp.httpCode);
                    }
                    return resp;
                }),
                catchError(error => this.handleError(error))
            );
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public postFormData(path: string, data: any, hasAuth: boolean = true): Observable<HttpResponse<any>> {
        const url: string = this.getApiUrl() + path;
        // @ts-ignore
        this.httpOption = this.getHttpOption(hasAuth, null, null);
        try {
            return this.httpClient.post<any>(url, data, this.httpOption).pipe(
                map((resp: any) => {
                    if (!resp.status) {
                        if (resp.httpCode == 401) {
                            // window.location.replace(`${this.env.AUTH_LOGIN_PAGE}?returnUrl=${window.location.origin}/auth/callback&state=/`);
                            return;
                        }
                        if (resp.httpCode == 403) {
                            // this.notifyService.notify('WARN', '', 'Không có quyền thực hiện chức năng này');
                        }
                    }
                    return resp;
                }),
                catchError(error => this.handleError(error))
            );
        } catch (err: any) {
            throw new Error(err);
        }
    }
}
