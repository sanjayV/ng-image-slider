import {
    ChangeDetectorRef,
    Component,
    OnInit,
    AfterViewInit,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation,
    ViewChild,
    HostListener
} from '@angular/core';

@Component({
    selector: 'ng-image-slider',
    template: `
    <div class="ng-image-slider">
        <div class="container">
            <div class="main" #sliderMain>
                <div
                    class="main-inner"
                    [ngStyle]="{'margin-left':leftPos+'px', 'width':imageParentDivWidth+'px', 'transition': effectStyle}">
                    <div
                        [ngClass]="{'image-popup': imagePopup}"
                        class="img-div"
                        *ngFor="let img of imageObj; let i = index" (click)="imageOnClick(i)" 
                        #imageDiv>
                        <img class="img-fluid" [src]="img.thumbImage" />
                    </div>
                </div>
                <a [ngClass]="{'disable': sliderPrevDisable}" class="prev icons prev-icon" (click)="prev()">&lsaquo;</a>
                <a [ngClass]="{'disable': sliderNextDisable}" class="next icons next-icon" (click)="next()">&rsaquo;</a>
            </div>
        </div>
    </div>
    <div class="img-lightbox" *ngIf="ligthboxShow">
        <div class="lightbox-wrapper">
            <div class="lightbox-div" >
                <div class="pre-loader">
                    <div class="mnml-spinner"></div>
                </div>
                <a class="close" (click)="close()">&times;</a>
                <img *ngIf="currentImageSrc" [ngClass]="{'show': showImage, 'hide': !showImage}" [src]="currentImageSrc">
                <a [ngClass]="{'disable': lightboxPrevDisable}" class="prev icons prev-icon" (click)="prevImage()">&lsaquo;</a>
                <a [ngClass]="{'disable': lightboxNextDisable}" class="next icons next-icon" (click)="nextImage()">&rsaquo;</a>
            </div>
        </div>
    </div>
    `,
    styleUrls: ['./ng-image-slider.component.scss']
})
export class NgImageSliderComponent implements OnInit {
    // for slider
    sliderMainDivWidth: number = 0;
    imageParentDivWidth: number = 0;
    totalImageCount: number = 0;
    imageObj: Array<object> = [];
    leftPos: number = 0;
    effectStyle: string = 'all 1s ease-in-out';
    speed: number = 1; // default speed in second
    sliderPrevDisable: boolean = false;
    sliderNextDisable: boolean = false;
    @ViewChild('sliderMain') sliderMain;
    @Input() imageSize: number = 211;
    @Input() imageShowCount: number = 3;
    @Input() infinite: boolean = false;
    @Input() imagePopup: boolean = true;
    @Input()
    set animationSpeed(data: number) {
        if (data
            && typeof (data) === 'number'
            && data >= 1
            && data <= 5) {
            this.speed = Math.floor(data);
        }
    }
    @Input() set images(imgObj) {
        if (imgObj && imgObj.length) {
            this.imageObj = imgObj;
            this.totalImageCount = imgObj.length - this.imageShowCount; // total image - total showing image
            this.imageParentDivWidth = imgObj.length * this.imageSize;
        }
    }
    @Output() imageClick = new EventEmitter<number>();

    // for lightbox
    currentImageSrc: string;
    ligthboxShow: boolean = false;
    activeImageIndex: number = 0;
    lightboxNextDisable: boolean = false;
    lightboxPrevDisable: boolean = false;
    showImage: boolean = true;
    @ViewChild('imageDiv') imageDiv;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (this.imageDiv.nativeElement.offsetWidth) {
            this.imageSize = +this.imageDiv.nativeElement.offsetWidth + 6; // addeing padding with image width
            this.imageParentDivWidth = this.imageObj.length * this.imageSize;
            this.leftPos = this.infinite ? -1 * this.imageSize : 0;
        }
        if (this.sliderMain.nativeElement.offsetWidth) {
            this.sliderMainDivWidth = this.sliderMain.nativeElement.offsetWidth;
        }
    }
    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key.toLowerCase() === 'arrowright') {
            this.nextImage();
        }

        if (event.key.toLowerCase() === 'arrowleft') {
            this.prevImage();
        }

        if (event.key.toLowerCase() === 'escape') {
            this.close();
        }
    }

    constructor(private cdRef: ChangeDetectorRef) { }

    ngOnInit() {
        // for slider
        if (this.infinite) {
            this.effectStyle = 'none';
            this.leftPos = -1 * this.imageSize;
            this.imageObj.unshift(this.imageObj[this.imageObj.length - 1]);
        }
    }

    // for slider
    ngAfterViewInit() {
        if (this.imageDiv.nativeElement.offsetWidth) {
            this.imageSize = +this.imageDiv.nativeElement.offsetWidth + 6; // addeing padding with image width
            this.leftPos = this.infinite ? -1 * this.imageSize : 0;
            this.imageParentDivWidth = this.imageObj.length * this.imageSize;
        }
        if (this.sliderMain.nativeElement.offsetWidth) {
            this.sliderMainDivWidth = this.sliderMain.nativeElement.offsetWidth;
        }
        this.nextPrevSliderButtonDisable();
        this.cdRef.detectChanges();
    }

    imageOnClick(index) {
        if (this.imagePopup) {
            this.activeImageIndex = index;
            this.showLightbox();
        }
        this.imageClick.emit(index);
    }

    prev() {
        if (this.infinite) {
            this.infinitePrevImg();
        } else {
            this.prevImg();
        }

        this.nextPrevSliderButtonDisable();
    }

    next() {
        if (this.infinite) {
            this.infiniteNextImg();
        } else {
            this.nextImg();
        }

        this.nextPrevSliderButtonDisable();
    }

    prevImg() {
        if (0 > this.leftPos) {
            this.leftPos += this.imageSize;
        }
    }

    nextImg() {
        if (this.imageParentDivWidth + this.leftPos > this.sliderMainDivWidth) {
            this.leftPos -= this.imageSize;
        }
    }

    infinitePrevImg() {
        this.effectStyle = `all ${this.speed}s ease-in-out`;
        this.leftPos = 0;

        setTimeout(() => {
            this.effectStyle = 'none';
            this.leftPos = -1 * this.imageSize;
            this.imageObj.unshift(this.imageObj[this.imageObj.length - 2]);
            this.imageObj.pop();
        }, this.speed * 1000);
    }

    infiniteNextImg() {
        const firstImageIndex = 1;
        this.effectStyle = `all ${this.speed}s ease-in-out`;
        this.leftPos = -2 * this.imageSize;

        setTimeout(() => {
            this.effectStyle = 'none';
            this.imageObj.push(this.imageObj[firstImageIndex]);
            this.imageObj.shift();
            this.leftPos = -1 * this.imageSize;
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
        if (this.imageObj.length && this.imageObj[0]['image']) {
            let imageSrc = this.imageObj[0]['image'];
            if (this.imageObj[this.activeImageIndex]) {
                imageSrc = this.imageObj[this.activeImageIndex]['image'];
            }
            this.getImage(imageSrc);
            this.nextPrevLigthboxButtonDisable();
            this.ligthboxShow = true;
        }
    }

    nextImage() {
        if (this.infinite && this.activeImageIndex + 1 >= this.imageObj.length) {
            this.activeImageIndex = 0;
        }

        if (this.activeImageIndex + 1 < this.imageObj.length
            && this.imageObj[this.activeImageIndex + 1]
            && this.imageObj[this.activeImageIndex + 1]['image']) {
            this.activeImageIndex++;
            const imageSrc = this.imageObj[this.activeImageIndex]['image'];
            this.getImage(imageSrc);
            this.nextPrevLigthboxButtonDisable();
        }
    }

    prevImage() {
        if (this.infinite && this.activeImageIndex - 1 <= 0) {
            this.activeImageIndex = this.imageObj.length;
        }

        if (this.activeImageIndex - 1 > -1
            && this.imageObj[this.activeImageIndex - 1]
            && this.imageObj[this.activeImageIndex - 1]['image']) {
            this.activeImageIndex--;
            const imageSrc = this.imageObj[this.activeImageIndex]['image'];
            this.getImage(imageSrc);
            this.nextPrevLigthboxButtonDisable();
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
    }

    getImage(url) {
        const _this = this;
        // this.currentImageSrc = '';
        this.showImage = false;
        if (url) {
            const image = new Image();
            image.onload = function () {
                setTimeout(() => {
                    _this.currentImageSrc = url;
                    _this.showImage = true;
                }, 0);
            };
            image.src = url;
        }
    }
}
