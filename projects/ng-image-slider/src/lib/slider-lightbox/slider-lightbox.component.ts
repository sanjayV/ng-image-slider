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
    HostListener
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { NgImageSliderService } from './../ng-image-slider.service';

const LIGHTBOX_NEXT_ARROW_CLICK_MESSAGE = 'lightbox next',
    LIGHTBOX_PREV_ARROW_CLICK_MESSAGE = 'lightbox previous';

@Component({
    selector: 'slider-lightbox',
    templateUrl: './slider-lightbox.component.html'
})
export class SliderLightboxComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    totalImages: number = 0;
    nextImageIndex: number = -1;
    popupWidth: number = 1200;
    marginLeft: number = 0;
    lightboxPrevDisable: boolean = false;
    lightboxNextDisable: boolean = false;
    showLoading: boolean = true;
    effectStyle: string = 'none';
    speed: number = 1; // default speed in second
    title: string = '';

    // @Inputs
    @Input() videoAutoPlay: boolean = false;
    @Input() currentImageIndex: number = 0;
    @Input() showImage;
    @Input() direction: string = 'ltr';
    @Input() images: Array<object> = [];
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

    // @Output
    @Output() close: EventEmitter<any> = new EventEmitter<any>();
    @Output() arrowClick: EventEmitter<any> = new EventEmitter<any>();

    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event && event.key && this.arrowKeyMove) {
            if (event.key.toLowerCase() === 'arrowright') {
                this.nextImageLightbox();
            }

            if (event.key.toLowerCase() === 'arrowleft') {
                this.prevImageLightbox();
            }
        }
    }

    constructor(
        private cdRef: ChangeDetectorRef,
        private sanitizer: DomSanitizer,
        public imageSliderService: NgImageSliderService,
        @Inject(DOCUMENT) private document: any) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.currentImageIndex
            && changes.currentImageIndex.hasOwnProperty('previousValue')
            && changes.currentImageIndex.hasOwnProperty('currentValue')
            && changes.currentImageIndex.previousValue != changes.images.currentValue) {
            this.nextPrevDisable();
        }
    }

    ngAfterViewInit() {
        this.getImageData();
        this.cdRef.detectChanges();
    }

    ngOnDestroy() {
        this.resetState();
    }

    closeLightbox() {
        this.close.emit();
    }

    prevImageLightbox() {
        if (this.infinite && this.currentImageIndex == 0) {
            this.currentImageIndex = this.images.length;
        }

        if (this.currentImageIndex > 0 && !this.lightboxPrevDisable) {
            this.currentImageIndex--;
            this.arrowClick.emit(LIGHTBOX_PREV_ARROW_CLICK_MESSAGE);
            this.getImageData();
            this.nextPrevDisable();
        }
    }

    nextImageLightbox() {
        if (this.infinite && this.currentImageIndex == this.images.length - 1) {
            this.currentImageIndex = -1;
        }

        if (this.currentImageIndex < this.images.length - 1 && !this.lightboxNextDisable) {
            this.currentImageIndex++;
            this.arrowClick.emit(LIGHTBOX_NEXT_ARROW_CLICK_MESSAGE);
            this.getImageData();
            this.nextPrevDisable();
        }
    }

    nextPrevDisable() {
        this.lightboxNextDisable = true;
        this.lightboxPrevDisable = true;
        this.applyButtonDisableCondition();
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
            for (let iframeI in this.document.getElementsByTagName("iframe")) {
                if (this.document.getElementsByTagName("iframe")[iframeI] && this.document.getElementsByTagName("iframe")[iframeI].contentWindow) {
                    this.document.getElementsByTagName("iframe")[iframeI].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                }
            }
            for (let videoI in this.document.getElementsByTagName("video")) {
                if (this.document.getElementsByTagName("video")[videoI] && this.document.getElementsByTagName("video")[videoI].pause) {
                    this.document.getElementsByTagName("video")[videoI].pause();
                }
            }
        }
    }

    resetState() {
        this.images = [];
    }
}
