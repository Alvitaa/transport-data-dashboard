import { Component, computed, Input } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TransportRecord } from '../../../../core/models/transport-record.model';

@Component({
  selector: 'app-pass-lchart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './passangers-line-chart.html',
})
export class PassangersLineChart {
  @Input({ required: true }) data!: TransportRecord[];

  isMobile = window.innerWidth < 640;

  lineChartData = computed<ChartData<'line'>>(() => {
    const data = this.data;
    if (!data.length) return { labels: [], datasets: [] };

    const dates = Array.from(new Set(data.map((d) => d.date))).sort();
    const lines = Array.from(new Set(data.map((d) => d.line)));

    const datasets = lines.map((line, index) => {
      return {
        label: line,
        data: dates.map((date) => {
          const record = data.find((d) => d.line === line && d.date.startsWith(date));
          return record ? record.passengers : 0;
        }),
        tension: 0.3,
      };
    });

    return {
      labels: dates,
      datasets,
    };
  });

  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: !this.isMobile,
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 5,
          callback: (value: any, index: number) => {
            const labels = this.lineChartData().labels as string[];
            const date = labels[index];
            return date.slice(5);
          },
        },
      },
      y: {
        ticks: {
          callback: (value: any) => Number(value).toLocaleString(),
        },
      },
    },
  };
}
