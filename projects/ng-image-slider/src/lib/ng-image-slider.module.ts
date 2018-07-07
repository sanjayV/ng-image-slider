import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgImageSliderComponent } from './ng-image-slider.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [NgImageSliderComponent],
    exports: [NgImageSliderComponent]
})
export class NgImageSliderModule { }
