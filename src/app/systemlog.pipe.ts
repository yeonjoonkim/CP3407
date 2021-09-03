import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'systemlog'
})
export class SystemlogPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
