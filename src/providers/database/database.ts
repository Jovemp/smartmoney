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
      ["create table if not exists categories(id integer primary key autoincrement, \
               name varchar(255) not null, \
               color character(9) default '#ffffff', \
               is_default boolean, \
               is_credit integer, \
               is_debit integer);"],
      ["create table if not exists entries (id integer primary key autoincrement, \
          amount decimal not null, description text, entry_at datetime not null, \
          latitude float, longitude float, address varchar(255), \
          image varchar(255), is_init integer, category_id integer);"]
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
            ['INSERT INTO categories (name, color, is_debit) values (?, ?, ?)', ['Alimentação', '#1abc9c', 1]],            // turquese
            ['INSERT INTO categories (name, color, is_debit) values (?, ?, ?)', ['Restaurantes e Bares', '#2ecc71', 1]],   // green
            ['INSERT INTO categories (name, color, is_debit) values (?, ?, ?)', ['Casa', '#3498db', 1]],                   // blue
            ['INSERT INTO categories (name, color, is_debit) values (?, ?, ?)', ['Compras', '#9b59b6', 1]],                // violet
            ['INSERT INTO categories (name, color, is_debit) values (?, ?, ?)', ['Cuidados Pessoais', '#f1c40f', 1]],      // yellow
            ['INSERT INTO categories (name, color, is_debit) values (?, ?, ?)', ['Dívidas e Empréstimos', '#f39c12', 1]],  // yellow-dark
            ['INSERT INTO categories (name, color, is_debit) values (?, ?, ?)', ['Educação', '#e67e22', 1]],               // orange
            ['INSERT INTO categories (name, color, is_debit) values (?, ?, ?)', ['Família e Filhos', '#d35400', 1]],       // orange-dark
            ['INSERT INTO categories (name, color, is_debit) values (?, ?, ?)', ['Impostos e Taxas', '#e74c3c', 1]],       // red
            ['INSERT INTO categories (name, color, is_debit) values (?, ?, ?)', ['Investimentos', '#c0392b', 1]],          // red-dark
            ['INSERT INTO categories (name, color, is_debit) values (?, ?, ?)', ['Lazer', '#ecf0f1', 1]],                  // champagne
            ['INSERT INTO categories (name, color, is_debit) values (?, ?, ?)', ['Mercado', '#bdc3c7', 1]],                // champagne-dark
            ['INSERT INTO categories (name, color, is_debit) values (?, ?, ?)', ['Outras Despesas', '#95a5a6', 1]],        // metal

            ['INSERT INTO categories (name, color, is_credit) values (?, ?, ?)', ['Empréstimos', '#273c75', 1]],           // blue marine
            ['INSERT INTO categories (name, color, is_credit) values (?, ?, ?)', ['Investimentos', '#4cd137', 1]],         // green-sea
            ['INSERT INTO categories (name, color, is_credit) values (?, ?, ?)', ['Salário', '#487eb0', 1]],               // seabrook
            ['INSERT INTO categories (name, color, is_credit) values (?, ?, ?)', ['Outras Receitas', '#8c7ae6', 1]]       // matt purple
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

  static date2bd(date) {
    const dd = date.getDate();
    const mm = date.getMonth() +1;
    const y = date.getFullYear();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();

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
