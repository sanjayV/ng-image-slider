import {
    ChangeDetectorRef,
    Component,
    OnInit,
    OnChanges,
    DoCheck,
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
import { NgImageSliderService } from './ng-image-slider.service';

const NEXT_ARROW_CLICK_MESSAGE = 'next',
    PREV_ARROW_CLICK_MESSAGE = 'previous';

@Component({
    selector: 'ng-image-slider',
    templateUrl: './ng-image-slider.component.html',
    styleUrls: ['./ng-image-slider.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NgImageSliderComponent implements OnChanges, OnInit, DoCheck, AfterViewInit, OnDestroy {
    // for slider
    sliderMainDivWidth: number = 0;
    imageParentDivWidth: number = 0;
    imageObj: Array<object> = [];
    ligthboxImageObj: Array<object> = [];
    totalImages: number = 0;
    leftPos: number = 0;
    effectStyle: string = 'all 1s ease-in-out';
    speed: number = 1; // default speed in second
    sliderPrevDisable: boolean = false;
    sliderNextDisable: boolean = false;
    slideImageCount: number = 1;
    sliderImageWidth: number = 205;
    sliderImageReceivedWidth: number | string = 205;
    sliderImageHeight: number = 200;
    sliderImageReceivedHeight: number | string = 205;
    sliderImageSizeWithPadding = 211;
    autoSlideCount: number = 0;
    stopSlideOnHover: boolean = true;
    autoSlideInterval;
    showArrowButton: boolean = true;
    textDirection: string = 'ltr';
    imageMargin: number = 3;
    sliderOrderType:string ='ASC';

    // for swipe event
    private swipeCoord?: [number, number];
    private swipeTime?: number;

    // for lightbox
    ligthboxShow: boolean = false;
    activeImageIndex: number = -1;
    visiableImageIndex: number = 0;

    @ViewChild('sliderMain', { static: false }) sliderMain;
    @ViewChild('imageDiv', { static: false }) imageDiv;

    // @inputs
    @Input()
    set imageSize(data) {
        if (data
            && typeof (data) === 'object') {
            if (data.hasOwnProperty('space') && typeof (data['space']) === 'number' && data['space'] > -1) {
                this.imageMargin = data['space'];
            }
            if (data.hasOwnProperty('width') && (typeof (data['width']) === 'number' || typeof (data['width']) === 'string')) {
                this.sliderImageReceivedWidth = data['width'];
                // this.sliderImageSizeWithPadding = data['width'] + (this.imageMargin * 2); // addeing padding with image width
            }
            if (data.hasOwnProperty('height') && (typeof (data['height']) === 'number' || typeof (data['height']) === 'string')) {
                this.sliderImageReceivedHeight = data['height'];
            }
        }
    }
    @Input() infinite: boolean = false;
    @Input() imagePopup: boolean = true;
    @Input()
    set direction(dir: string) {
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
    @Input() images: Array<object> = [];
    @Input() set slideImage(count) {
        if (count && typeof count === 'number') {
            this.slideImageCount = Math.round(count);
        }
    }
    @Input() set autoSlide(count: any) {
        if (count && (typeof count === 'number'
            || typeof count === 'boolean'
            || typeof count === 'object')) {
            if (typeof count === 'number' && count >= 1 && count <= 5) {
                count = Math.round(count);
            } else if (typeof count === 'boolean') {
                count = 1;
            } else if (typeof count === 'object'
                && count.hasOwnProperty('interval')
                && Math.round(count['interval'])
                && Math.round(count['interval']) >= 1
                && Math.round(count['interval']) <= 5) {
                this.stopSlideOnHover = count.hasOwnProperty('stopOnHover') ? count['stopOnHover'] : true;
                count = Math.round(count['interval']);
            }
            this.autoSlideCount = count * 1000;
        }
    }
    @Input() set showArrow(flag) {
        if (flag !== undefined && typeof flag === 'boolean') {
            this.showArrowButton = flag;
        }
    }

    @Input() set orderType(data:string){
        if (data !== undefined && typeof data === 'string') {
            this.sliderOrderType = data.toUpperCase();
        }
    }
    @Input() videoAutoPlay: boolean = false;
    @Input() paginationShow: boolean = false;
    @Input() arrowKeyMove: boolean = true;
    @Input() manageImageRatio: boolean = false;
    @Input() showVideoControls: boolean = true;
    @Input() set defaultActiveImage(activeIndex: number) {
        if (typeof activeIndex === 'number' && activeIndex > -1) {
            this.activeImageIndex = activeIndex;
        }
    }
    @Input() lazyLoading: boolean = false;

    // @Outputs
    @Output() imageClick = new EventEmitter<number>();
    @Output() arrowClick = new EventEmitter<object>();
    @Output() lightboxArrowClick = new EventEmitter<object>();
    @Output() lightboxClose = new EventEmitter<object>();

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.setSliderWidth();
    }
    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event && event.key) {
            if (event.key.toLowerCase() === 'arrowright' && !this.ligthboxShow && this.arrowKeyMove) {
                this.next();
            }

            if (event.key.toLowerCase() === 'arrowleft' && !this.ligthboxShow && this.arrowKeyMove) {
                this.prev();
            }

            if (event.key.toLowerCase() === 'escape' && this.ligthboxShow) {
                this.close();
            }
        }
    }

    constructor(
        private cdRef: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: Object,
        public imageSliderService: NgImageSliderService,
        private elRef: ElementRef
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
        if (this.ligthboxShow === true) {
            this.close();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.images
            && changes.images.hasOwnProperty('previousValue')
            && changes.images.hasOwnProperty('currentValue')
            && changes.images.previousValue != changes.images.currentValue) {
            this.setSliderImages(changes.images.currentValue);
        }
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

    ngDoCheck() {
        if (this.images
            && this.ligthboxImageObj
            && this.images.length !== this.ligthboxImageObj.length) {
            this.setSliderImages(this.images);
        }
    }

    setSliderImages(imgObj) {
        if (imgObj && imgObj instanceof Array && imgObj.length) {
            const sliderOrderEnable = imgObj.find((img) => {
                if (img.hasOwnProperty('order')) {
                    return true
                }
            });

            if(sliderOrderEnable){
                imgObj = this.imageSliderService.orderArray(imgObj, this.sliderOrderType.toUpperCase());
            }

            this.imageObj = imgObj.map((img, index) => {
                img['index'] = index;
                return img;
            });
            this.ligthboxImageObj = [...this.imageObj];
            this.totalImages = this.imageObj.length;
            // this.imageParentDivWidth = imgObj.length * this.sliderImageSizeWithPadding;
            this.setSliderWidth();
        }
    }

    setSliderWidth() {
        if (this.sliderMain
            && this.sliderMain.nativeElement
            && this.sliderMain.nativeElement.offsetWidth) {
            this.sliderMainDivWidth = this.sliderMain.nativeElement.offsetWidth;
        }

        if (this.sliderMainDivWidth
            && this.sliderImageReceivedWidth) {
            if (typeof this.sliderImageReceivedWidth === 'number') {
                this.sliderImageWidth = this.sliderImageReceivedWidth;
            } else if (typeof this.sliderImageReceivedWidth === 'string') {
                if (this.sliderImageReceivedWidth.indexOf('px') >= 0) {
                    this.sliderImageWidth = parseFloat(this.sliderImageReceivedWidth);
                } else if (this.sliderImageReceivedWidth.indexOf('%') >= 0) {
                    this.sliderImageWidth = +((this.sliderMainDivWidth * parseFloat(this.sliderImageReceivedWidth)) / 100).toFixed(2);
                } else if (parseFloat(this.sliderImageReceivedWidth)) {
                    this.sliderImageWidth = parseFloat(this.sliderImageReceivedWidth);
                }
            }
        }

        if (window && window.innerHeight
            && this.sliderImageReceivedHeight) {
            if (typeof this.sliderImageReceivedHeight === 'number') {
                this.sliderImageHeight = this.sliderImageReceivedHeight;
            } else if (typeof this.sliderImageReceivedHeight === 'string') {
                if (this.sliderImageReceivedHeight.indexOf('px') >= 0) {
                    this.sliderImageHeight = parseFloat(this.sliderImageReceivedHeight);
                } else if (this.sliderImageReceivedHeight.indexOf('%') >= 0) {
                    this.sliderImageHeight = +((window.innerHeight * parseFloat(this.sliderImageReceivedHeight)) / 100).toFixed(2);
                } else if (parseFloat(this.sliderImageReceivedHeight)) {
                    this.sliderImageHeight = parseFloat(this.sliderImageReceivedHeight);
                }
            }
        }
        this.sliderImageSizeWithPadding = this.sliderImageWidth + (this.imageMargin * 2);
        this.imageParentDivWidth = this.imageObj.length * this.sliderImageSizeWithPadding;
        if (this.imageDiv && this.imageDiv.nativeElement && this.imageDiv.nativeElement.offsetWidth) {
            this.leftPos = this.infinite ? -1 * this.sliderImageSizeWithPadding * this.slideImageCount : 0;
        }
        this.nextPrevSliderButtonDisable();
    }

    imageOnClick(index) {
        this.activeImageIndex = index;
        if (this.imagePopup) {
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

            //this.arrowClick.emit(PREV_ARROW_CLICK_MESSAGE);
            this.sliderArrowDisableTeam(PREV_ARROW_CLICK_MESSAGE);
            this.getVisiableIndex();
        }
    }

    next() {
        if (!this.sliderNextDisable) {
            if (this.infinite) {
                this.infiniteNextImg();
            } else {
                this.nextImg();
            }

            //this.arrowClick.emit(NEXT_ARROW_CLICK_MESSAGE);
            this.sliderArrowDisableTeam(NEXT_ARROW_CLICK_MESSAGE);
            this.getVisiableIndex();
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

    getVisiableIndex() {
        const currentIndex = Math.round((Math.abs(this.leftPos) + this.sliderImageWidth) / this.sliderImageWidth);
        if (this.imageObj[currentIndex - 1] && this.imageObj[currentIndex - 1]['index'] !== undefined) {
            this.visiableImageIndex = this.imageObj[currentIndex - 1]['index'];
        }
    }

    /**
     * Disable slider left/right arrow when image moving
     */
    sliderArrowDisableTeam(msg) {
        this.sliderNextDisable = true;
        this.sliderPrevDisable = true;
        setTimeout(() => {
            this.nextPrevSliderButtonDisable(msg);
        }, this.speed * 1000);
    }

    nextPrevSliderButtonDisable(msg?) {
        this.sliderNextDisable = false;
        this.sliderPrevDisable = false;
        const actionMsg = {};
        if (!this.infinite) {
            if (this.imageParentDivWidth + this.leftPos <= this.sliderMainDivWidth) {
                this.sliderNextDisable = true;
            }

            if (this.leftPos >= 0) {
                this.sliderPrevDisable = true;
            }

            actionMsg['prevDisable'] = this.sliderPrevDisable;
            actionMsg['nextDisable'] = this.sliderNextDisable;
        } 
        
        if (msg){
            this.arrowClick.emit({
                action: msg,
                ...actionMsg
            });
        }
    }

    // for lightbox
    showLightbox() {
        if (this.imageObj.length) {
            this.imageMouseEnterHandler();
            this.ligthboxShow = true;
            this.elRef.nativeElement.ownerDocument.body.style.overflow = 'hidden';
        }
    }

    close() {
        this.ligthboxShow = false;
        this.elRef.nativeElement.ownerDocument.body.style.overflow = '';
        this.lightboxClose.emit()
        this.imageAutoSlide();
    }

    lightboxArrowClickHandler(event) {
        this.lightboxArrowClick.emit(event);
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
