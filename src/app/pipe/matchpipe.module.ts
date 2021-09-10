import { NgModule, Injectable } from '@angular/core';
import { MatchPipe } from './matchpipe';

@Injectable()
@NgModule({
  declarations: [
    MatchPipe,
  ],
  imports: [
    
  ],
  exports: [
    MatchPipe
  ]
})
export class MatchPipeModule {}