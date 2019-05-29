import { Injectable } from '@angular/core';
import { EntryDaoProvider } from '../entry-dao/entry-dao';
import { CategoryDaoProvider } from '../category-dao/category-dao';
import { DatabaseProvider } from '../database/database';

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

  lastEntries(days, categories = []) {
    let criteria = 'entry_at >= ?';

    let data =  [DatabaseProvider.now(days, true)];

    if (categories.length > 0) {
      let criteriaCategories = [];

      for (let categoryID of categories.map(item => item.id)) {
        criteriaCategories.push('category_id = ?');
        data.push(categoryID);
      }

      criteria += ` AND (${criteriaCategories.join(" OR ")})`;
    }   

    return this.entryDao.getAll(criteria, data);
  }

  lastEntriesByCategory(days, categories = []){
    let criteria = 'entry_at >= ?';
    let data =  [DatabaseProvider.now(days, true)];

    if (categories.length > 0) {
      let criteriaCategories = [];

      for (let categoryID of categories.map(item => item.id)) {
        criteriaCategories.push('category_id = ?');
        data.push(categoryID);
      }

      criteria += ` AND (${criteriaCategories.join(" OR ")})`;
    }   

    return this.entryDao.getByCategory(criteria, data);
  }

  lastEntriesByDate(days, categories = []) {
    let criteria = 'entry_at >= ?';
    let data =  [DatabaseProvider.now(days, true)];

    if (categories.length > 0) {
      let criteriaCategories = [];

      for (let categoryID of categories.map(item => item.id)) {
        criteriaCategories.push('category_id = ?');
        data.push(categoryID);
      }

      criteria += ` AND (${criteriaCategories.join(" OR ")})`;
    }   

    return this.entryDao.getByDate(criteria, data);
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
