import {Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OpenCardService } from '../../services/open-card.service';

@Component({
    selector: 'iphone-pop-up',
    templateUrl: './iphone-pop-up.component.html',
    styleUrls: ['./iphone-pop-up.component.scss']
})
export class IphonePopUpComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<IphonePopUpComponent>,
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
