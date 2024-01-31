import { AfterViewInit, OnInit, Component, HostListener} from "@angular/core"
import { EnvService } from "../../services/env.service";
import { OpenCardService } from "../../services/open-card.service";

@Component({
    selector: 'app-jv1',
    templateUrl: './jv1.component.html',
    styleUrls: ['./jv1.component.scss']
})
export class Jv1Component implements OnInit {
    showFloatingButton = false;
    constructor(
        private openCardService: OpenCardService
    ) {

    }
    @HostListener('window:scroll', [])
    onWindowScroll() {
        // Kiểm tra vị trí cuộn của trang
        const yOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        // Đặt một ngưỡng, ví dụ: 200px
        this.showFloatingButton = yOffset > 220;
        if (this.showFloatingButton) {
        }
    }
    ngOnInit(): void {
        
    }
    openCard() {
        this.openCardService.nextStep();
    }
}
