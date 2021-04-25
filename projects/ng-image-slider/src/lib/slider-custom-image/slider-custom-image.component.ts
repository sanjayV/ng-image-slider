import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgImageSliderService } from './../ng-image-slider.service';

const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
    validFileExtensions = ['jpeg', 'jpg', 'gif', 'png'],
    validVideoExtensions = ['mp4'];

@Component({
    selector: 'custom-img',
    templateUrl: './slider-custom-image.component.html'
})
export class SliderCustomImageComponent implements OnChanges {
    YOUTUBE = 'youtube';
    IMAGE = 'image';
    VIDEO = 'video';
    fileUrl: SafeResourceUrl = '';
    fileExtension = '';
    type = this.IMAGE;
    imageLoading:boolean = true;

    // @inputs
    @Input() showVideo: boolean = false;
    @Input() videoAutoPlay: boolean = false;
    @Input() showVideoControls: number = 1;
    @Input() currentImageIndex: number;
    @Input() imageIndex: number;
    @Input() speed: number = 1;
    @Input() imageUrl;
    @Input() isVideo = false;
    @Input() alt: String = '';
    @Input() title: String = '';
    @Input() direction: string = 'ltr';
    @Input() ratio: boolean = false;
    @Input() lazy: boolean = false;

    constructor(
        public imageSliderService: NgImageSliderService,
        private sanitizer: DomSanitizer,
        @Inject(DOCUMENT) document) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.imageUrl
            && this.imageUrl
            && this.imageUrl
            && typeof (this.imageUrl) === 'string'
            && (
                (changes.imageUrl && changes.imageUrl.firstChange)
                ||
                (this.videoAutoPlay)
               )) {
            this.setUrl();
        }
    }

    setUrl() {
        const url = this.imageUrl;
        this.imageLoading = true;
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.fileExtension = url.split('.').pop().split(/\#|\?/)[0];
        if (this.imageSliderService.base64FileExtension(url)
        && (validFileExtensions.indexOf(this.imageSliderService.base64FileExtension(url).toLowerCase()) > -1 
        || validVideoExtensions.indexOf(this.imageSliderService.base64FileExtension(url).toLowerCase()) > -1)) {
            this.fileExtension = this.imageSliderService.base64FileExtension(url);
        }
        // verify for youtube url
        const match = url.match(youtubeRegExp);
        if (match && match[2].length === 11) {
            if (this.showVideo) {
                this.type = this.YOUTUBE;
                this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${'https://www.youtube.com/embed/'}${match[2]}${this.videoAutoPlay ? '?autoplay=1&enablejsapi=1' : '?autoplay=0&enablejsapi=1'}${'&controls='}${this.showVideoControls}`);
            } else {
                this.type = this.IMAGE;
                this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://img.youtube.com/vi/${match[2]}/0.jpg`);
            }
        } else if (this.fileExtension && validFileExtensions.indexOf(this.fileExtension.toLowerCase()) > -1) {
            this.type = this.IMAGE;
        } else if (this.fileExtension && validVideoExtensions.indexOf(this.fileExtension.toLowerCase()) > -1) {
            this.type = this.VIDEO;
            if (this.videoAutoPlay && document.getElementById(`video_${this.imageIndex}`)) {
                const videoObj:any = document.getElementById(`video_${this.imageIndex}`);
                setTimeout(() => {
                    videoObj.play();
                }, this.speed * 1000);
            }
        }
    }

    videoClickHandler(event) {
        if (event && event.srcElement && !this.showVideoControls) {
            if (event.srcElement.paused) {
                event.srcElement.play();
            } else {
                event.srcElement.pause();
            }
        }
    }
}
