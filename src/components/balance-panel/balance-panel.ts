import { Component, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'balance-panel',
  templateUrl: 'balance-panel.html'
})
export class BalancePanelComponent {

  text: string;
  @Input() currentBalance: number;
  @Input() entries = [];
  @Output() addEntry = new EventEmitter();

  constructor() {
    console.log('Hello BalancePanelComponent Component');
    this.text = 'Hello World';
  }

  addEntryEvento(){
    this.addEntry.emit();
  }

}
