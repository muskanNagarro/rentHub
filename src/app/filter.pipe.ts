import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    standalone: false
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterText: string): any[] {
    if (!filterText) {
      return value;
    }
    return value.filter(
      (apartment) =>
        apartment.description.toLowerCase().includes(filterText.toLowerCase())
    );
  }
}
