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
          "image": "https://i.picsum.photos/id/582/536/354.jpg?hmac=yl_995o4eDi7GMlFYMZcpu_DHFYjuA0g83BuhpHyGiI",
          "thumbImage": "https://i.picsum.photos/id/582/536/354.jpg?hmac=yl_995o4eDi7GMlFYMZcpu_DHFYjuA0g83BuhpHyGiI",
          "title": "Image One-order-1",
          "order":1
        },
        {
          "image": "https://i.picsum.photos/id/392/536/354.jpg?hmac=pfwZXOXi7mvSPp3AmAeieDhYPDGHv_1e5UCWo-t4McI",
          "thumbImage": "https://i.picsum.photos/id/392/536/354.jpg?hmac=pfwZXOXi7mvSPp3AmAeieDhYPDGHv_1e5UCWo-t4McI",
          "alt": "image six"
        },
        {
          "image": "https://i.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0",
          "thumbImage": "https://i.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0",
          "alt": "alt of image seven",
          "title": "Image Two"
        },
        {
          "image": "https://i.picsum.photos/id/889/536/354.jpg?hmac=Ed5MAlDO9NIMLSNWrV0nvfDqZfUEzSf9cU6Fc9S_qSM",
          "thumbImage": "https://i.picsum.photos/id/889/536/354.jpg?hmac=Ed5MAlDO9NIMLSNWrV0nvfDqZfUEzSf9cU6Fc9S_qSM"
        },
        {
          "image": "https://i.picsum.photos/id/922/536/354.jpg?hmac=i5eN3Vt4D9V_ZLK3Wjc7OFW7J9Gj60gZy6FSNl9ycN8",
          "thumbImage": "https://i.picsum.photos/id/922/536/354.jpg?hmac=i5eN3Vt4D9V_ZLK3Wjc7OFW7J9Gj60gZy6FSNl9ycN8",
          "title": "Image Four"
        },
        {
          "image": "https://i.picsum.photos/id/168/889/536.jpg?hmac=3oSZ237Va2MomQuC9nnE7Z2drQYJOQiOES2xb3XBZ_Y",
          "thumbImage": "https://i.picsum.photos/id/168/889/536.jpg?hmac=3oSZ237Va2MomQuC9nnE7Z2drQYJOQiOES2xb3XBZ_Y",
          "title": "Image Five-order-2",
          "order":2
        },
        {
          "image": "https://i.picsum.photos/id/110/889/536.jpg?hmac=SW0tF36OSr4Pt8MBxWuTacbCUISxKad_kKNhIcWkEPU",
          "thumbImage": "https://i.picsum.photos/id/110/889/536.jpg?hmac=SW0tF36OSr4Pt8MBxWuTacbCUISxKad_kKNhIcWkEPU",
          "title": "Image Six"
        },
        {
          "image": "https://i.picsum.photos/id/916/889/536.jpg?hmac=Vpy97Y1IPFVIZxWmh0O3p-hGT6dx1jKwIyY2gkz3kAw",
          "thumbImage": "https://i.picsum.photos/id/916/889/536.jpg?hmac=Vpy97Y1IPFVIZxWmh0O3p-hGT6dx1jKwIyY2gkz3kAw",
          "title": "Image Seven-order-5",
          "order":5
        },
        {
          "image": "https://i.picsum.photos/id/851/889/536.jpg?hmac=5iCNj4Z0LAI3nlQilYE8qafE14mkao8X-h59spAF9RU",
          "thumbImage": "https://i.picsum.photos/id/851/889/536.jpg?hmac=5iCNj4Z0LAI3nlQilYE8qafE14mkao8X-h59spAF9RU",
          "title": "Image Eight"
        },
        {
          "image": "https://i.picsum.photos/id/305/889/536.jpg?hmac=y3oUGU8B9yzK4L-LeBafoH8AzZ0O29eDsx7tenR_EyA",
          "thumbImage": "https://i.picsum.photos/id/305/889/536.jpg?hmac=y3oUGU8B9yzK4L-LeBafoH8AzZ0O29eDsx7tenR_EyA",
          "title": "Image Nine-order-2",
          "order":2
        },
        {
          "image": "https://i.picsum.photos/id/584/889/536.jpg?hmac=dghSCV_0viTgB_L9T5wVowf6ghuKVENHgP_NrA7NANQ",
          "thumbImage": "https://i.picsum.photos/id/584/889/536.jpg?hmac=dghSCV_0viTgB_L9T5wVowf6ghuKVENHgP_NrA7NANQ",
          "title": "Image Ten"
        },
        {
          "image": "https://i.picsum.photos/id/919/889/536.jpg?hmac=QF3tfAuf7uq_-ER5lEKGmdnbBDEWycZVPbPms8Ap9_M",
          "thumbImage": "https://i.picsum.photos/id/919/889/536.jpg?hmac=QF3tfAuf7uq_-ER5lEKGmdnbBDEWycZVPbPms8Ap9_M",
          "title": "Image Eleven-order-null",
          "order":null
        },
        {
          "image": "https://i.picsum.photos/id/859/889/536.jpg?hmac=Y916ejeqOlQW7zdKF0y7GBsbGM_Gv2-CdjG5XpqUdrE",
          "thumbImage": "https://i.picsum.photos/id/859/889/536.jpg?hmac=Y916ejeqOlQW7zdKF0y7GBsbGM_Gv2-CdjG5XpqUdrE",
          "title": "Image Twelve"
        },
        {
          "image": "https://i.picsum.photos/id/719/889/536.jpg?hmac=kxPet_1Ao9vqO526pnb7VmdshgcR8I3rUbnGAtszznM",
          "thumbImage": "https://i.picsum.photos/id/719/889/536.jpg?hmac=kxPet_1Ao9vqO526pnb7VmdshgcR8I3rUbnGAtszznM",
          "title": "Image Thirteen"
        },
        {
          "image": "https://i.picsum.photos/id/242/889/536.jpg?hmac=SfZPauEXOhFk2cWueDjqkE2ctU7IUSh0kdJKGELCudA",
          "thumbImage": "https://i.picsum.photos/id/242/889/536.jpg?hmac=SfZPauEXOhFk2cWueDjqkE2ctU7IUSh0kdJKGELCudA",
          "title": "Image Fourteen"
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
