import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BalancePanelComponent } from './balance-panel/balance-panel';
import { EntrySummaryComponent } from './entry-summary/entry-summary';
import { EntryListComponent } from './entry-list/entry-list';
import { BalanceLabelComponent } from './balance-label/balance-label';

@NgModule({
	declarations: [BalancePanelComponent,
    EntrySummaryComponent,
    EntryListComponent,
    BalanceLabelComponent],
	imports: [
		IonicPageModule
	],
	exports: [BalancePanelComponent,
    EntrySummaryComponent,
    EntryListComponent,
    BalanceLabelComponent]
})
export class ComponentsModule {}
