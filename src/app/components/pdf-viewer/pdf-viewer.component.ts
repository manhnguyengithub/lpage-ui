import { ChangeDetectorRef, Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnvService } from '../../services/env.service';

@Component({
    selector: 'kt-pdf-viewer',
    templateUrl: './pdf-viewer.component.html',
    styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {
    data: any;
    label = '';
    httpHeaders: any;
    url = '';
    source: any;
    sourceIndex = 0;
    loading = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) data,
        private env: EnvService,
        private dialogRef: MatDialogRef<PdfViewerComponent>,
        private cdr: ChangeDetectorRef,
    ) {
        this.data = data;
    }

    ngOnInit() {
        this.label = this.data.label;
        this.httpHeaders = this.data.httpHeaders;
        this.url = this.data.url;
        this.source = {
            httpHeaders: this.httpHeaders,
            url: ''
        }
        this.source.url = this.env.API_URL + '/file/public/image/' + this.url;
        this.cdr.markForCheck();
    }

    @HostListener('document:keydown', ['$event'])
    handleKeydownEvent(e: KeyboardEvent) {
        if (e.code === 'ArrowLeft') {
            this.prev();
        } else if (e.code === 'ArrowRight') {
            this.next();
        } else {
            e.preventDefault();
        }
    }

    close() {
        this.dialogRef.close();
    }

    prev() {
        this.loading = true;
        if (this.sourceIndex > 0) this.sourceIndex--;
        this.cdr.markForCheck();
    }

    next() {
        this.loading = true;
        if (this.sourceIndex < this.url.length - 1) this.sourceIndex++;
        this.cdr.markForCheck();
    }

    loadComplete() {
        this.loading = false;
    }
}
