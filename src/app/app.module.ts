import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";
import { NumberOnlyDirective } from "./shared/directives/number-only.directive";
import { EnvServiceProvider } from "./services/env.service.provider";
import { AppComponent } from './app.component';
import { ReturnMoneyComponent } from "./components/return-money/return-money.component";
import { IphonePopUpComponent } from "./components/iphone-pop-up/iphone-pop-up.component";
import { ZCardComponent } from "./components/z-card/z-card.component";
import { ShopeeCardComponent } from "./components/shopee-card/shopee-card.component";
import { BlackCardComponent } from "./components/black-card/black-card.component";
import { EnterInfoComponent } from './views/enter-info/enter-info.component';
import { AddressComponent } from './components/address/address.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { TemplateComponent } from './components/template/template.component';
import { HeaderPasoComponent } from './components/header-paso/header-paso.component';
import { NotifyFailComponent } from "./views/notify-fail/notify-fail.component";
import { TetComponent } from './components/tet/tet.component';
import { PdfViewerComponent } from "./components/pdf-viewer/pdf-viewer.component";
import { Jv1Component } from './views/jv1/jv1.component';
import { NotifySuccessComponent } from './views/notify-success/notify-success.component';

@NgModule({
    declarations: [
        NumberOnlyDirective,

        AppComponent,
        ReturnMoneyComponent,
        IphonePopUpComponent,
        ZCardComponent,
        ShopeeCardComponent,
        BlackCardComponent,
        EnterInfoComponent,
        AddressComponent,
        LandingPageComponent,
        TemplateComponent,
        HeaderPasoComponent,
        NotifyFailComponent,
        TetComponent,
        PdfViewerComponent,
        Jv1Component,
        NotifySuccessComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule
    ],
    providers: [EnvServiceProvider],
    bootstrap: [AppComponent]
})
export class AppModule { }
