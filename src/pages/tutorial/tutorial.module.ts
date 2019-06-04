import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TutorialPage } from './tutorial';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [
    TutorialPage,
  ],
  imports: [
    CurrencyMaskModule, 
    IonicPageModule.forChild(TutorialPage),
  ],
})
export class TutorialPageModule {}
