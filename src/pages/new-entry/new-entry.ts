import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@IonicPage()
@Component({
  selector: 'page-new-entry',
  templateUrl: 'new-entry.html',
})
export class NewEntryPage {
  entryForm: FormGroup;

  entry = {}

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private builder: FormBuilder,
    public sqlite: SQLite) {
    this.entryForm = builder.group({
      amount: new FormControl('', Validators.compose([Validators.required])),
      category_id: new FormControl('', Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEntryPage');
  }

  submitForm() {
    console.log('Submit Form');
    console.log(JSON.stringify(this.entry));
    // rotina do bd
    this.insertBD();
    this.goBack();
  }

  goBack() {
    console.log('Go Back');
    // sair sem fazer nada
    this.navCtrl.pop();
  }

  insertBD() {
    console.log('Inicio da gravação do BD');

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log('Banco criando com sucesso!');
        db.sqlBatch([
          "create table if not exists entries (id integer primary key autoincrement, amount decimal, description text)"
        ])
          .then(() => {
            const sqlInsert = "insert into entries (amount) values (?)";
            const dataInsert = [this.entry['amount']];

            db.executeSql(sqlInsert, dataInsert)
              .then(() => console.log('insert realizado com sucesso'))
              .catch(e => console.error('erro ao inserir', JSON.stringify(e)));
          })
          .catch(e => console.error('erro ao criar a tabela', JSON.stringify(e)))
      })
  }

}
