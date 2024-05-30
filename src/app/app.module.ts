import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeroService } from './hero.service';
import {NgImageSliderModule} from '../../projects/ng-image-slider/src/lib/ng-image-slider.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        NgImageSliderModule
    ],
    providers: [HeroService],
    bootstrap: [AppComponent]
})
export class AppModule { }
