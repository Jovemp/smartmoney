import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'doughnut-chart',
  templateUrl: 'doughnut-chart.html'
})
export class DoughnutChartComponent {
  @ViewChild('chartCanvas') chartCanvas;
  @ViewChild('chartLegend') chartLegend;

  chart: any;

  constructor() {}

  ngOnInit() {
    const colors = {
      backgroundColor: [
        'rgba(26, 188, 156, 0.8)',
        'rgba(155, 89, 182, 0.8)',
        'rgba(230, 126, 34, 0.8)',
        'rgba(243, 114, 114, 0.8)',
        'rgba(149, 165, 166, 0.8)',
        'rgba(52, 152, 219, 0.8)',
        'rgba(48, 204, 113, 0.8)'
      ],
      hoverBackgroundColor: [
        '#1abc9c',
        '#9b59b6',
        '#e67e22',
        '#f37272',
        '#95a5a6',
        '#3498db',
        '#2ecc71'
      ]
    };

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Alimentacao', 'Combustivel', 'Garagem', 'Lazer', 'Outros'],
        datasets: [{
          data:[12.34, 140, 30, 55, 20],
          backgroundColor: colors.backgroundColor,
          hoverBackgroundColor: colors.hoverBackgroundColor,
          borderColor: '#34495e',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cotoutPercentage: 80,
        legend: false,
        legendCallback: function(chart) {
          let legendHtml = [];
          let item = chart.data.datasets[0];

          legendHtml.push('<ul>');

          for (let i = 0; i < item.data.length; i++) {
            //let value = currencyPipe.transform(item.data[i]);
             let value = '$' + item.data[i];

            legendHtml.push('<li>');
            legendHtml.push(`<span class="chart-legend-bullet" style="color:${item.backgroundColor[i]}"></span>`);
            legendHtml.push(`<span class="chart-legend-label-text">${chart.data.labels[i]}</span>`);
            legendHtml.push(`<span class="chart-legend-label-value">${value}</span>`);
            legendHtml.push('</li>');
          }

          legendHtml.push('</ul>');

          return legendHtml.join("");
        }
      }
    });

    this.chartLegend.nativeElement.innerHTML = this.chart.generateLegend();

  }

}
