import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Events } from 'ionic-angular';
import { BalanceLabelComponent } from '../balance-label/balance-label';


@Component({
  selector: 'balance-panel',
  templateUrl: 'balance-panel.html'
})
export class BalancePanelComponent {

  text: string;
  @Input() currentBalance: number;
  @Input() entries = [];
  @Output() addEntry = new EventEmitter();

  @ViewChild('balanceContainer') balanceContainer;
  @ViewChild('balanceLabel') balanceLabel;
  @ViewChild('balanceValue') balanceValue;
  @ViewChild('balanceChart') balanceChart;

  constructor(public events: Events) {
    console.log('Hello BalancePanelComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
    this.events.subscribe('app:scroll', (top) => this.onScroll(top));
  }

  onScroll(top) {
    const scale = top / this.balanceContainer.nativeElement.offsetHeight;
    if (scale >= 0 && scale <= 1) {
      this.balanceContainer.nativeElement.style.webkitTransform = `translate3d(0, -${65 * scale}px, 0)`;
      this.balanceContainer.nativeElement.style.opacity = .95 / scale;
      this.balanceLabel.nativeElement.style.webkitTransform = `translate3d(0, ${55 * scale}px, 0)`;
      this.balanceValue.nativeElement.style.webkitTransform = `translate3d(0, ${25 * scale}px, 0)`;
      this.balanceChart.nativeElement.style.opacity = .5 / scale;
    } else {
      this.balanceContainer.nativeElement.style.webkitTransform = `translate3d(0, -65px, 0)`;
      this.balanceContainer.nativeElement.style.opacity = .95;
      this.balanceLabel.nativeElement.style.webkitTransform = `translate3d(0, 55px, 0)`;
      this.balanceValue.nativeElement.style.webkitTransform = `translate3d(0, 25px, 0)`;
      this.balanceChart.nativeElement.style.opacity = .5;
    }
  }

  addEntryEvento() {
    this.addEntry.emit();
  }

}
