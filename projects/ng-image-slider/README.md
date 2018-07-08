# Angular 6 Image Slider with Lightbox

An Angular 6 responsive image slider with image lightbox popup.

Demo : https://ng-image-slider.herokuapp.com/

Comments and contributions welcome :)

## Install :
`npm install ng-image-slider`

## Usage :
 - Import module in your `app.module.ts`:
```js
import { NgImageSliderModule } from 'ng-image-slider';
```
 - and 
```js
imports: [
    NgImageSliderModule
  ]
```

 - Add component in your template file.
```html
<ng-image-slider [images]="imageObject"></ng-image-slider>
```

 - imageObject format
```js
imageObject: Array<object> = [{
        image: 'assets/img/slider/1.jpg',
        thumbImage: 'assets/img/slider/1_min.jpeg'
    }, {
        image: 'assets/img/slider/2.jpg',
        thumbImage: 'assets/img/slider/2_min.jpeg'
    }, {
        image: 'assets/img/slider/3.jpg',
        thumbImage: 'assets/img/slider/3_min.jpeg'
    }
];
```

## Other options :
 - `[infinite]`: (type: `boolean`) (default: `false`): Slide image slider infinite if value is `true`.
 - `imagePopup`: (type: `boolean`) (default: `true`): Show original image in lightBox pop-up on slider image click if value is true.
 - `animationSpeed`: (type: `number`) (default: `1` second) By this user can set slider animation speed. Minimum value is `1` second and Maximum value is `5` second.

## License
As Angular itself, this module is released under the permissive [MIT license](http://revolunet.mit-license.org). Your contributions are always welcome.