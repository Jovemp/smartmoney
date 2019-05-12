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
      console.log('DB criado');
      db.sqlBatch([
        "create table if not exists entries (id integer primary key autoincrement, amount decimal, description text)"
      ])
      .then(() => {
        console.log('tabela criada');
      })
      .catch(() => {
        console.log('Erro no SQL')
      })
    })
    .catch(() => console.log('Erro ao criar bd'))

  }
}
