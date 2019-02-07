import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgImageSliderModule } from 'ng-image-slider';


import { AppComponent } from './app.component';
import { ISliderComponent } from './islider/islider.component';
import { SliderCustomImageComponent } from './slider-custom-image/slider-custom-image.component';
import { SliderLightboxComponent } from './slider-lightbox/slider-lightbox.component';


@NgModule({
    declarations: [
        AppComponent,
        ISliderComponent,
        SliderCustomImageComponent,
        SliderLightboxComponent
    ],
    imports: [
        BrowserModule,
        NgImageSliderModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
