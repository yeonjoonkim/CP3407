import { NgModule, Injectable } from '@angular/core';
import { OrderByPipe } from './orderbypipe';

@Injectable()
@NgModule({
  declarations: [
    OrderByPipe,
  ],
  imports: [
    
  ],
  exports: [
    OrderByPipe
  ]
})
export class OrderByPipeModule {}