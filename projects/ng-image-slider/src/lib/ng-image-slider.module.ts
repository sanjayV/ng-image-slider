import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgImageSliderComponent } from './ng-image-slider.component';
import { SliderCustomImageComponent } from './slider-custom-image/slider-custom-image.component';
import { SliderLightboxComponent } from './slider-lightbox/slider-lightbox.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NgImageSliderComponent,
        SliderCustomImageComponent,
        SliderLightboxComponent
    ],
    exports: [NgImageSliderComponent]
})
export class NgImageSliderModule { }
