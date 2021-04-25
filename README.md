# Angular Image Slider with Lightbox

An Angular responsive image slider with lightbox popup.
Also support youtube and mp4 video urls.

## Features!

  - Responsive (support images width and height in both % and px)
  - captures swipes from phones and tablets
  - Compatible with Angular Universal
  - Image lightbox popup
  - captures keyboard next/previous arrow key event for lightbox image move
  - Support Images (jpeg, jpg, gif, png and Base64-String), Youtube url and MP4 video (url and Base64-String)
  - Handling runtime image arraylist changes

### Demo: https://sanjayv.github.io/ng-image-slider/
##### code example:
##### Images: https://stackblitz.com/edit/ng-image-slider-demo
##### video: https://stackblitz.com/edit/ng-image-slider-video-demo


# Installation
`npm install ng-image-slider --save`

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
        alt: 'Image alt', //Optional: You can use this key if want to show image with alt
        order: 1 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
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

#### **Note :
For angular version 8 or less, use `"skipLibCheck": true` in `tsconfig.json` for prevent **ambient context** issue.
```js
"compilerOptions": {
    "skipLibCheck": true
}
```

## API Reference (optional) :

| Name | Type | Data Type | Description | Default |
|------|------|-----------|-------------|---------|
| infinite | @Input  | boolean   | Infinite sliding images if value is **true**. | false |
| imagePopup | @Input  | boolean | Enable image lightBox popup option on slider image click. | true |
| animationSpeed | @Input  | number | By this user can set slider animation speed. Minimum value is **0.1 second** and Maximum value is **5 second**. | 1 |
| slideImage | @Input | number | Set how many images will move on left/right arrow click. | 1 |
| imageSize | @Input | object | Set slider images width, height and space. space is use for set space between slider images. Pass object like `{width: '400px', height: '300px', space: 4}` or you can pass value in percentage `{width: '20%', height: '20%'}` OR set only space `{space: 4}` | `{width: 205, height: 200, space: 3}` |
| manageImageRatio | @Input | boolean | Show images with aspect ratio if value is `true` and set imageSize width and height on parent div | false |
| autoSlide | @Input | number/boolean/object | Auto slide images according provided time interval. Option will work only if **infinite** option is **true**. For number data type minimum value is 1 second and Maximum value is 5 second. By object data type you can prevent auto slide stop behaviour on mouse hover event. `{interval: 2, stopOnHover: false}` | 0 |
| showArrow | @Input | boolean | Hide/Show slider arrow buttons | true |
| arrowKeyMove | @Input | boolean | Disable slider and popup image left/right move on arrow key press event, if value is `false`  | true |
| videoAutoPlay | @Input | boolean | Auto play popup video | false |
| showVideoControls | @Input | boolean | Hide video control if value is `false` | true |
| direction | @Input | string | Set text direction. You can pass **rtl** / **ltr** / **auto** | ltr |
| slideOrderType | @Input | string | Arrange slider images in Ascending order by `ASC` and in Descending order by `DESC`. `order` key must be exist with image object. | ASC |
| lazyLoading | @Input | boolean | Lazy load images and Iframe if true. | false |
| defaultActiveImage | @Input | number | Set image as selected on load. | null |
| imageClick | @Output | n/a | Executes when click event on slider image. Return image index. | n/a |
| arrowClick | @Output | n/a | Executes when click on slider left/right arrow. Returns current event name and next/previous button disabled status. | n/a |
| lightboxClose | @Output | n/a | Executes when lightbox close. | n/a |
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
