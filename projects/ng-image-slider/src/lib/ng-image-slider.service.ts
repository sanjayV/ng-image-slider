import { Injectable } from '@angular/core';

@Injectable()
export class NgImageSliderService {

    constructor() { }

    isBase64(str) {
        var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        return base64regex.test(str);

    }

    base64FileExtension(str) {
        return str.substring("data:image/".length, str.indexOf(";base64"));
    }
}
