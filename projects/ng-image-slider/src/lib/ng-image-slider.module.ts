import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgImageSliderComponent } from './ng-image-slider.component';
import { SliderCustomImageComponent } from './slider-custom-image/slider-custom-image.component';
import { SliderLightboxComponent } from './slider-lightbox/slider-lightbox.component';
import { NgImageSliderService } from './ng-image-slider.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NgImageSliderComponent,
        SliderCustomImageComponent,
        SliderLightboxComponent
    ],
    providers: [
        NgImageSliderService
    ],
    exports: [NgImageSliderComponent]
})
export class NgImageSliderModule { }
