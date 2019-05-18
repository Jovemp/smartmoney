import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CategoryDaoProvider } from '../../providers/category-dao/category-dao';
import { AccountProvider } from '../../providers/account/account';


@IonicPage()
@Component({
  selector: 'page-new-entry',
  templateUrl: 'new-entry.html',
})
export class NewEntryPage {
  categories = [];
  entryForm: FormGroup;
  currentBalance: number = 0;

  entry = {}

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private builder: FormBuilder,
    public categoryDao: CategoryDaoProvider,
    public account: AccountProvider) {
    this.entryForm = builder.group({
      amount: new FormControl('', Validators.compose([Validators.required])),
      category_id: new FormControl('', Validators.required)
    });
  }

  ionViewDidLoad() {
    this.loadData();
  }

  submitForm() {
    console.log('Submit Form');
    console.log(JSON.stringify(this.entry));
    // rotina do bd
    this.insertBD();
    this.goBack();
  }

  goBack() {
    console.log('Go Back');
    // sair sem fazer nada
    this.navCtrl.pop();
  }

  insertBD() {
    console.log('Inicio da gravação do BD');
    this.account.addEntry(this.entry['amount'], this.entry['category_id'])      
      .then(() => console.log('insert realizado com sucesso'))
  }

  loadData() {
    this.categoryDao.getAll()
      .then((categories: any[]) => {
        this.categories = categories;
      });
    this.account
      .loadBalance()
        .then((balance) => this.currentBalance = balance);
  }
}
