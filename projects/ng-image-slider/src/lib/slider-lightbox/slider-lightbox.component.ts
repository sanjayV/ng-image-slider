import {
    ChangeDetectorRef,
    Component,
    OnInit,
    Inject,
    AfterViewInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    HostListener
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgImageSliderService } from './../ng-image-slider.service';

const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
    validFileExtensions = ['jpeg', 'jpg', 'gif', 'png'],
    validVideoExtensions = ['mp4'];

@Component({
    selector: 'slider-lightbox',
    templateUrl: './slider-lightbox.component.html'
})
export class SliderLightboxComponent implements OnInit, AfterViewInit, OnDestroy {

    YOUTUBE = 'youtube';
    IMAGE = 'image';
    VIDEO = 'video';
    INVALID = 'invalid';
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

    // @Output
    @Output() close = new EventEmitter<any>();
    /* @Output() prevImage = new EventEmitter<any>(); */
    /* @Output() nextImage = new EventEmitter<any>(); */

    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event && event.key) {
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
        if (this.currentImageIndex > 0 && !this.lightboxPrevDisable) {
            this.currentImageIndex--;
            //this.prevImage.emit();
            this.getImageData();
            this.nextPrevDisable();
        }
    }

    nextImageLightbox() {
        if (this.currentImageIndex < this.images.length - 1 && !this.lightboxNextDisable) {
            this.currentImageIndex++;
            //this.nextImage.emit();
            this.getImageData();
            this.nextPrevDisable();
        }
    }

    nextPrevDisable() {
        this.lightboxNextDisable = true;
        this.lightboxPrevDisable = true;
        //setTimeout(() => {
        this.applyButtonDisableCondition();
        //}, this.speed * 1000);
    }

    applyButtonDisableCondition() {
        this.lightboxNextDisable = false;
        this.lightboxPrevDisable = false;
        if (this.currentImageIndex >= this.images.length - 1) {
            this.lightboxNextDisable = true;
        }
        if (this.currentImageIndex <= 0) {
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
            for(let iframeI in this.document.getElementsByTagName("iframe")) {
                if (this.document.getElementsByTagName("iframe")[iframeI] && this.document.getElementsByTagName("iframe")[iframeI].contentWindow) {
                    this.document.getElementsByTagName("iframe")[iframeI].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                }
            }
            for(let videoI in this.document.getElementsByTagName("video")) {
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
