import {
    ChangeDetectorRef,
    Component,
    OnInit,
    OnChanges,
    SimpleChanges,
    Inject,
    AfterViewInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    HostListener,
    ElementRef
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

const LIGHTBOX_NEXT_ARROW_CLICK_MESSAGE = 'lightbox next',	
    LIGHTBOX_PREV_ARROW_CLICK_MESSAGE = 'lightbox previous'

@Component({
    selector: 'slider-lightbox',
    templateUrl: './slider-lightbox.component.html'
})
export class SliderLightboxComponent implements OnInit, AfterViewInit, OnDestroy {
    totalImages: number = 0;
    nextImageIndex: number = -1;
    popupWidth: number = 1200;
    marginLeft: number = 0;
    imageFullscreenView: boolean = false;
    lightboxPrevDisable: boolean = false;
    lightboxNextDisable: boolean = false;
    showLoading: boolean = true;
    effectStyle: string = 'none';
    speed: number = 1; // default speed in second
    title: string = '';
    currentImageIndex: number = 0;

    // for swipe event
    private swipeLightboxImgCoord?: [number, number];
    private swipeLightboxImgTime?: number;

    @ViewChild('lightboxDiv', { static: false }) lightboxDiv;
    @ViewChild('lightboxImageDiv', { static: false }) lightboxImageDiv;

    // @Inputs
    @Input() images: Array<object> = [];
    @Input()
    set imageIndex(index: number) {
        if (index !== undefined && index > -1 && index < this.images.length) {
            this.currentImageIndex = index;
        }
        this.nextPrevDisable();
    }
    @Input()
    set show(visiableFlag: boolean) {
        this.imageFullscreenView = visiableFlag;
        this.elRef.nativeElement.ownerDocument.body.style.overflow = '';
        if (visiableFlag === true) {
            this.elRef.nativeElement.ownerDocument.body.style.overflow = 'hidden';
            // this.getImageData();
            this.setPopupSliderWidth();
        }
    }
    @Input() videoAutoPlay: boolean = false;
    @Input() direction: string = 'ltr';
    @Input() paginationShow: boolean = false;
    @Input()
    set animationSpeed(data: number) {
        if (data
            && typeof (data) === 'number'
            && data >= 0.1
            && data <= 5) {
            this.speed = data;
        }
    }
    @Input() infinite: boolean = false;
    @Input() arrowKeyMove: boolean = true;
    @Input() showVideoControls: boolean = true;

    // @Output
    @Output() close = new EventEmitter<any>();
    @Output() prevImage = new EventEmitter<any>();
    @Output() nextImage = new EventEmitter<any>();

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.effectStyle = 'none';
        this.setPopupSliderWidth();
    }
    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event && event.key && this.arrowKeyMove) {
            if (event.key.toLowerCase() === 'arrowright') {
                this.nextImageLightbox();
            }

            if (event.key.toLowerCase() === 'arrowleft') {
                this.prevImageLightbox();
            }

            if (event.key.toLowerCase() === 'escape') {
                this.closeLightbox();
            }
        }
    }

    constructor(
        private cdRef: ChangeDetectorRef,
        private sanitizer: DomSanitizer,
        private elRef: ElementRef,
        @Inject(DOCUMENT) private document: any) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        this.resetState();
    }

    setPopupSliderWidth() {
        if (window && window.innerWidth) {
            this.popupWidth = window.innerWidth;
            this.totalImages = this.images.length;
            if (typeof (this.currentImageIndex) === 'number' && this.currentImageIndex !== undefined) {
                this.marginLeft = -1 * this.popupWidth * this.currentImageIndex;
                this.getImageData();
                this.nextPrevDisable();
                setTimeout(() => {
                    this.showLoading = false;
                }, 500);
            }
        }
    }

    closeLightbox() {
        this.close.emit();
    }

    prevImageLightbox() {
        this.effectStyle = `all ${this.speed}s ease-in-out`;
        if (this.currentImageIndex > 0 && !this.lightboxPrevDisable) {
            this.currentImageIndex--;
            this.prevImage.emit(LIGHTBOX_PREV_ARROW_CLICK_MESSAGE);
            this.marginLeft = -1 * this.popupWidth * this.currentImageIndex;
            this.getImageData();
            this.nextPrevDisable();
        }
    }

    nextImageLightbox() {
        this.effectStyle = `all ${this.speed}s ease-in-out`;
        if (this.currentImageIndex < this.images.length - 1 && !this.lightboxNextDisable) {
            this.currentImageIndex++;
            this.nextImage.emit(LIGHTBOX_NEXT_ARROW_CLICK_MESSAGE);
            this.marginLeft = -1 * this.popupWidth * this.currentImageIndex;
            this.getImageData();
            this.nextPrevDisable();
        }
    }

    nextPrevDisable() {
        this.lightboxNextDisable = true;
        this.lightboxPrevDisable = true;
        setTimeout(() => {
            this.applyButtonDisableCondition();
        }, this.speed * 1000);
    }

    applyButtonDisableCondition() {
        this.lightboxNextDisable = false;
        this.lightboxPrevDisable = false;
        if (!this.infinite && this.currentImageIndex >= this.images.length - 1) {
            this.lightboxNextDisable = true;
        }
        if (!this.infinite && this.currentImageIndex <= 0) {
            this.lightboxPrevDisable = true;
        }
    }

    getImageData() {
        if (this.images
            && this.images.length
            && typeof (this.currentImageIndex) === 'number'
            && this.currentImageIndex !== undefined
            && this.images[this.currentImageIndex]
            && (this.images[this.currentImageIndex]['image'] || this.images[this.currentImageIndex]['video'])) {
            this.title = this.images[this.currentImageIndex]['title'] || '';
            this.totalImages = this.images.length;
            for (const iframeI in this.document.getElementsByTagName('iframe')) {
                if (this.document.getElementsByTagName('iframe')[iframeI]
                    && this.document.getElementsByTagName('iframe')[iframeI].contentWindow
                    && this.document.getElementsByTagName('iframe')[iframeI].contentWindow.postMessage) {
                    this.document.getElementsByTagName('iframe')[iframeI].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                }
            }
            for (const videoI in this.document.getElementsByTagName('video')) {
                if (this.document.getElementsByTagName('video')[videoI] && this.document.getElementsByTagName('video')[videoI].pause) {
                    this.document.getElementsByTagName('video')[videoI].pause();
                }
            }
        }
    }

    resetState() {
        this.images = [];
    }

    /**
     * Swipe event handler
     * Reference from https://stackoverflow.com/a/44511007/2067646
     */
    swipeLightboxImg(e: TouchEvent, when: string): void {
        const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        const time = new Date().getTime();

        if (when === 'start') {
            this.swipeLightboxImgCoord = coord;
            this.swipeLightboxImgTime = time;
        } else if (when === 'end') {
            const direction = [coord[0] - this.swipeLightboxImgCoord[0], coord[1] - this.swipeLightboxImgCoord[1]];
            const duration = time - this.swipeLightboxImgTime;

            if (duration < 1000 //
                && Math.abs(direction[0]) > 30 // Long enough
                && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
                if (direction[0] < 0) {
                    this.nextImageLightbox();
                } else {
                    this.prevImageLightbox();
                }
            }
        }
    }
}
