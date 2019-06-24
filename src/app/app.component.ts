import { Component, ViewEncapsulation, ViewChild, HostListener } from '@angular/core';
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

    sliderWidth: Number = 1140;
    sliderImageWidth: Number = 300;
    slideShowWidth: Number = 940;
    sliderImageHeight: Number = 225;
    slideShowImageWidth: Number = 920;
    slideShowImageHeight: Number = 500;
    sliderArrowShow: Boolean = true;
    sliderInfinite: Boolean = false;
    sliderImagePopup: Boolean = true;
    sliderAutoSlide: Boolean = false;
    sliderSlideImage: Number = 1;
    sliderAnimationSpeed: any = 1;
    imageObject: Array<object> = [];
    imageSlideShow = this.imageObject = [{
        image: 'assets/img/slider/6.jpg',
        thumbImage: 'assets/img/slider/6.jpg',
        title: 'brown deer under tree'
    }, {
        image: 'assets/img/slider/5.jpg',
        thumbImage: 'assets/img/slider/5.jpg',
        title: 'Hummingbirds are amazing creatures'
    }, {
        image: 'assets/img/slider/7.jpg',
        thumbImage: 'assets/img/slider/7.jpg',
        title: 'The fox squirrel (Sciurus niger), also known as the eastern fox squirrel or Bryants fox squirrel'
    }, {
        image: 'assets/img/slider/8.jpg',
        thumbImage: 'assets/img/slider/8.jpg',
        title: 'The birds-of-paradise are members of the family Paradisaeidae of the order Passeriformes.'
    }, {
        image: 'assets/img/slider/9.jpg',
        thumbImage: 'assets/img/slider/9.jpg',
        title: 'Blue Bird-of-Paradise, Tigibi, Tari area'
    }];

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.slideShowWidth = window.innerWidth - 30;
        this.slideShowImageWidth = window.innerWidth - 60;
    }

    constructor() {
        this.setImageObject();
        this.onResize();
    }

    onChangeHandler() {
        this.setImageObject();
        this.showSlider = false;
        setTimeout(() => {
            this.showSlider = true;
        }, 10);
    }

    setImageObject() {
        this.imageObject = this.imageObject = [{
            image: 'assets/img/slider/6.jpg',
            thumbImage: 'assets/img/slider/6_min.jpeg',
            title: 'angular image slider : brown deer under tree'
        }, {
            image: 'assets/img/slider/5.jpg',
            thumbImage: 'assets/img/slider/5_min.jpeg',
            title: 'angular image slider : Hummingbirds are amazing creatures'
        }, {
            image: 'assets/img/slider/7.jpg',
            thumbImage: 'assets/img/slider/7_min.jpeg',
            alt: 'angular image slider : squirrel on tree'
        }, {
            image: 'assets/img/slider/8.jpg',
            thumbImage: 'assets/img/slider/8_min.jpeg',
            alt: 'angular image slider : beautiful bird'
        }, {
            image: 'assets/img/slider/9.jpg',
            thumbImage: 'assets/img/slider/9_min.jpeg',
            alt: 'angular image slider : beautiful bird'
        }, {
            video: 'https://youtu.be/tYa6OLQHrEc',
            title: 'Youtube example one with title.',
            alt: 'angular image slider : spider with shoes'
        }, {
            video: 'https://youtu.be/6pxRHBw-k8M',
            alt: 'angular image slider : indian tiger'
        }, {
            video: 'assets/video/movie.mp4',
            title: 'angular image slider : MP4 Video example one with title and No Poster-Image.'
        }, {
            video: 'assets/video/movie2.mp4',
            posterImage: 'assets/img/slider/2_min.jpeg',
            title: 'angular image slider : MP4 Video exmaple two with Poster-Image.'
        }, {
            image: 'assets/img/slider/4.jpg',
            thumbImage: 'assets/img/slider/4_min.jpeg',
            title: 'angular image slider : Most beautiful birds in the world flying.'
        }];
    }

    imageOnClick(index) {
        console.log('index', index);
    }

    arrowOnClick(event) {
        console.log('arrow click event', event);
    }

    lightboxArrowClick(event) {
        console.log('popup arrow click', event);
    }

    prevImageClick() {
        this.ds.prev();
    }

    nextImageClick() {
        this.ds.next();
    }
}
