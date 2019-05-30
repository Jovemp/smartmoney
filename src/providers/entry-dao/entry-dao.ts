import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { DatePipe } from '@angular/common';

@Injectable()
export class EntryDaoProvider {

  datePipe = new DatePipe('en_US');

  constructor(public database: DatabaseProvider) {
  }

  insert(amount, category_id, latitude, longitude, address, image, description, entryAt) {
    const newEntryAt = entryAt ? DatabaseProvider.date2bd(entryAt) : DatabaseProvider.now();
    const newDescription = description ? description : `Lançamento em ${this.datePipe.transform(newEntryAt)}`;

    const sqlInsert = "insert into entries (amount, entry_at, category_id, latitude, longitude, address, image, description) values (?, ?, ?, ?, ?, ?, ?, ?)";
    const dataInsert = [amount, newEntryAt, category_id, latitude, longitude, address, image, newDescription];

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

  getByCategory(criteria = '', data = []) {
    let sql = "select c.name AS category_name, c.color AS category_color, SUM(e.amount) AS balance \
                 from entries e \
                 INNER JOIN categories c ON (e.category_id = c.id) ";

    if (criteria != '') {
      sql += ` WHERE ${criteria}`;
    }

    sql += " group by category_name, category_color \
             order by balance desc";

    const newData = [].concat(data);

    return this, this.database.db
      .executeSql(sql, newData)
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


  getByDate(criteria = '', data = []) {
    let sql = "select c.name AS category_name, c.color AS category_color, SUM(e.amount) AS balance, \
                        strftime('%Y-%m-%d', entry_at) as entry_date \
                 from entries e \
                 INNER JOIN categories c ON (e.category_id = c.id)";

    if (criteria != '') {
      sql += ` WHERE ${criteria}`;
    }

    sql += " group by entry_date \
              order by entry_date desc";

    let newData = [].concat(data);

    return this, this.database.db
      .executeSql(sql, newData)
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



  getAll(criteria = '', data = []) {
    let sql = "select * from entries";

    if (criteria != '') {
      sql += ` WHERE ${criteria}`;
    }

    sql += " order by entry_at";

    const newData = [].concat(data);

    return this, this.database.db
      .executeSql(sql, newData)
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
