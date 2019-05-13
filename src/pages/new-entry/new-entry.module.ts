import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewEntryPage } from './new-entry';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [
    NewEntryPage,
  ],
  imports: [
    CurrencyMaskModule,
    IonicPageModule.forChild(NewEntryPage),
  ],
})
export class NewEntryPageModule {}
