# Angular Responsive Image Slider with Lightbox

An Angular 6 responsive image slider with image lightbox popup.

## Features!

  - Responsive
  - captures swipes from phones and tablets
  - Compatible with Angular Universal
  - Image lightbox popup

### Demo: https://ng-image-slider.herokuapp.com/


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
        thumbImage: 'assets/img/slider/1_min.jpeg'
    }, {
        image: 'assets/img/slider/2.jpg',
        thumbImage: 'assets/img/slider/2_min.jpeg'
    }
];
```

**ImageObject format with title**
 ```js
imageObject: Array<object> = [{
        image: 'assets/img/slider/1.jpg',
        thumbImage: 'assets/img/slider/1_min.jpeg',
        title: 'Your title will display on slider image.'
    },
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
| imageClick | @Output | n/a | Executes when click event on slider image. Return image index. | n/a |
| arrowClick | @Output | n/a | Executes when click on slider left/right arrow. | n/a |


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