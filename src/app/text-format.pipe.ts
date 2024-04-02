import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textFormat',
})
export class TextFormatPipe implements PipeTransform {
  transform(value: string): string {
    let formattedString: string;
    value = value.trim();
    formattedString = value.charAt(0).toUpperCase();
    for (let index = 1; index < value.length; index++) {
      if (value.charAt(index - 1) === ' ') {
        formattedString = formattedString + value[index].toUpperCase();
      } else {
        formattedString = formattedString + value[index].toLowerCase();
      }
    }
    return formattedString;
  }
}
