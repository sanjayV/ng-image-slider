import {
    Component,
    OnInit,
    AfterViewInit,
    OnDestroy,
    Input
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgImageSliderService } from './../ng-image-slider.service';

const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
    validFileExtensions = ['jpeg', 'jpg', 'gif', 'png'],
    validVideoExtensions = ['mp4'];

@Component({
    selector: 'custom-img',
    templateUrl: './slider-custom-image.component.html'
})
export class SliderCustomImageComponent implements OnInit {
    YOUTUBE = 'youtube';
    IMAGE = 'image';
    VIDEO = 'video';
    fileUrl: SafeResourceUrl = '';
    fileExtension = '';
    type = this.IMAGE;

    // @inputs
    @Input() showVideo: boolean = false;
    @Input() videoAutoPlay: boolean = false;
    @Input()
    set imageUrl(url) {
        if (url && typeof (url) === 'string') {
            this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);;
            this.fileExtension = url.replace(/^.*\./, '');
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
                    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${'//www.youtube.com/embed/'}${match[2]}${this.videoAutoPlay ? '?autoplay=1&enablejsapi=1' : '?autoplay=0&enablejsapi=1'}`);
                } else {
                    this.type = this.IMAGE;
                    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://img.youtube.com/vi/${match[2]}/0.jpg`);
                }
            } else if (this.fileExtension && validFileExtensions.indexOf(this.fileExtension.toLowerCase()) > -1) {
                this.type = this.IMAGE;
            } else if (this.fileExtension && validVideoExtensions.indexOf(this.fileExtension.toLowerCase()) > -1) {
                this.type = this.VIDEO;
            }
        }
    }
    @Input() isVideo = false;
    @Input() alt: String = '';
    @Input() title: String = '';
    @Input() direction: string = 'ltr';
    @Input() ratio: boolean = false;

    constructor(public imageSliderService: NgImageSliderService, private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
    }
}
