import { Component, HostListener, OnInit } from '@angular/core';
import { OpenCardService } from "../../services/open-card.service";

@Component({
    selector: 'app-tet',
    templateUrl: './tet.component.html',
    styleUrls: ['./tet.component.scss']
})
export class TetComponent implements OnInit {
    isScrolled = false;
    showFloatingButton = false;
    constructor(
        private openCardService: OpenCardService,
    ) {

    }
    ngOnInit(): void {
        
    }
    @HostListener('window:scroll', [])
    onWindowScroll() {
        const yOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.isScrolled = yOffset > 0;
        this.showFloatingButton = yOffset > 340;
    }

    openCard() {
        this.openCardService.nextStep();
    }
}
