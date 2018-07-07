import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgImageSliderModule } from 'ng-image-slider';


import { AppComponent } from './app.component';
import { ISliderComponent } from './islider/islider.component';


@NgModule({
  declarations: [
    AppComponent,
    ISliderComponent
  ],
  imports: [
    BrowserModule,
    NgImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
