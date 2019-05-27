import {
    ChangeDetectorRef,
    Component,
    OnInit,
    OnChanges,
    SimpleChanges,
    SimpleChange,
    AfterViewInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation,
    ViewChild,
    HostListener,
    PLATFORM_ID,
    Inject,
    ElementRef
} from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

const NEXT_ARROW_CLICK_MESSAGE = 'next',
    PREV_ARROW_CLICK_MESSAGE = 'previous',
    LIGHTBOX_NEXT_ARROW_CLICK_MESSAGE = 'lightbox next',
    LIGHTBOX_PREV_ARROW_CLICK_MESSAGE = 'lightbox previous',
    youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
    validFileExtensions = ['jpeg', 'jpg', 'gif', 'png'],
    validVideoExtensions = ['mp4'];

@Component({
    selector: 'ng-image-slider',
    templateUrl: './ng-image-slider.component.html',
    styleUrls: ['./ng-image-slider.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NgImageSliderComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
    // for slider
    sliderMainDivWidth: number = 0;
    imageParentDivWidth: number = 0;
    imageObj: Array<object> = [];
    leftPos: number = 0;
    effectStyle: string = 'all 1s ease-in-out';
    speed: number = 1; // default speed in second
    sliderPrevDisable: boolean = false;
    sliderNextDisable: boolean = false;
    slideImageCount: number = 1;
    sliderImageWidth: number = 205;
    sliderImageHeight: number = 200;
    sliderImageSizeWithPadding = 211;
    autoSlideCount: number = 0;
    autoSlideInterval;
    showArrowButton: boolean = true;
    textDirection: string = 'ltr';

    // for swipe event
    private swipeCoord?: [number, number];
    private swipeTime?: number;

    @ViewChild('sliderMain') sliderMain;
    @ViewChild('imageDiv') imageDiv;

    // @inputs
    @Input()
    set imageSize(data) {
        if (data
            && typeof (data) === 'object') {
            if (data.hasOwnProperty('width') && typeof (data['width']) === 'number') {
                this.sliderImageWidth = data['width'];
                this.sliderImageSizeWithPadding = data['width'] + 6; // addeing padding with image width
            }
            if (data.hasOwnProperty('height') && typeof (data['height']) === 'number') {
                this.sliderImageHeight = data['height'];
            }
        }
    }
    @Input() infinite: boolean = false;
    @Input() imagePopup: boolean = true;
    @Input()
    set direction(dir: string)  {
        if (dir) {
            this.textDirection = dir;
        }
    }
    @Input()
    set animationSpeed(data: number) {
        if (data
            && typeof (data) === 'number'
            && data >= 0.1
            && data <= 5) {
            this.speed = data;
            this.effectStyle = `all ${this.speed}s ease-in-out`;
        }
    }
    @Input() set images(imgObj) {
        if (imgObj && imgObj.length) {
            this.imageObj = imgObj;
            this.imageParentDivWidth = imgObj.length * this.sliderImageSizeWithPadding;
        }
    }
    @Input() set slideImage(count) {
        if (count && typeof count === 'number') {
            this.slideImageCount = Math.round(count);
        }
    }
    @Input() set autoSlide(count) {
        if (count && typeof count === 'number' && count >= 1 && count <= 5) {
            this.autoSlideCount = Math.round(count) * 1000;
        }
    }
    @Input() set showArrow(flag) {
        if (flag !== undefined && typeof flag === 'boolean') {
            this.showArrowButton = flag;
        }
    }

    // @Outputs
    @Output() imageClick = new EventEmitter<number>();
    @Output() arrowClick = new EventEmitter<string>();
    @Output() lightboxArrowClick = new EventEmitter<object>();

    // for lightbox
    currentImageSrc: string;
    currentImageTitle = '';
    ligthboxShow: boolean = false;
    activeImageIndex: number = 0;
    lightboxNextDisable: boolean = false;
    lightboxPrevDisable: boolean = false;
    showImage: boolean = true;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.setSliderWidth();
    }
    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event && event.key) {
            if (event.key.toLowerCase() === 'arrowright' && this.ligthboxShow) {
                this.nextImage();
            }

            if (event.key.toLowerCase() === 'arrowleft' && this.ligthboxShow) {
                this.prevImage();
            }

            if (event.key.toLowerCase() === 'escape' && this.ligthboxShow) {
                this.close();
            }
        }
    }

    constructor(
        private cdRef: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: Object,
        // @Inject(ElementRef) private _elementRef: ElementRef
    ) {
    }

    ngOnInit() {
        // @TODO: for future use
        // console.log(this._elementRef)

        // for slider
        if (this.infinite) {
            this.effectStyle = 'none';
            this.leftPos = -1 * this.sliderImageSizeWithPadding * this.slideImageCount;
            for (let i = 1; i <= this.slideImageCount; i++) {
                this.imageObj.unshift(this.imageObj[this.imageObj.length - i]);
            }
        }
    }

    // for slider
    ngAfterViewInit() {
        this.setSliderWidth();
        this.cdRef.detectChanges();
        if (isPlatformBrowser(this.platformId)) {
            this.imageAutoSlide();
        }
    }

    ngOnDestroy() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes.imageSize) {
            const size: SimpleChange = changes.imageSize;
            if (size
                && size.previousValue
                && size.currentValue
                && size.previousValue.width && size.previousValue.height
                && size.currentValue.width && size.currentValue.height
                && (size.previousValue.width !== size.currentValue.width
                    || size.previousValue.height !== size.currentValue.height)) {
                this.setSliderWidth();
            }
        }
    }

    setSliderWidth() {
        if (this.imageDiv.nativeElement.offsetWidth) {
            this.imageParentDivWidth = this.imageObj.length * this.sliderImageSizeWithPadding;
            this.leftPos = this.infinite ? -1 * this.sliderImageSizeWithPadding * this.slideImageCount : 0;
        }
        if (this.sliderMain.nativeElement.offsetWidth) {
            this.sliderMainDivWidth = this.sliderMain.nativeElement.offsetWidth;
        }
        this.nextPrevSliderButtonDisable();
    }

    imageOnClick(index) {
        if (this.imagePopup) {
            this.activeImageIndex = index;
            this.showLightbox();
        }
        this.imageClick.emit(index);
    }

    imageAutoSlide() {
        if (this.infinite && this.autoSlideCount && !this.ligthboxShow) {
            this.autoSlideInterval = setInterval(() => {
                this.next();
            }, this.autoSlideCount);
        }
    }

    imageMouseEnterHandler() {
        if (this.infinite && this.autoSlideCount && this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }

    prev() {
        if (!this.sliderPrevDisable) {
            if (this.infinite) {
                this.infinitePrevImg();
            } else {
                this.prevImg();
            }

            this.arrowClick.emit(PREV_ARROW_CLICK_MESSAGE);
            this.sliderArrowDisableTeam();
        }
    }

    next() {
        if (!this.sliderNextDisable) {
            if (this.infinite) {
                this.infiniteNextImg();
            } else {
                this.nextImg();
            }

            this.arrowClick.emit(NEXT_ARROW_CLICK_MESSAGE);
            this.sliderArrowDisableTeam();
        }
    }

    prevImg() {
        if (0 >= this.leftPos + (this.sliderImageSizeWithPadding * this.slideImageCount)) {
            this.leftPos += this.sliderImageSizeWithPadding * this.slideImageCount;
        } else {
            this.leftPos = 0;
        }
    }

    nextImg() {
        if ((this.imageParentDivWidth + this.leftPos) - this.sliderMainDivWidth > this.sliderImageSizeWithPadding * this.slideImageCount) {
            this.leftPos -= this.sliderImageSizeWithPadding * this.slideImageCount;
        } else if ((this.imageParentDivWidth + this.leftPos) - this.sliderMainDivWidth > 0) {
            this.leftPos -= (this.imageParentDivWidth + this.leftPos) - this.sliderMainDivWidth;
        }
    }

    infinitePrevImg() {
        this.effectStyle = `all ${this.speed}s ease-in-out`;
        this.leftPos = 0;

        setTimeout(() => {
            this.effectStyle = 'none';
            this.leftPos = -1 * this.sliderImageSizeWithPadding * this.slideImageCount;
            for (let i = 0; i < this.slideImageCount; i++) {
                this.imageObj.unshift(this.imageObj[this.imageObj.length - this.slideImageCount - 1]);
                this.imageObj.pop();
            }
        }, this.speed * 1000);
    }

    infiniteNextImg() {
        this.effectStyle = `all ${this.speed}s ease-in-out`;
        this.leftPos = -2 * this.sliderImageSizeWithPadding * this.slideImageCount;
        setTimeout(() => {
            this.effectStyle = 'none';
            for (let i = 0; i < this.slideImageCount; i++) {
                this.imageObj.push(this.imageObj[this.slideImageCount]);
                this.imageObj.shift();
            }
            this.leftPos = -1 * this.sliderImageSizeWithPadding * this.slideImageCount;
        }, this.speed * 1000);
    }

    /**
     * Disable slider left/right arrow when image moving
     */
    sliderArrowDisableTeam() {
        this.sliderNextDisable = true;
        this.sliderPrevDisable = true;
        setTimeout(() => {
            this.nextPrevSliderButtonDisable();
        }, this.speed * 1000);
    }

    nextPrevSliderButtonDisable() {
        this.sliderNextDisable = false;
        this.sliderPrevDisable = false;
        if (!this.infinite) {
            if (this.imageParentDivWidth + this.leftPos <= this.sliderMainDivWidth) {
                this.sliderNextDisable = true;
            }

            if (this.leftPos >= 0) {
                this.sliderPrevDisable = true;
            }
        }
    }

    // for lightbox
    showLightbox() {
        if (this.imageObj.length && (this.imageObj[0]['image'] || this.imageObj[0]['video'])) {
            let imageSrc = this.imageObj[0]['image'] || this.imageObj[0]['video'],
                imageTitle = this.imageObj[0]['title'] || '';
            if (this.imageObj[this.activeImageIndex]) {
                imageSrc = this.imageObj[this.activeImageIndex]['image'] || this.imageObj[this.activeImageIndex]['video'];
                imageTitle = this.imageObj[this.activeImageIndex]['title'] || '';
            }
            this.getImage(imageSrc, imageTitle);
            this.nextPrevLigthboxButtonDisable();
            this.imageMouseEnterHandler();
            this.ligthboxShow = true;
        }
    }

    nextImage() {
        if (this.infinite && this.activeImageIndex + 1 >= this.imageObj.length) {
            this.activeImageIndex = 0;
        }

        if (this.activeImageIndex + 1 < this.imageObj.length
            && this.imageObj[this.activeImageIndex + 1]
            && (this.imageObj[this.activeImageIndex + 1]['image']
                || this.imageObj[this.activeImageIndex + 1]['video'])) {
            this.activeImageIndex++;
            const imageSrc = this.imageObj[this.activeImageIndex]['image'] || this.imageObj[this.activeImageIndex]['video'];
            const imageTitle = this.imageObj[this.activeImageIndex]['title'] || '';
            this.getImage(imageSrc, imageTitle);
            this.nextPrevLigthboxButtonDisable();
            this.lightboxArrowClick.emit({
                message: LIGHTBOX_NEXT_ARROW_CLICK_MESSAGE,
                index: this.activeImageIndex
            });
        }
    }

    prevImage() {
        if (this.infinite && this.activeImageIndex - 1 <= 0) {
            this.activeImageIndex = this.imageObj.length;
        }

        if (this.activeImageIndex - 1 > -1
            && this.imageObj[this.activeImageIndex - 1]
            && (this.imageObj[this.activeImageIndex - 1]['image']
                || this.imageObj[this.activeImageIndex - 1]['video'])) {
            this.activeImageIndex--;
            const imageSrc = this.imageObj[this.activeImageIndex]['image'] || this.imageObj[this.activeImageIndex]['video'];
            const imageTitle = this.imageObj[this.activeImageIndex]['title'] || '';
            this.getImage(imageSrc, imageTitle);
            this.nextPrevLigthboxButtonDisable();
            this.lightboxArrowClick.emit({
                message: LIGHTBOX_PREV_ARROW_CLICK_MESSAGE,
                index: this.activeImageIndex
            });
        }
    }

    nextPrevLigthboxButtonDisable() {
        this.lightboxNextDisable = false;
        this.lightboxPrevDisable = false;
        if (!this.infinite) {
            if (this.activeImageIndex >= this.imageObj.length - 1) {
                this.lightboxNextDisable = true;
            }

            if (this.activeImageIndex <= 0) {
                this.lightboxPrevDisable = true;
            }
        }
    }

    close() {
        this.ligthboxShow = false;
        this.imageAutoSlide();
    }

    getImage(url, title = '') {
        const self = this;
        this.currentImageSrc = '';
        this.showImage = false;
        if (url) {
            const fileExtension = url.replace(/^.*\./, '');
            // verify for youtube and video url
            const match = url.match(youtubeRegExp);
            if ((match && match[2].length === 11)
                || (fileExtension && validVideoExtensions.indexOf(fileExtension.toLowerCase()) > -1)) {
                this.currentImageSrc = url;
                this.currentImageTitle = title;
                this.showImage = true;
            } else if (fileExtension && validFileExtensions.indexOf(fileExtension.toLowerCase()) > -1) {
                const image = new Image();
                image.onload = function () {
                    setTimeout(() => {
                        self.currentImageSrc = url;
                        self.currentImageTitle = title;
                        self.showImage = true;
                    }, 0);
                };
                image.src = url;
            }
        }
    }

    /**
     * Swipe event handler
     * Reference from https://stackoverflow.com/a/44511007/2067646
     */
    swipe(e: TouchEvent, when: string): void {
        const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        const time = new Date().getTime();

        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
        } else if (when === 'end') {
            const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
            const duration = time - this.swipeTime;

            if (duration < 1000 //
                && Math.abs(direction[0]) > 30 // Long enough
                && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
                if (direction[0] < 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        }
    }
}
