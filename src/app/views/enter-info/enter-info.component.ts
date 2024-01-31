import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ApiService} from '../../services/api.service';
import {OpenCardService} from '../../services/open-card.service';
import {ActivatedRoute, Router} from "@angular/router";
import {PdfViewerComponent} from "../../components/pdf-viewer/pdf-viewer.component";
import {MatDialog} from "@angular/material/dialog";
import {EnvService} from "../../services/env.service";
import {getDeviceInfo} from "../../shared/models/common.model";

@Component({
    selector: 'app-enter-info',
    templateUrl: './enter-info.component.html',
    styleUrls: ['./enter-info.component.scss']
})
export class EnterInfoComponent implements OnInit {
    info = {
        titleMain: 'Thông tin cơ bản',
        titleAbove: '',
        button: 'Tiếp tục'
    }
    currentListField = [
        {
            fieldKey: "area",
            name: "",
            dataType: "ADDRESS",
            maxlength: null,
            minlength: null,
            format: null,
            categoryId: null,
            viewFormat: null,
            rounding: null,
            index: 0,
            type: "FIXED",
            typeScreenValue: "MANUAL_INPUTED"
        },
        {
            fieldKey: "yearOfBirth",
            name: "Năm sinh",
            dataType: "NUMBER",
            maxlength: 4,
            minlength: 4,
            format: null,
            categoryId: null,
            viewFormat: null,
            rounding: null,
            index: 0,
            type: "FIXED",
            typeScreenValue: "MANUAL_INPUTED",
            placeholder: 'Vui lòng nhập năm sinh'
        },
        {
            fieldKey: "numberOfCards",
            name: "Bạn đang có bao nhiêu thẻ tín dụng",
            dataType: "NUMBER",
            maxlength: 3,
            minlength: 1,
            format: null,
            categoryId: null,
            viewFormat: null,
            rounding: null,
            index: 0,
            type: "FIXED",
            typeScreenValue: "MANUAL_INPUTED",
            placeholder: 'Vui lòng nhập số'
        },
    ];
    dataForm = new FormGroup({});
    listProvince: any = [];
    urlTermsOfService = '';
    urlProtectionPolicy = '';
    urlPrivacyNotice = '';
    ipAddress = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private bottomSheet: MatBottomSheet,
        private fb: FormBuilder,
        private apiService: ApiService,
        private openCardService: OpenCardService,
        private dialog: MatDialog,
        private envService: EnvService,
    ) {
    }

    ngOnInit() {
        // get list province
        this.getListProvince();
        this.initForm();
        this.getIpAddress();
        setTimeout(() => {this.getPDF()}, 1000);
    }

    getListProvince() {
        this.apiService.getListProvince().subscribe((res: any) => {
            if (res?.status) {
                this.listProvince = res.data;
                // đưa HCM, hà nội, đà nẵng nên đầu, còn lại sắp xếp theo abc
                const listCode = ['b37b139eba3549c3a7550d4a1a1a414f', '30dd34a3031146238c5bd6b136de9214', '19effc1aa06e4329a53ed4ed9d934c00'];
                let specialProvinces = this.listProvince.filter(province => listCode.includes(province.code));
                specialProvinces.sort((a, b) => listCode.indexOf(a.code) - listCode.indexOf(b.code));
                let otherProvinces = this.listProvince.filter(province => !listCode.includes(province.code));
                otherProvinces = otherProvinces.sort((a, b) => a.name - b.name);
                this.listProvince = [...specialProvinces, ...otherProvinces];
            }
        }, (error) => {
            // this.notifyService.showErrorCallApi();
        });
    }

    initForm() {
        let addressControl = {
            provinceId: ['', Validators.required],
            districtId: ['', Validators.required],
            // wardId: ['', Validators.required],
            // addressDetail: ['', [Validators.required, Validators.maxLength(255)]],
        };
        // this.objListDistrict[template.formName] = {};
        const template = {};
        this.currentListField.forEach((item: any) => {
            const formName: any = {};
            formName.name = item.name;
            formName.dataType = item.dataType;
            formName.list = item.list;
            formName.fieldKey = item.fieldKey;
            if (item?.dataType === 'DROPLIST_MULTIPLE' || item?.dataType === 'DROPLIST_SINGLE') {
                template[item?.fieldKey] = [[], this.getValidatorDataType(item)];
                item.listField = [1,2,3,4];
                // this.getDropListData(item, {fieldCode: item.fieldKey});
            } else if (item?.dataType === 'ADDRESS') {
                template[item?.fieldKey] = this.fb.group(addressControl);
                // this.objListDistrict[template.formName][item?.fieldCode] = [];
            } else if (item?.dataType === 'STRING') {
                template[item?.fieldKey] = ['', this.getValidatorDataType(item)];
            } else {
                template[item?.fieldKey] = ['', this.getValidatorDataType(item)];
            }
        });
        this.dataForm = this.fb.group(template);
    }

    getPDF() {
        this.apiService.getFatcaInfor({code: 'FILE_PDF'}).subscribe({
            next: (res) => {
                if (res.status) {
                    const data = res?.data;
                    this.urlTermsOfService = data[1]?.value;
                    this.urlProtectionPolicy = data[2]?.value;
                    this.urlPrivacyNotice = data[0]?.value;
                }
            },
            error: (e) => {
                console.error(e);
            }
        });
    }

    getContract(url: string) {
        let data = { url };
        this.dialog.open(PdfViewerComponent, {
            data,
            maxHeight: '98vh',
            maxWidth: '98vw',
            width: '98vw',
            disableClose: true,
        });
    }

    getIpAddress() {
        this.apiService.getIpAddress().subscribe({
            next: (res) => {
                this.ipAddress = res?.origin || '';
            },
            error: (e) => {
                console.error(e);
            }
        });
    }

    // getDropListData(item, obj) {
    //     this.apiService.getDropListMultiple(obj).subscribe(value => {
    //         if (value.status) {
    //             item.listField = value.data;
    //         }
    //     })
    // }

    getValidatorDataType(dataItem: any) {
        switch (dataItem.dataType) {
            case 'STRING':
                switch (dataItem.format) {
                    case 'FORMAT_1':
                        return [
                            Validators.pattern(/^[a-zA-ZÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđĐ\s]+(?:\s[a-zA-ZÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđĐ\s]+)*$/),
                            Validators.required,
                            Validators.maxLength(dataItem.maxlength),
                            Validators.minLength(dataItem.minlength ? dataItem.minlength : 1)
                        ]
                    case 'FORMAT_2':
                        return [
                            Validators.pattern('^[\\d]+$'),
                            Validators.required,
                            Validators.maxLength(dataItem.maxlength),
                            Validators.minLength(dataItem.minlength ? dataItem.minlength : 1)
                        ]
                    case 'FORMAT_3':
                        return [
                            Validators.pattern('^[~!@#$%^&*()\\-_=+[\\]{}\\|;:\'",.<>\\/?]+$'),
                            Validators.required,
                            Validators.maxLength(dataItem.maxlength),
                            Validators.minLength(dataItem.minlength ? dataItem.minlength : 1)
                        ]
                    default:
                        return [
                            Validators.required,
                            Validators.maxLength(dataItem.maxlength),
                            Validators.minLength(dataItem.minlength ? dataItem.minlength : 1)
                        ]
                }
            case 'PHONENUMBER':
                return [
                    Validators.required,
                    Validators.pattern('^(0[0-9]{9,12})|(84[0-9]{8,11})$'),
                    Validators.maxLength(dataItem.maxlength ? dataItem.maxlength : 13)
                ]
            case 'EMAIL':
                return [
                    Validators.required,
                    Validators.email,
                    Validators.pattern('^[\\w\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
                ]
            case 'MONEY':
                return [
                    Validators.required,
                    Validators.pattern('^[0-9.]*$'),
                    Validators.maxLength(dataItem.maxlength ? dataItem.maxlength : 10)
                ]
            case 'NUMBER':
                return [
                    Validators.required,
                    Validators.pattern('^[0-9,]*$'),
                    Validators.maxLength(dataItem.maxlength),
                    Validators.minLength(dataItem.minlength ? dataItem.minlength : 1)
                ]
            case 'FLOAT':
                return [
                    Validators.required,
                    Validators.pattern('^[-+]?[0-9]+(,[0-9]+)?$'),
                    Validators.maxLength(dataItem.maxlength)
                ]
            default:
                return [
                    Validators.required
                ]
        }
    }

    convertMoney(data) {
        this.currentListField.forEach(field => {
            if (field.dataType === 'MONEY') {
                const fieldName = field.fieldKey;
                data[fieldName] = Number(this.dataForm.value[fieldName]) * 1000000;
            }
        })
    }

    convertFieldFreeDroplist(data) {
        this.currentListField.forEach(field => {
            if (field.viewFormat && field.dataType === 'DROPLIST_SINGLE') {
                const fieldName = field.fieldKey;
                if (typeof (data[fieldName]) === 'object') {
                    data[fieldName] = this.dataForm.value[fieldName].id;
                }
            }
        })
    }

    nextStep() {
        this.dataForm.markAllAsTouched();
        if (this.dataForm.invalid) {
            console.log('dataForm Invalid');
            return;
        }
        const fieldValues = {...this.dataForm.value};
        this.convertMoney(fieldValues);
        this.convertFieldFreeDroplist(fieldValues);

        const formValue = this.dataForm.value;
        const body = {
            area: formValue['area']['provinceId'],
            district: formValue['area']['districtId'],
            yearOfBirth: Number(formValue['yearOfBirth']),
            numberOfCards: Number(formValue['numberOfCards']),
            utmParam: new URLSearchParams(window.location.search).toString(),
        };
        this.apiService.verifyUserInfo(body).subscribe({
            next: (res) => {
                this.approvePolicy(res);
            },
            error: (e) => {
                console.error(e);
            }
        });
    }

    approvePolicy(verifyResponse: any) {
        const deviceInfo = getDeviceInfo();
        const currentDate = new Date();
        const body = {
            userInfoId: verifyResponse?.data?.id,
            ip: this.ipAddress,
            device: deviceInfo.device,
            browser: deviceInfo.browser,
            isApprove: !!(currentDate.getTime()),
            consentVersion: `${this.envService.tncVersion}, ${this.envService.dppVersion}, ${this.envService.vspVersion}`,
            timeClick: currentDate.getTime(),
        };
        this.apiService.approvePolicy(body).subscribe({
            next: (res) => {
                if (res?.status && verifyResponse?.status) {
                    this.openCardService.nextStep();
                } else {
                    this.openCardService.nextStep(false);
                }
            },
            error: (e) => {
                console.error(e);
            }
        });
    }
}
