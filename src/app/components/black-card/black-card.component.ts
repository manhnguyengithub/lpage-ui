import {Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OpenCardService } from '../../services/open-card.service';

@Component({
    selector: 'black-card',
    templateUrl: './black-card.component.html',
    styleUrls: ['./black-card.component.scss']
})
export class BlackCardComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<BlackCardComponent>,
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
