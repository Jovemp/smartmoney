import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }

  goToSlide(num) {
    this.slides.slideTo(num, 500);
  }

}
