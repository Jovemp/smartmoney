import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class EntryDaoProvider {

  constructor(public database: DatabaseProvider) {
  }

  insert(amount, category_id) {
    const sqlInsert = "insert into entries (amount, entry_at, category_id) values (?, ?, ?)";
    const dataInsert = [amount, 1, category_id];

    return this.database.db.executeSql(sqlInsert, dataInsert)
      .catch(e => console.error('erro ao inserir', JSON.stringify(e)));
  }

  update(entry, id) {
    const sql = "update entries amount = ?, category_id = ? where id = ?";
    const data = [entry['amount'], entry['category_id'], id]

    return this.database.db
      .executeSql(sql, data)
      .catch(e => console.error('erro ao update', JSON.stringify(e)));
  }

  delete(id) {
    const sql = "delete from entries where id = ?";
    const data = [id];

    return this.database.db
      .executeSql(sql, data)
      .catch(e => console.error('erro ao delete', JSON.stringify(e)));
  }

  deleteAll() {
    const sql = "delete from entries where";
    const data = [];

    return this.database.db
      .executeSql(sql, data)
      .catch(e => console.error('erro ao deleteAll', JSON.stringify(e)));
  }

  get(id: number) {
    const sql = "select * from entries where id = ?";
    const data = [id];

    return this, this.database.db
      .executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0) {
          return data.rows.item(0);
        }
        return null;
      })
      .catch(e => console.error('erro ao get', JSON.stringify(e)));
  }

  getByCategory() {
    const sql = "select c.name AS category_name, c.color AS category_color, SUM(e.amount) AS balance \
                 from entries e \
                 INNER JOIN categories c ON (e.category_id = c.id) \
                 group by category_name, category_color \
                 order by balance desc";
    const data = [];

    return this, this.database.db
      .executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0) {
          let entries: any[] = [];

          for (var i = 0; i < data.rows.length; i++) {
            const item = data.rows.item(i);
            entries.push(item);
          }
          return entries;
        }
        return [];
      })
      .catch(e => console.error('erro ao getByCategory', JSON.stringify(e)));
  }

  

  getAll() {
    const sql = "select * from entries order by entry_at";
    const data = [];

    return this, this.database.db
      .executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0) {
          let entries: any[] = [];

          for (var i = 0; i < data.rows.length; i++) {
            const item = data.rows.item(i);
            entries.push(item);
          }
          return entries;
        }
        return [];
      })
      .catch(e => console.error('erro ao getAll', JSON.stringify(e)));
  }

  getBalance() {
    const sql = 'SELECT SUM(amount) AS balance FROM entries';
    const data = [];

    return this.database.db
      .executeSql(sql, data)
        .then((data: any) => {
          if (data.rows.length > 0) {
            const item = data.rows.item(0);
            return item.balance;
          }

          return 0;
        })
        .catch((e) => console.error('error on getBalance', JSON.stringify(e)));
  }

}