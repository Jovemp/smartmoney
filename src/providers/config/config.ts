import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class ConfigProvider {

  constructor(public storage: Storage) {
  }

  getValue(key) {
    return  this.storage.get(key);
  }

  setValue(key, value) {
    this.storage.set(key, value);
  }

}
