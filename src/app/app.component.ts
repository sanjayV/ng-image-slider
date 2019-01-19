import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    @ViewChild('nav') ds: NgImageSliderComponent;
    title = 'Image Slider demo';
    imageObject: Array<object> = [{
        image: 'assets/img/slider/1.jpg',
        thumbImage: 'assets/img/slider/1_min.jpeg'
    }, {
        image: 'assets/img/slider/2.jpg',
        thumbImage: 'assets/img/slider/2_min.jpeg',
        title: 'Nature birds and flowers.'
    }, {
        image: 'assets/img/slider/3.jpg',
        thumbImage: 'assets/img/slider/3_min.jpeg',
        title: 'Bird of paradise.'
    }, {
        image: 'assets/img/slider/4.jpg',
        thumbImage: 'assets/img/slider/4_min.jpeg',
        title: 'Most beautiful birds in the world flying.'
    }, {
        image: 'assets/img/slider/5.jpg',
        thumbImage: 'assets/img/slider/5_min.jpeg'
    }, {
        image: 'assets/img/slider/6.jpg',
        thumbImage: 'assets/img/slider/6_min.jpeg'
    }, {
        image: 'assets/img/slider/7.jpg',
        thumbImage: 'assets/img/slider/7_min.jpeg'
    }, {
        image: 'assets/img/slider/8.jpg',
        thumbImage: 'assets/img/slider/8_min.jpeg'
    }, {
        image: 'assets/img/slider/9.jpg',
        thumbImage: 'assets/img/slider/9_min.jpeg'
    }];

    constructor() {}

    imageOnClick(index) {
        console.log('index', index);
    }

    arrowOnClick(event) {
        console.log('arrow click event', event);
    }

    prevImageClick() {
        this.ds.prev();
    }

    nextImageClick() {
        this.ds.next();
    }
}
