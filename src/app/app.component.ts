import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgImageSliderModule, NgImageSliderComponent } from 'ng-image-slider';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    @ViewChild('nav') ds: NgImageSliderComponent;
    title = 'Ng Image Slider';
    showSlider = true;

    sliderWidth: Number = 940;
    sliderImageWidth: Number = 300;
    sliderImageHeight: Number = 225;
    sliderArrowShow: Boolean = true;
    sliderInfinite: Boolean = false;
    sliderImagePopup: Boolean = true;
    sliderAutoSlide: Boolean = false;
    sliderSlideImage: Number = 1;
    sliderAnimationSpeed: any = 1;

    imageObject: Array<object> = [{
        video: 'https://youtu.be/tYa6OLQHrEc',
        title: 'Youtube example one with title.'
    }, {
        video: 'https://youtu.be/6pxRHBw-k8M'
    }, {
        video: 'assets/video/movie.mp4',
        title: 'MP4 Video example one with title and No Poster-Image.'
    }, {
        video: 'assets/video/movie2.mp4',
        posterImage: 'assets/img/slider/2_min.jpeg',
        title: 'MP4 Video exmaple two with Poster-Image.'
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

    onChangeHandler() {
        this.imageObject = [{
            video: 'https://youtu.be/tYa6OLQHrEc',
            title: 'Youtube example one with title.'
        }, {
            video: 'https://youtu.be/6pxRHBw-k8M'
        }, {
            video: 'assets/video/movie.mp4',
            title: 'MP4 Video example one with title and No Poster-Image.'
        }, {
            video: 'assets/video/movie2.mp4',
            posterImage: 'assets/img/slider/2_min.jpeg',
            title: 'MP4 Video exmaple two with Poster-Image.'
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
        this.showSlider = false;
        setTimeout(() => {
            this.showSlider = true;
        }, 10);
    }

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
