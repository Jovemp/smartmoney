import { Component, Input } from '@angular/core';

@Component({
  selector: 'balance-label',
  templateUrl: 'balance-label.html'
})
export class BalanceLabelComponent {

  @Input() currentBalance: number = 2000.45;

  constructor() {
  }

}
