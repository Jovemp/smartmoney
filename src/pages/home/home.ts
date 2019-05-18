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
  currentBalance = 0;

  constructor(public navCtrl: NavController, public account: AccountProvider) {
  }

  ionViewDidEnter() {
    this.loadData();
  }

  private loadData() {
    this.loadBalance();
    this.loadEntry();
  }

  addEntry() {
    console.log('Adicionar lançamento');
    this.navCtrl.push(NewEntryPage);
  }

  private loadEntry() {
    this.account.allEntries()
      .then((values: any) => {
        this.entries = values;
      })
      .catch(e => console.error('erro ao realizar select', JSON.stringify(e)));
  }

  private loadBalance() {
    this.account
      .loadBalance()
        .then((balance) => this.currentBalance = balance);
  }
}
