import {Component, OnInit} from '@angular/core';
import {OpenCardService} from "../../services/open-card.service";

@Component({
    selector: 'app-notify-success',
    templateUrl: './notify-success.component.html',
    styleUrls: ['./notify-success.component.scss', '../notify-fail/notify-fail.component.scss']
})
export class NotifySuccessComponent implements OnInit {
    info = {
        linkImg: '../../../assets/jv1/icon-success.svg',
        titleMain: 'Chúc mừng bạn đã đủ điều kiện mở thẻ tín dụng',
        titleAbove: "Vui lòng nhấn 'Tiếp tục' để hoàn tất hồ sơ và nhận ưu đãi từ VPBank",
        button: 'Tiếp tục',
        routerLink: '',
    }
    flow = localStorage.getItem('flow') || '';

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
