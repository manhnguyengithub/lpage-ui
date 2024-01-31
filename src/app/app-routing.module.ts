import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from "./views/landing-page/landing-page.component";
import { EnterInfoComponent } from './views/enter-info/enter-info.component';
import { NotifyFailComponent } from "./views/notify-fail/notify-fail.component";
import { TetComponent } from './components/tet/tet.component';
import { Jv1Component } from './views/jv1/jv1.component';
import { NotifySuccessComponent } from './views/notify-success/notify-success.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LandingPageComponent
    },
    {
        path: 'jv1',
        component: Jv1Component
    },
    {
        path: 'fb1',
        component: LandingPageComponent
    },
    {
        path: 'tt1',
        component: LandingPageComponent
    },
    {
        path: 'fb2',
        component: TetComponent
    },
    {
        path: 'tt2',
        component: TetComponent
    },
    {
        path: 'gg2',
        component: TetComponent
    },
    {
        path: 'enter-info',
        component: EnterInfoComponent
    },
    {
        path: 'fail',
        component: NotifyFailComponent
    },
    {
        path: 'success',
        component: NotifySuccessComponent
    },
    {
        path: '**',
        redirectTo: '',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
