import { Component } from '@angular/core';

/**
 * Generated class for the EntrySummaryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'entry-summary',
  templateUrl: 'entry-summary.html'
})
export class EntrySummaryComponent {

  text: string;

  constructor() {
    console.log('Hello EntrySummaryComponent Component');
    this.text = 'Hello World';
  }

}
