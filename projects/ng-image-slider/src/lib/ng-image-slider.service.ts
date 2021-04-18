import { Injectable } from '@angular/core';

const DESC = 'DESC',
    ASC = 'ASC';

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

    orderArray(arr = [], orderType = ASC) {
        if (arr?.length && orderType) {
            return arr.sort((ob1, ob2) => {
                if (ob1['order'] === null || !ob1['order']) {
                    return 1;
                }
                else if (ob2['order'] === null || !ob2['order']) {
                    return -1;
                }
                else if (ob1['order'] > ob2['order']) {
                    if (orderType === DESC) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
                else if (ob1['order'] < ob2['order']) {
                    
                    if (orderType === DESC) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
            });
        }
        return arr;
    }
}
