import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewEntryPage } from '../new-entry/new-entry';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public sqlite: SQLite) {

  }

  addEntry() {
    console.log('Adicionar lançamento');
    this.navCtrl.push(NewEntryPage);
  }



  testeDB() {
    console.log('Inicio de Teste DB');
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        this.createTable(db)
          .then(() => {
            console.log('tabela criada');

            this.select(db)
              .then((values: any) => {
                console.log(values.rows.length);

                for (var i = 0; i < values.rows.length; i++) {
                  console.log(JSON.stringify(values.rows.item(i)));
                }

                this.balance(db)
                  .then((values: any) => {
                    const item = values.rows.item(0);
                    console.log('---------------');
                    console.log("saldo atual", JSON.stringify(item.balance));
                  })

              });

          });
      });

  }

  createTable(db) {
    console.log('DB criado');
    return db.sqlBatch([
      "create table if not exists entries (id integer primary key autoincrement, amount decimal, description text)"
    ])
      .catch(e => console.error('erro ao criar a tabela', JSON.stringify(e)));
  }

  insert(a, b, db) {
    const sqlInsert = "insert into entries (amount, description) values (?, ?)";
    const dataInsert = [a, b];

    return db.executeSql(sqlInsert, dataInsert)
      .catch(e => console.error('erro ao inserir', JSON.stringify(e)));
  }

  update(v1, v2, id, db) {
    const sql = "update entries set amount = ?, description = ? where id = ?";
    const data = [v1, v2, id];

    return db.executeSql(sql, data)
      .catch(e => console.error('erro ao fazer update ', JSON.stringify(e)));
  }

  delete(id, db) {
    const sql = "delete from entries where id = ?";
    const data = [id];

    return db.executeSql(sql, data)
      .catch(e => console.error('erro ao fazer delete ', JSON.stringify(e)));
  }

  select(db) {
    const sql = "select * from entries";
    const data = [];
    return db.executeSql(sql, data)
      .catch(e => console.error('erro ao realizar select', JSON.stringify(e)));
  }

  balance(db) {
    const sql = "select sum(amount) as balance from entries";
    const data = [];
    return db.executeSql(sql, data)
      .catch(e => console.error('erro ao realizar select', JSON.stringify(e)));
  }
}
