# Angular Image Slider with Lightbox

An Angular responsive image slider with lightbox popup.
Also support youtube and mp4 video urls.

## Features!

  - Responsive
  - captures swipes from phones and tablets
  - Compatible with Angular Universal
  - Image lightbox popup
  - captures keyboard next/previous arrow key event for lightbox image move
  - Support Images (jpeg, jpg, gif, png and Base64-String), Youtube url and MP4 video (url and Base64-String)

### Demo: https://sanjayv.github.io/ng-image-slider/


# Installation
`npm install ng-image-slider`

# Setup :

**Import module in your `app.module.ts`:**
```typescript
import { NgImageSliderModule } from 'ng-image-slider';
...

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        NgImageSliderModule,
        ...
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {
}

```

**Add component in your template file.**
```html
<ng-image-slider [images]="imageObject" #nav></ng-image-slider>
```

**ImageObject format**
```js
imageObject: Array<object> = [{
        image: 'assets/img/slider/1.jpg',
        thumbImage: 'assets/img/slider/1_min.jpeg',
        alt: 'alt of image',
        title: 'title of image'
    }, {
        image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
        thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
        title: 'Image title', //Optional: You can use this key if want to show image with title
        alt: 'Image alt' //Optional: You can use this key if want to show image with alt
    }
];
```

**Image, Youtube and MP4 url's object format**
 ```js
imageObject: Array<object> = [{
        video: 'https://youtu.be/6pxRHBw-k8M' // Youtube url
    },
	{
		video: 'assets/video/movie.mp4', // MP4 Video url
	},
	{
		video: 'assets/video/movie2.mp4',
        posterImage: 'assets/img/slider/2_min.jpeg', //Optional: You can use this key if you want to show video poster image in slider
        title: 'Image title'
    },
	{
		image: 'assets/img/slider/1.jpg',
        thumbImage: 'assets/img/slider/1_min.jpeg',
        alt: 'Image alt'
	}
    ...
];
```

## API Reference (optional) :

| Name | Type | Data Type | Description | Default |
|------|------|-----------|-------------|---------|
| infinite | @Input  | boolean   | Infinite sliding images if value is **true**. | false |
| imagePopup | @Input  | boolean | Enable image lightBox popup option on slider image click. | true |
| animationSpeed | @Input  | number | By this user can set slider animation speed. Minimum value is **0.1 second** and Maximum value is **5 second**. | 1 |
| slideImage | @Input | number | Set how many images will move on left/right arrow click. | 1 |
| imageSize | @Input | object | Set slider images width and height. Pass object like `{width: 400, height: 300}` | `{width: 205, height: 200}` |
| autoSlide | @Input | number | Auto slide images according provided time. Option will work only if **infinite** option is **true**. Minimum value is 1 second and Maximum value is 5 second. | 0 |
| showArrow | @Input | boolean | Hide/Show slider arrow buttons | true |
| videoAutoPlay | @Input | boolean | Auto play popup video | false |
| direction | @Input | string | Set text direction. You can pass **rtl** / **ltr** / **auto** | ltr |
| imageClick | @Output | n/a | Executes when click event on slider image. Return image index. | n/a |
| arrowClick | @Output | n/a | Executes when click on slider left/right arrow. | n/a |
| lightboxArrowClick | @Output | n/a | Executes when click on lightbox next/previous arrow. | n/a |


## Add custom navigation button
```typescript
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
    selector: 'sample',
        template:`
        <ng-image-slider [images]="imageObject" #nav>
        </ng-image-slider>
        <button (click)="prevImageClick()">Prev</button>
        <button (click)="nextImageClick()">Next</button>
        `
})
class Sample {
    @ViewChild('nav') slider: NgImageSliderComponent;
    imageObject = [{...}]
  
    prevImageClick() {
        this.slider.prev();
    }
    
    nextImageClick() {
        this.slider.next();
    }
}
```

## License
As Angular itself, this module is released under the permissive [MIT license](http://revolunet.mit-license.org). 

Your contributions and suggestions are always welcome :)