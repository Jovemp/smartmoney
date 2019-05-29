import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  currentBalance = 10.56;
  dateButtonLabel = "Últimos 7 dias";
  categoryButtonLabel = "Todas Categorias";
  entriesByCategory = [];
  lastEntries = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public account: AccountProvider) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  dismiss() {
    this.navCtrl.pop();
  }

  loadData() {
    this.loadLastEntry();
    this.loadBalancesByCategory();
  }

  private loadLastEntry() {
    this.account.lastEntries(-7)
      .then((values: any) => {
        this.lastEntries = values;
      })
      .catch(e => console.error('erro ao realizar select', JSON.stringify(e)));
  }

  private loadBalancesByCategory(){
    this.account.lastEntriesByCategory(-7)
      .then((data: any) => this.entriesByCategory = data);
  }


}
