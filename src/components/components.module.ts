import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BalancePanelComponent } from './balance-panel/balance-panel';
import { EntrySummaryComponent } from './entry-summary/entry-summary';
import { EntryListComponent } from './entry-list/entry-list';
import { BalanceLabelComponent } from './balance-label/balance-label';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart';

@NgModule({
	declarations: [BalancePanelComponent,
    EntrySummaryComponent,
    EntryListComponent,
    BalanceLabelComponent,
    DoughnutChartComponent],
	imports: [
		IonicPageModule
	],
	exports: [BalancePanelComponent,
    EntrySummaryComponent,
    EntryListComponent,
    BalanceLabelComponent,
    DoughnutChartComponent]
})
export class ComponentsModule {}
