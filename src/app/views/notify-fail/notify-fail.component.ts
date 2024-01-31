import {Component, OnInit} from '@angular/core';
import {OpenCardService} from "../../services/open-card.service";

@Component({
    selector: 'app-notify-fail',
    templateUrl: './notify-fail.component.html',
    styleUrls: ['./notify-fail.component.scss', '../jv1/jv1.component.scss']
})
export class NotifyFailComponent implements OnInit {
    info = {
        linkImg: '../../../assets/jv1/icon-fail.png',
        titleMain: 'Đăng ký mở thẻ tín dụng chưa thành công',
        titleAbove: 'Chúng tôi rất tiếc vì hiện tại chưa có sản phẩm thẻ phù hợp dành cho bạn, mong bạn vui lòng thử lại sau.',
        button: 'Quay về',
        routerLink: '',
    }

    constructor(
        private openCardService: OpenCardService,
    ) {
    }

    ngOnInit() {
    }

    submit() {
        this.openCardService.nextStep();
    }
}
