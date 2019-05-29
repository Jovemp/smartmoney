import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewEntryPage } from '../new-entry/new-entry';
import { AccountProvider } from '../../providers/account/account';

import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  entries = [];
  entriesByCategory = [];
  entriesByDate = [];
  currentBalance = 0;

  constructor(public navCtrl: NavController, public account: AccountProvider) {
  }

  ionViewDidEnter() {
    this.loadData();
  }

  private loadData() {
    this.loadBalance();
    this.loadEntry();
    this.loadBalancesByCategory();
    this.loadBalancesByDate();
  }

  addEntry() {
    console.log('Adicionar lançamento');
    this.navCtrl.push(NewEntryPage);
  }

  private loadEntry() {
    this.account.lastEntries(-7)
      .then((values: any) => {
        this.entries = values;
      })
      .catch(e => console.error('erro ao realizar select', JSON.stringify(e)));
  }

  private loadBalancesByDate() {
    this.account.lastEntriesByDate(-7)
      .then((data: any) => this.entriesByDate = data);
  }

  private loadBalancesByCategory(){
    this.account.lastEntriesByCategory(-7)
      .then((data: any) => this.entriesByCategory = data);
  }

  private loadBalance() {
    this.account
      .loadBalance()
        .then((balance) => this.currentBalance = balance);
  }
}
