import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setting'
})
export class SettingPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
