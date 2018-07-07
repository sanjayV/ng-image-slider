import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Image Slider demo';
    imageObject: Array<object> = [{
        image: 'assets/img/slider/1.jpg',
        thumbImage: 'assets/img/slider/1_min.jpeg'
    }, {
        image: 'assets/img/slider/2.jpg',
        thumbImage: 'assets/img/slider/2_min.jpeg'
    }, {
        image: 'assets/img/slider/3.jpg',
        thumbImage: 'assets/img/slider/3_min.jpeg'
    }, {
        image: 'assets/img/slider/4.jpg',
        thumbImage: 'assets/img/slider/4_min.jpeg'
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

}
