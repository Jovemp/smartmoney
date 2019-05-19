import { Component, ViewChild } from '@angular/core';

import { Chart } from 'chart.js';

@Component({
  selector: 'balance-panel-chart',
  templateUrl: 'balance-panel-chart.html'
})
export class BalancePanelChartComponent {
  @ViewChild('chartCanvas') chartCanvas;

  chart: any;
  
  constructor() {
  }

  ngOnInit() {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['D7', 'D6', 'D5', 'D4', 'D3', 'D2', 'D1'],
        datasets: [{
          backgroundColor: 'rgba(41, 128, 185, 0.2)',
          borderColor: '#2573a6',
          borderWidth: 1.5,
          pointRadius: 0,
          lineTension: 0,
          data: [10, 2, 3, 7, 5, 6, 7],
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: false,
        legend: false,
        scales: {
          xAxes: [{ display: false }],
          yAxes: [{ display: false }]
        }
      }
    })
  }
}
