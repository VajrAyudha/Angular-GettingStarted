import { Pipe,PipeTransform } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { pipe } from 'rxjs';

@Pipe ({
      name: 'ConvertToSpacesPipe'
})
export class ConvertToSpacesPipe  implements PipeTransform{

      transform(value: string, character: string): string {

            return value.replace(character, ' ');
      }
}

