import {Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OpenCardService } from '../../services/open-card.service';

@Component({
    selector: 'return-money',
    templateUrl: './return-money.component.html',
    styleUrls: ['./return-money.component.scss']
})
export class ReturnMoneyComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ReturnMoneyComponent>,
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
