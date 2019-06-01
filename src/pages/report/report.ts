import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';
import { DatePicker } from '@ionic-native/date-picker';
import { DatePipe } from '@angular/common';
import { CategoryDaoProvider } from '../../providers/category-dao/category-dao';

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  currentBalance = 10.56;

  entriesByCategory = [];
  lastEntries = [];

  categories = [];
  selectedCategories = [];

  date = new Date();
  days = -7;

  datePipe = new DatePipe('pt_BR');

  dateButtonLabel = `Últimos ${this.days * -1} dias`;
  categoryButtonLabel = "Todas Categorias";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public account: AccountProvider,
    public alertCtrl: AlertController,
    public dataPicker: DatePicker,
    public categoryDao: CategoryDaoProvider) {
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
    this.loadCategories();
  }

  private loadValues() {
    this.loadLastEntry();
    this.loadBalancesByCategory();
  }

  loadCategories() {
    this.categoryDao.getAll()
      .then((data: any[]) =>  {
         this.categories = data;
         this.selectedCategories = data;
      });
  }

  private loadBalance() {
    this.account
      .loadBalance()
      .then((balance) => this.currentBalance = balance);
  }

  private loadLastEntry() {
    this.account.lastEntries(this.days, this.selectedCategories)
      .then((values: any) => {
        this.lastEntries = values;
      })
      .catch(e => console.error('erro ao realizar select', JSON.stringify(e)));
  }

  private loadBalancesByCategory() {
    this.account.lastEntriesByCategory(this.days, this.selectedCategories)
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

      const one_day = 1000 * 60 * 60 * 24;
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

  selectCategory() {
    let alert = this.alertCtrl.create({
      title: 'Categorias',
      cssClass: 'custom-alert'
    });

    for (let category of this.categories) {
      alert.addInput({
        type: 'checkbox',
        label: category.name,
        value: category.id,
        checked: this.selectedCategories.length == 0 || this.selectedCategories.find(item => item.id == category.id)
      });
    }


    alert.addButton('Cancelar');
    alert.addButton({
      text: 'OK',
      handler: categoriesID => {
        if (categoriesID.length == 0) {
          this.categoryButtonLabel = 'Todas Categorias';
        } else  if (categoriesID.length == 1) {
          this.categoryButtonLabel = 'Uma Categoria'
        } else if (categoriesID.length == this.categories.length)  {
          this.categoryButtonLabel = 'Todas Categorias'
        } else {
          this.categoryButtonLabel = `${categoriesID.length} Categorias`;
        }

        this.selectedCategories = this.categories.filter(item => categoriesID.indexOf(item.id) > -1);

        this.loadValues();
      }
    });

    alert.present();
  }


}
