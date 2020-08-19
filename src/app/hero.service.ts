import { Injectable, Inject, Optional } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class HeroService {
  constructor(private http: HttpClient) {}

  getImages() {
    return this.http.get(
      "https://accedo-video-app-api.herokuapp.com/getImages",
      httpOptions
    );
  }
}
