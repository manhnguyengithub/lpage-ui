import {Component, ChangeDetectorRef, Inject, OnInit} from '@angular/core';
import {
    MatBottomSheetRef,
    MAT_BOTTOM_SHEET_DATA
} from '@angular/material/bottom-sheet';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
    list = [];
    listSearch = [];
    keySearch = new FormControl(null);
    info: any = {};
    title = '';
    titleSearch = '';
    address = 'province';

    constructor(
        private cdr: ChangeDetectorRef,
        private bottomSheetRef: MatBottomSheetRef<AddressComponent>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    ) {
        this.setData(data);
    }

    ngOnInit() {
    }

    setData(data) {
        const type = data.type;
        this.list = data.list;
        this.listSearch = data.list;
        this.keySearch.valueChanges.subscribe(value => {
            this.listSearch = this.list.filter(item => item.name.toLowerCase().includes(value.trim().toLowerCase()));
        });
        this.address = this.data.type;
        this.title = type === 'province' ? 'Chọn Tỉnh/Thành phố' : (type === 'district' ? 'Chọn Quận/Huyện' : 'Chọn Phường/Xã');
        this.titleSearch = type === 'province' ? 'Không có Tỉnh/Thành phố nào' : (type === 'district' ? 'Không có Quận/Huyện nào' : 'Không có Phường/Xã nào');
        this.cdr.markForCheck();
    }

    chooseValue(data): void {
        this.bottomSheetRef.dismiss({data, type: this.address});
    }

    close() {
        this.bottomSheetRef.dismiss(null);
    }
}

