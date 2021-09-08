import {AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import {SwiperComponent} from 'swiper/angular';
import { SwiperOptions } from 'swiper';
import SwiperCore, {
  Pagination
} from 'swiper/core';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IntroPage implements AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;

  config: SwiperOptions = {
    slidesPerView: 1,
    pagination: true
  };

  constructor(private storage: Storage, private router: Router) { }
  ngAfterContentChecked() {
    if (this.swiper){
    this.swiper.updateSwiper({});
   }
  }

  async ngOnInit() {
      //create a storage
      await this.storage.create();
  }

  next(){
    this.swiper.swiperRef.slideNext(500);
  }
  async start(){
    //set START_KEY = True
    await this.storage.set('START_KEY', 'true')
    this.router.navigateByUrl('/login', {replaceUrl: true})
  }

}
