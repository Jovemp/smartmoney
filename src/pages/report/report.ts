import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';
import { DatePicker } from '@ionic-native/date-picker';
import { DatePipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  currentBalance = 10.56;
  
  entriesByCategory = [];
  lastEntries = [];
  date = new Date();
  days = -7;

  datePipe = new DatePipe('en_US');

  dateButtonLabel = `Últimos ${this.days * -1} dias`;
  categoryButtonLabel = "Todas Categorias";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public account: AccountProvider,
              public dataPicker: DatePicker) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  dismiss() {
    this.navCtrl.pop();
  }

  private loadData() {
    this.loadValues();
    this.loadBalance();
  }

  private loadValues() {
    this.loadLastEntry();
    this.loadBalancesByCategory();
  }

  private loadBalance() {
    this.account
      .loadBalance()
        .then((balance) => this.currentBalance = balance);
  }

  private loadLastEntry() {
    this.account.lastEntries(this.days)
      .then((values: any) => {
        this.lastEntries = values;
      })
      .catch(e => console.error('erro ao realizar select', JSON.stringify(e)));
  }

  private loadBalancesByCategory(){
    this.account.lastEntriesByCategory(this.days)
      .then((data: any) => this.entriesByCategory = data);
  }

  selectDate() {
    console.log('Teste 1');
    this.dataPicker.show({
        date: this.date,
        mode: 'date',
        titleText: 'Selecione uma data',
        okText: 'Ok',
        cancelText: 'Cancelar',
        todayText: 'Hoje',
        nowText: 'Agora',
        locale: 'pt_BR',
        is24Hour: true,
        androidTheme: this.dataPicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK
      }).then(date => {
          this.date = date;
  
          let today = new Date();
          today.setHours(0);
          today.setMinutes(0);
          today.setSeconds(0);
  
          const one_day = 1000*60*60*24;
          const date1_ms = today.getTime();
          const date2_ms = date.getTime();
          const difference_ms = date2_ms - date1_ms;
  
          this.days = Math.ceil(difference_ms / one_day);
          this.dateButtonLabel = this.datePipe.transform(date);
          console.log(this.days);
          this.loadValues();
        }
      );
  }


}
