import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: any, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/img';
    if (!img) {
      return url + '/usuarios/no-image'
    }
    if (img.indexOf('https') >= 0) {
      return img;
    }
    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'item':
        url += '/items/' + img;
        break;
      default:
        console.log('Imagen no existe');
        url += '/usuarios/no-image';
    }
    return url;
  }

}
