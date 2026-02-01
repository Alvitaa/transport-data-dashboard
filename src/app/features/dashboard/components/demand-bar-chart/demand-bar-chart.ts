import { Component, computed, input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { TransportRecord } from '../../../../core/models/transport-record.model';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-demand-bchart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './demand-bar-chart.html',
})
export class DemandBarChart {
  data = input.required<TransportRecord[]>();

  barChartData = computed<ChartData<'bar'>>(() => {
    const data = this.data();

    const filtered = data.sort((a, b) => a.date.localeCompare(b.date));

    return {
      labels: filtered.map((d) => d.line),
      datasets: [
        {
          label: 'Actual',
          data: filtered.map((d) => d.passengers),
        },
        {
          label: 'Expected',
          data: filtered.map((d) => d.expectedPassengers),
        },
      ],
    };
  });

  barChartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: false,
      },
      y: {
        ticks: {
          callback: (value: any) => Number(value).toLocaleString(),
        },
      },
    },
  };
}
