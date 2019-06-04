import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccountProvider } from '../../providers/account/account';
import { HomePage } from '../home/home';
import { ConfigProvider } from '../../providers/config/config';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  @ViewChild(Slides) slides: Slides;
  entryForm: FormGroup;
  entry = { value: 0 };

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public builder: FormBuilder,
      public account: AccountProvider,
      public config: ConfigProvider) {

        this.entryForm = builder.group({
          amount: new FormControl('', Validators.required)
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }

  goToSlide(num) {
    this.slides.slideTo(num, 500);
  }

  submitForm() {
    this.account.init(this.entry['value']);
    this.goToSlide(2);
  }

  grantPermissions() {
    this.config.setValue('tutorialDone', true);
    this.navCtrl.setRoot(HomePage, { tutorial: true })
  }

}
