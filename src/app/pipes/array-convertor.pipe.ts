import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intoOrderedProducts'
})
export class OrderedProductsConvertorPipe implements PipeTransform {

  transform(value: {}) {

  }

}
