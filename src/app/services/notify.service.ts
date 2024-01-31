import {Injectable} from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
    providedIn: 'root'
})

export class NotifyService {
    constructor(
        private notification: NzNotificationService
    ) {
    }

    // Thông báo có thể custom được
    // các type có thể truyền vào là: 'success', 'info', 'warning', 'error'
    showNotify(type: string, title: string, content: string) {
        this.notification.create(
            type,
            title,
            content
        );
    }

    // Hiển thị thông báo lỗi khi gọi api
    showErrorCallApi(type?: string, title?: string, content?: string) {
        this.notification.create(type || 'error', title || 'Thông báo', content || 'Có lỗi xảy ra!');
    }

}
