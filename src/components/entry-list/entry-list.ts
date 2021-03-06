import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReportPage } from '../../pages/report/report';
import { NewEntryPage } from '../../pages/new-entry/new-entry';

@Component({
  selector: 'entry-list',
  templateUrl: 'entry-list.html'
})
export class EntryListComponent {
  @Input() entries = [];
  @Input() showActions = false;

  constructor(public navCtrl: NavController) {
  }

  showReport() {
    this.navCtrl.push(ReportPage);
  }

  editEntry(entry) {
    this.navCtrl.push(NewEntryPage, { entryId: entry.id });
  }

}
