import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class CategoryDaoProvider {

  constructor(public database: DatabaseProvider) {
  }

  getAll() {
    const sql = "SELECT * FROM categories order by name";
    const data = [];
    return this.database.db.executeSql(sql, data)
    .then((data: any) => {
      if (data.rows.length > 0) {
        let categories: any[] = [];

        for (var i = 0; i < data.rows.length; i++) {
          const item = data.rows.item(i);
          categories.push(item);
        }
        return categories;
      }
      return null;
    })
    .catch(e => console.error('erro ao getAll', JSON.stringify(e)));
  }

  getDebit() {
    const sql = "SELECT * FROM categories where is_debit = 1 order by name";
    const data = [];
    return this.database.db.executeSql(sql, data)
    .then((data: any) => {
      if (data.rows.length > 0) {
        let categories: any[] = [];

        for (var i = 0; i < data.rows.length; i++) {
          const item = data.rows.item(i);
          categories.push(item);
        }
        return categories;
      }
      return null;
    })
    .catch(e => console.error('erro ao getAll', JSON.stringify(e)));
  }

  getCredit() {
    const sql = "SELECT * FROM categories where is_credit = 1 order by name";
    const data = [];
    return this.database.db.executeSql(sql, data)
    .then((data: any) => {
      if (data.rows.length > 0) {
        let categories: any[] = [];

        for (var i = 0; i < data.rows.length; i++) {
          const item = data.rows.item(i);
          categories.push(item);
        }
        return categories;
      }
      return null;
    })
    .catch(e => console.error('erro ao getAll', JSON.stringify(e)));
  }

}
