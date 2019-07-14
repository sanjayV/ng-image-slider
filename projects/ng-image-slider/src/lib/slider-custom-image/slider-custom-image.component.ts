import {
    Component,
    OnInit,
    AfterViewInit,
    OnDestroy,
    Input
} from '@angular/core';
import { NgImageSliderService } from './../ng-image-slider.service';

const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
    validFileExtensions = ['jpeg', 'jpg', 'gif', 'png'],
    validVideoExtensions = ['mp4'];

@Component({
    selector: 'custom-img',
    templateUrl: './slider-custom-image.component.html'
})
export class SliderCustomImageComponent implements OnInit, AfterViewInit, OnDestroy {
    YOUTUBE = 'youtube';
    IMAGE = 'image';
    VIDEO = 'video';
    fileUrl = '';
    fileExtension = '';
    type = this.IMAGE;

    // @inputs
    @Input()
    set imageUrl(url) {
        if (url && typeof (url) === 'string') {
            this.fileUrl = url;
            this.fileExtension = url.replace(/^.*\./, '');
            if (this.imageSliderService.base64FileExtension(url) 
            && (validFileExtensions.indexOf(this.imageSliderService.base64FileExtension(url).toLowerCase()) > -1 
            || validVideoExtensions.indexOf(this.imageSliderService.base64FileExtension(url).toLowerCase()) > -1)) {
                this.fileExtension = this.imageSliderService.base64FileExtension(url);
            }
            // verify for youtube url
            const match = url.match(youtubeRegExp);
            if (match && match[2].length === 11) {
                this.type = this.YOUTUBE;
                this.fileUrl = `https://img.youtube.com/vi/${match[2]}/0.jpg`;
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

    constructor(public imageSliderService: NgImageSliderService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
    }
}
