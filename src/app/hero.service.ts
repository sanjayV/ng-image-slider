import { Injectable, Inject, Optional } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class HeroService {
  constructor(private http: HttpClient) {}
  
data:any= 
    [
        {
          "image": "https://picsum.photos/582/536",
          "thumbImage": "https://picsum.photos/582/536",
          "title": "Image One-order-1",
          "alt": "Image One Alt",
          "order":2
        },
        {
          "image": "https://picsum.photos/582/537",
          "thumbImage": "https://picsum.photos/582/537",
          "alt": "image six"
        },
        {
          "image": "https://picsum.photos/582/538",
          "thumbImage": "https://picsum.photos/582/538",
          "alt": "alt of image seven",
          "title": "Image Two"
        },
        {
          "image": "https://picsum.photos/582/539",
          "thumbImage": "https://picsum.photos/582/539"
        },
        {
          "image": "https://picsum.photos/582/540",
          "thumbImage": "https://picsum.photos/582/540",
          "title": "Image Four",
        },
        {
          "image": "https://picsum.photos/582/541",
          "thumbImage": "https://picsum.photos/582/541",
          "title": "Image Five-order-2",
          "order":1
        },
        {
          "image": "https://picsum.photos/582/542",
          "thumbImage": "https://picsum.photos/582/542",
          "title": "Image Six"
        },
        {
          "video": 'https://youtu.be/6pxRHBw-k8M',
          "videoAutoPlay": false,
          "posterImage": 'https://picsum.photos/582/543', //Optional: You can use this key if you want to show video poster image in slider
          "title": 'Image title'
        },
        {
          video: 'assets/video/movie.mp4', // MP4 Video url
        }
      ] ;
  getImages() {
    return this.http.get(
      "https://accedo-video-app-api.herokuapp.com/getImages",
      httpOptions
    );
  }

  getImagesWithOrder(){
    return this.data;
  }
}
