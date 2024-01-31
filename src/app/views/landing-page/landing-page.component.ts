import { AfterViewInit, OnInit, Component, ElementRef, OnDestroy, ViewChild, HostListener } from "@angular/core"
import { EnvService } from "../../services/env.service";
import KeenSlider, { KeenSliderInstance } from "keen-slider";
import { MatDialog } from '@angular/material/dialog';
import { ReturnMoneyComponent } from "../../components/return-money/return-money.component";
import { IphonePopUpComponent } from "../../components/iphone-pop-up/iphone-pop-up.component";
import { ZCardComponent } from "../../components/z-card/z-card.component";
import { ShopeeCardComponent } from "../../components/shopee-card/shopee-card.component";
import { BlackCardComponent } from "../../components/black-card/black-card.component";
import { ActivatedRoute, Router } from '@angular/router';
import { OpenCardService } from "../../services/open-card.service";

const animation = { duration: 50000, easing: (t) => t }
const animationTwo = { duration: 50000, easing: (t) => t }
@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: [
        './landing-page.component.scss',
        "../../../../node_modules/keen-slider/keen-slider.min.css"
    ]
})
export class LandingPageComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild("sliderRefOne") sliderRefOne: ElementRef<HTMLElement>;
    @ViewChild("sliderRefTwo") sliderRefTwo: ElementRef<HTMLElement>;
    @ViewChild("sliderRefThree") sliderRefThree: ElementRef<HTMLElement>;
    sliderOne: KeenSliderInstance = null;
    sliderTwo: KeenSliderInstance = null;
    sliderThree: KeenSliderInstance = null;
    bigScreen = false;
    laptopScreen = false;
    mobileScreen = false;
    imgHero = "assets/hero-banner.png";
    showFloatingButton = false;
    // flow = '';
    // flowSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private env: EnvService,
        private dialog: MatDialog,
        private openCardService: OpenCardService,
    ) {
        if (window.innerWidth > 1366) {
            this.bigScreen = true;
            this.laptopScreen = false;
            this.mobileScreen = false;
        } else if (window.innerWidth < 1366 && window.innerWidth > 767) {
            this.laptopScreen = true;
            this.bigScreen = false;
            this.mobileScreen = false;
        } else {
            this.imgHero = "assets/mobile-hero.png";
            this.mobileScreen = true;
            this.bigScreen = false;
            this.laptopScreen = false;
        }
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        // Kiểm tra vị trí cuộn của trang
        const yOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        // Đặt một ngưỡng, ví dụ: 200px
        this.showFloatingButton = yOffset > 500;
        if (this.showFloatingButton) {
        }
    }

    ngOnInit() {
        // this.flowSub = this.openCardService.flow$.subscribe(flow => {
        //     if (flow) {
        //         this.flow = flow;
        //     }
        // });
    }

    ngAfterViewInit() {
        this.sliderOne = new KeenSlider(this.sliderRefOne.nativeElement, {
            loop: true,
            renderMode: "performance",
            drag: false,
            rtl: true,
            created(s) {
                s.moveToIdx(5, true, animation)
            },
            updated(s) {
                s.moveToIdx(s.track.details.abs + 5, true, animation)
            },
            animationEnded(s) {
                s.moveToIdx(s.track.details.abs + 5, true, animation)
            },
        });
        this.sliderTwo = new KeenSlider(this.sliderRefTwo.nativeElement, {
            loop: true,
            renderMode: "performance",
            drag: false,
            rtl: true,
            created(s) {
                s.moveToIdx(5, true, animationTwo)
            },
            updated(s) {
                s.moveToIdx(s.track.details.abs + 5, true, animationTwo)
            },
            animationEnded(s) {
                s.moveToIdx(s.track.details.abs + 5, true, animationTwo)
            },
        });
        if (this.sliderRefThree) {
            this.sliderThree = new KeenSlider(this.sliderRefThree.nativeElement, {
                loop: true,
                renderMode: "performance",
                drag: false,
                rtl: false,
                created(s) {
                    s.moveToIdx(5, true, animationTwo)
                },
                updated(s) {
                    s.moveToIdx(s.track.details.abs + 5, true, animationTwo)
                },
                animationEnded(s) {
                    s.moveToIdx(s.track.details.abs + 5, true, animationTwo)
                },
            });
        }
    }

    ngOnDestroy() {
        if (this.sliderOne) this.sliderOne.destroy();
        if (this.sliderTwo) this.sliderTwo.destroy();
        if (this.sliderThree) this.sliderThree.destroy();

        // this.flowSub.unsubscribe();
    }

    returnMoney() {
        this.dialog.open(ReturnMoneyComponent, {
            width: this.mobileScreen ? '100vw' : 'auto',
            height: this.mobileScreen ? '65vh' : 'auto',
            disableClose: true,
            autoFocus: false,
            panelClass: 'custom',
        });
    }

    openIphone() {
        this.dialog.open(IphonePopUpComponent, {
            width: this.mobileScreen ? '100vw' : 'auto',
            height: this.mobileScreen ? '65vh' : 'auto',
            disableClose: true,
            autoFocus: false,
            panelClass: 'custom',
        })
    }

    openZCard() {
        this.dialog.open(ZCardComponent, {
            width: this.mobileScreen ? '100vw' : 'auto',
            height: '65vh',
            disableClose: true,
            autoFocus: false,
            panelClass: 'custom',
        })
    }

    openShopeeCard() {
        this.dialog.open(ShopeeCardComponent, {
            width: this.mobileScreen ? '100vw' : 'auto',
            height: '65vh',
            disableClose: true,
            autoFocus: false,
            panelClass: 'custom',
        })
    }

    openBlackCard() {
        this.dialog.open(BlackCardComponent, {
            width: this.mobileScreen ? '100vw' : 'auto',
            height: '65vh',
            disableClose: true,
            autoFocus: false,
            panelClass: 'custom',
        })
    }

    openCard() {
        this.openCardService.nextStep();
    }
}
