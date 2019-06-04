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

  addEntry(amount, category_id, latitude = 0, longitude = 0, address = null, image = null, description = null, entryAt = null) {
    this.balance += Number(amount);

    return this.entryDao.insert(amount, category_id, latitude, longitude, address, image, description, entryAt)
      .then(() => {
        console.log('new entry added');
      })
  }

  updateEntry(amount, category_id, latitude = 0, longitude = 0, address = null, image = null, description = null, entryAt = null, id) {
    this.balance += Number(amount);

    return this.entryDao.update(amount, category_id, latitude, longitude, address, image, description, entryAt, id)
      .then(() => {
        console.log('new entry added');
      })
  }

  deleteEntry(entryId) {
    return this.entryDao.delete(entryId)
      .then(() => {
        this.loadBalance();
      });
  }

  getEntry(entryId) {
    return this.entryDao.get(entryId);
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

  init(amount) {
    this.balance = amount;

    this.entryDao.deleteAll()
      .then(() => {
        this.entryDao.insert(amount, null, null, null, null, null, 'Saldo inicial.', null, 1);
      })
  }

  


}
