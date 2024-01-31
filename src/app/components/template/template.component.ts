import {Component, OnInit, Input, ChangeDetectorRef, OnChanges, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotifyService} from '../../services/notify.service';
import {ApiService} from '../../services/api.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {AddressComponent} from "../address/address.component";
import * as moment from 'moment';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
    selector: 'app-template',
    templateUrl: './template.component.html',
    styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, OnChanges {
    @Input() data: any;
    @Input() form!: FormGroup;
    @Input() listProvince: any;
    @Input() objIdsProvinceSelected: any;
    @Input() fieldControlForm: any;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    objListDistrict = {};
    objListWard = {};
    showDistrict = false;
    showWard = false;
    showAddress = false;

    datetimeFormatForm = new FormControl();
    inputSearchForm = new FormControl();
    freeMultipleForm = new FormControl();
    listDropList: any = [];
    freeMultipleList: any = [];
    @ViewChild('multipleInput') multipleInput: ElementRef<HTMLInputElement>;
    @ViewChild('province') province;
    @ViewChild('district') district;
    @ViewChild('ward') ward;
    disableInputMultipleViewFormat = false;
    addOnBlur = true;
    invalidProvince = false;
    invalidDistrict = false;

    constructor(
        private cdr: ChangeDetectorRef,
        private notifyService: NotifyService,
        private apiService: ApiService,
        private _bottomSheet: MatBottomSheet,
    ) {
    }

    ngOnInit(): void {
        this.inputSearchForm.valueChanges.subscribe(value => {
           if (value) {
               this.listDropList = this.data.listField.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) != -1);
           } else {
               this.listDropList = this.data.listField;
           }
        });
        this.listDropList = this.data?.listField;
        setTimeout(() => {
            if (this.data.listField) {
                this.listDropList = this.data.listField;
            }
        }, 1000);
        this.fieldControlForm.valueChanges.subscribe(value => {
            if (typeof(value) === 'string') {
                if (this.data.listField && this.data?.dataType === 'DROPLIST_SINGLE') {
                    this.listDropList = this.data.listField.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
                }
            }
        });
        this.freeMultipleForm.valueChanges.subscribe(value => {
            if (this.data.listField && typeof(value) === 'string') {
                this.listDropList = this.data.listField.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
            } else {
                this.listDropList = this.data.listField;
            }
        });
        this.freeMultipleForm.setValidators(Validators.required);
    }

    displayFn(value): string {
        if (value) {
            return value.name;
        }
    }

    ngOnChanges(): void {
    }

    openedChange(opened: boolean) {
        if (!opened) {
            this.inputSearchForm.setValue('');
        }
    }

    add(event: any) {
        if (typeof (event?.value) === 'string') {
            const value = (event?.value || '').trim();
            // chỉ cho chọn 1 giá trị
            if (this.freeMultipleList.length === 0) {
                if (value) {
                    this.freeMultipleList.push(value);
                    event.chipInput?.clear();
                    let currentFormValue = this.fieldControlForm.value;
                    currentFormValue.push(value);
                    this.fieldControlForm.setValue(currentFormValue);
                    this.disableInputMultipleViewFormat = true;
                    this.freeMultipleForm.setValue('');
                    this.multipleInput.nativeElement.value = '';
                }
            }
        }
    }

    selected(event: MatAutocompleteSelectedEvent) {
        const id = event.option.value;
        const name = this.data.listField.find(item => item.id === id).name;
        // chỉ cho chọn 1 giá trị
        if (this.freeMultipleList.length === 0) {
            if (!this.freeMultipleList.includes(name)) {
                this.freeMultipleList.push(name);
                this.multipleInput.nativeElement.value = '';
                this.listDropList = this.data.listField;
                let currentFormValue = this.fieldControlForm.value;
                currentFormValue.push(id);
                this.fieldControlForm.setValue(currentFormValue);
            } else {
                this.listDropList = this.data.listField;
            }
            this.disableInputMultipleViewFormat = true;
        } else {
            this.listDropList = this.data.listField;
        }
    }

    remove(data) {
        const index = this.freeMultipleList.indexOf(data);
        if (index >= 0) {
            this.freeMultipleList.splice(index, 1);
            this.fieldControlForm.setValue([]);
            this.disableInputMultipleViewFormat = false;
            this.freeMultipleForm.setValue("");
        }
    }

    validateForm(controlName: string, validationType: string): boolean {
        const control = this.form.controls[controlName];
        if (!control) {
            return false;
        }
        return (
            control.hasError(validationType) &&
            (control.dirty || control.touched)
        );
    }

    pickDateTime(value) {
        this.datetimeFormatForm.setValue(moment(value).format(this.data.format));
        this.fieldControlForm.setValue(Date.parse(value));
    }

    onChangeInput(fieldName: any, event: any) {
        const value = event.target.value;
        if (value) {
            if (this.data?.dataType === 'NUMBER') {
                // Using regular expression to remove leading zeros
                let updatedValue = value.toString().replace(/^0+/, '');
                // If the value is now empty or only contains a dot, set it to '0'
                if (!updatedValue || updatedValue === '.') {
                    updatedValue = '0';
                }
                this.form.controls[fieldName].setValue(updatedValue);
            } else {
                this.form.controls[fieldName].setValue(value.toString().trim());
            }
        }
    }

    onChangeInputAddress(formGroupName: any, event: any) {
        const value = event.target.value;
        if (value) {
            // this.form?.['controls'][formGroupName]['controls']?.addressDetail?.setValue(value.toString().trim());
            this.form?.get(formGroupName + '.addressDetail')?.setValue(value.toString().trim());
            // this.form.controls[fieldName].setValue(value.toString().trim());
            return;
        }
    }

    changeProvince(e: any, formGroupName: any): void {
        if (!e) {
            return;
        }
        this.showDistrict = true;
        // reset danh sách huyện tương ứng
        this.objListDistrict[formGroupName] = [];
        this.objListWard[formGroupName] = [];
        this.form?.get(formGroupName + '.district')?.patchValue('');
        this.form?.get(formGroupName + '.ward')?.patchValue('');
        this.getListDistrict(e, formGroupName);
        this.cdr.markForCheck();
    }

    // formGroupName là tên các trường có dataType = 'ADDRESS'
    getListDistrict(provinceId: any, formGroupName: string ) {
        const req = {
            areaId: provinceId
        };
        this.apiService.getListDistrict(req).subscribe((res: any) => {
            if (res && res.status) {
                this.objListDistrict[formGroupName] = res.data;
            }
        }, () => {
            this.notifyService.showErrorCallApi();
        });
    }

    changeDistrict(e: any, formGroupName: any) {
        if (!e) {
            return;
        }
        this.showWard = true;
        // reset danh sách huyện tương ứng
        this.objListWard[formGroupName] = [];
        // @ts-ignore
        this.form?.get(formGroupName+'.wardId')?.patchValue('');
        this.getListWard(e, formGroupName);
        this.cdr.markForCheck();
    }

    getListWard(districtId: any, formGroupName: any) {
        const req = {
            districtId: districtId
        };
        this.apiService.getListWard(req).subscribe(res => {
            if (res && res.status) {
                this.objListWard[formGroupName] = res.data;
            }
        }, () => {
            this.notifyService.showErrorCallApi();
        });
    }

    changeWard(e: any, formGroupName: any) {
        this.showAddress = true;
    }

    onPaste(event: ClipboardEvent): void {
        const clipboardData = event.clipboardData || (window as any).clipboardData;
        const pastedText = clipboardData.getData('text').trim();
        if (!this.checkStringIsNumber(pastedText)) {
            event.preventDefault();
        }
    }

    checkStringIsNumber(str: any) {
        return /^\d+$/.test(str);
    }

    convertValueByType(type: any, controlForm: any, dataField: any) {
        if (type === 'FLOAT') {
            const float = parseFloat(controlForm?.value?.trim().replace(/,/g, '.'));
            if (float) {
                controlForm.patchValue(parseFloat(float.toFixed(dataField.rounding)).toString().replace(/\./g, ','));
            }
        }
    }

    getError(controlForm) {
        if (!(controlForm.dirty || controlForm.touched)) {
            return;
        }
        if (controlForm.hasError('required')) {
            return ' không được bỏ trống';
        } else if (controlForm.hasError('pattern')) {
            return ' không đúng định dạng';
        } else if (controlForm.hasError('maxlength')) {
            return ' vượt quá số kí tự cho phép';
        } else if (controlForm.hasError('minlength')) {
            const minlength = controlForm.errors['minlength'].requiredLength;
            return ` phải chứa ít nhất ${minlength} kí tự`;
        } else if (controlForm.errors) {
            return ' không hợp lệ';
        } else {
            return '';
        }
    }

    openBottomSheet(type, fieldKey): void {
        const list = type === 'province' ? this.listProvince : (type === 'district' ? this.objListDistrict[fieldKey] : this.objListWard[fieldKey]);
        const data = {
            type,
            list
        };
        let matBottomSheetRef = this._bottomSheet.open(AddressComponent, {disableClose: true, data});
        matBottomSheetRef.afterDismissed().subscribe(value => {
            if (value) {
                if (value.type === 'province') {
                    this.form.get(fieldKey).get('provinceId').setValue(value.data);
                    this.province?.close();
                } else if (value.type === 'district') {
                    this.form.get(fieldKey).get('districtId').setValue(value.data);
                    this.district?.close();
                } else {
                    this.form.get(fieldKey).get('wardId').setValue(value.data);
                    this.ward?.close();
                }
            } else {
                if (type === 'province') {
                    this.province?.close();
                    if (!this.form.get(fieldKey).get('provinceId').value()) {

                    }
                } else if (type === 'district') {
                    this.district?.close();
                } else {
                    this.ward.close();
                }
            }
        });
    }
}
