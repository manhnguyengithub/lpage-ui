import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NZ_I18N } from 'ng-zorro-antd/i18n';
// import { vi_VN } from 'ng-zorro-antd/i18n';
// import { registerLocaleData } from '@angular/common';
// import vi from '@angular/common/locales/vi';
import { MaterialModule } from './material.module';
// import { NzModule } from './nz.module';
import { PdfViewerModule } from "ng2-pdf-viewer";

// registerLocaleData(vi);
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        // NzModule,
        PdfViewerModule,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        // NzModule,
        PdfViewerModule,
    ],
    providers: [
        // { provide: NZ_I18N, useValue: vi_VN }
    ]
})
export class SharedModule { }
