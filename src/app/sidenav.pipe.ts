import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sidenav'
})
export class SidenavPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
