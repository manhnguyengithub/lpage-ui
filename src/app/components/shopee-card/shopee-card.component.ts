import {Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OpenCardService } from '../../services/open-card.service';

@Component({
    selector: 'shopee-card',
    templateUrl: './shopee-card.component.html',
    styleUrls: ['./shopee-card.component.scss']
})
export class ShopeeCardComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ShopeeCardComponent>,
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
