import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewEntryPage } from './new-entry';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    NewEntryPage,
  ],
  imports: [
    CurrencyMaskModule,
    ComponentsModule,
    IonicPageModule.forChild(NewEntryPage),
  ],
})
export class NewEntryPageModule {}
