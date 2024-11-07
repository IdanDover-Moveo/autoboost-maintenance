import { Injectable } from '@nestjs/common';

@Injectable()
export class StringsUtilsService {
  convertKebabToCamel(kebabCase: string): string {
    return kebabCase
      .split('-')
      .map((word, index) => {
        if (index === 0) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join('');
  }
}
