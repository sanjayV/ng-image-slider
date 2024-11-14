import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { HeroService } from "./hero.service";

@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        NgImageSliderModule
    ],
    providers: [
        HeroService,
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
