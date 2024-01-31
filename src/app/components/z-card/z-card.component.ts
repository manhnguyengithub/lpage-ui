import {Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OpenCardService } from '../../services/open-card.service';

@Component({
    selector: 'z-card',
    templateUrl: './z-card.component.html',
    styleUrls: ['./z-card.component.scss']
})
export class ZCardComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ZCardComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private openCardService: OpenCardService,
    ) {
    }

    ngOnInit() {
        window.scrollTo(0, 0);
    }

    openCard() {
        this.openCardService.nextStep();
    }

}
