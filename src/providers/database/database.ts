import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class DatabaseProvider {

  private dbConnection: SQLiteObject;

  constructor(public sqlite: SQLite) {
    this.initDB();
  }

  get db(): SQLiteObject {
    return this.dbConnection;
  } 

  private initDB() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.dbConnection = db;

        //this.dropTables();
        this.createTables();
        this.loadRecords();
      })
      .catch(e => console.error('error on load db', JSON.stringify(e)));
  }

  private createTables() {
    console.log('creating tables');

    this.dbConnection.sqlBatch([
      ["create table if not exists categories(id integer primary key autoincrement, name varchar(255) not null, color character(9) default '#ffffff', is_default boolean);"],
      ["create table if not exists entries (id integer primary key autoincrement, amount decimal not null, description text, entry_at datetime not null, is_init boolean, category_id integer);"]
    ])
      .then(() => console.log('tables created successfully'))
      .catch(e => console.error('error on create tables', JSON.stringify(e)));
  }

  private loadRecords() {
    console.log('loading default data...');

    this.dbConnection.executeSql('select count(id) as qtd from categories', [])
      .then((data: any) => {
        console.log('categories in db', data.rows.item(0).qtd);
        if (data.rows.item(0).qtd == 0) {
          this.dbConnection.sqlBatch([
            ['insert into categories (name, color) values (?, ?)', ['Categoria 1', '#1abc9c']],
            ['insert into categories (name, color) values (?, ?)', ['Categoria 2', '#9b59b6']],
            ['insert into categories (name, color) values (?, ?)', ['Categoria 3', '#e67e22']]
          ])
            .then(() => console.log('default categories added'))
            .catch(e => console.error('error on create default categories', JSON.stringify(e)));
        }
      })
      .catch(e => console.error('error on get categories quantity', JSON.stringify(e)));
  }

  private dropTables() {
    console.log('dropping tables...');

    this.dbConnection.sqlBatch([
      ['drop table entries;'],
      ['drop table categories;']
    ])
    .then(() => console.log('tables dropped successfully'))
    .catch(e => console.error('error on drop tables', JSON.stringify(e)));
  }

  static now(days = 0, midnight = false) {
    // isn't working in this SQLITE due locale

    const date = new Date();
    let dd, mm, y, h, m, s;

    if (days != 0) {
      let newDate = new Date(date);
      newDate.setDate(newDate.getDate() + days);

      dd = newDate.getDate();
      mm = newDate.getMonth() + 1;
      y = newDate.getFullYear();
      h = newDate.getHours();
      m = newDate.getMinutes();
      s = newDate.getSeconds();
    }
    else {
      dd = date.getDate();
      mm = date.getMonth() + 1;
      y = date.getFullYear();
      h = date.getHours();
      m = date.getMinutes();
      s = date.getSeconds();
    }

    if(midnight) {
      h = 0;
      m = 0;
      s = 0;
    }

    let res = [
      '' + y,
      ('0' + mm).slice(-2),
      ('0' + dd).slice(-2),
      ('0' + h).slice(-2),
      ('0' + m).slice(-2),
      ('0' + s).slice(-2)
    ];

    return res.slice(0, 3).join('-') + ' ' + res.slice(3).join(':');
  }

}
