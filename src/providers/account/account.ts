import { Injectable } from '@angular/core';
import { EntryDaoProvider } from '../entry-dao/entry-dao';
import { CategoryDaoProvider } from '../category-dao/category-dao';

@Injectable()
export class AccountProvider {

  private balance = 0;

  constructor(public entryDao: EntryDaoProvider,
    public categoryDao: CategoryDaoProvider) {
  }

  currentBalance() {
    return this.balance;
  }

  allEntries() {
    return this.entryDao.getAll();
  }

  lastEntriesByCategory(){
    return this.entryDao.getByCategory();
  }

  addEntry(amount, category_id) {
    this.balance += Number(amount);

    return this.entryDao.insert(amount, category_id)
      .then(() => {
        console.log('new entry added');
      })
  }

  loadBalance() {
    console.log('load balance');

    return this.entryDao
      .getBalance()
        .then((balance) => {
          this.balance = Number(balance)
          return this.balance;
        });
  }

  


}
