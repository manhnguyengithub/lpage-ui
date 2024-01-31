import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EnvService {
    public API_URL = '';
    public DEFAULT_URL: string = '';
    public JV1_URL: string = '';
    public FB1_URL: string = '';
    public TT1_URL: string = '';
    public FB2_URL: string = 'https://mothe.senid.vn/fb2';
    public TT2_URL: string = 'https://mothe.senid.vn/tt2';
    public GG2_URL: string = 'https://mothe.senid.vn/gg2';
    public tncVersion: string = '';
    public dppVersion: string = '';
    public vspVersion: string = '';
    public enableDebug = true;
}
