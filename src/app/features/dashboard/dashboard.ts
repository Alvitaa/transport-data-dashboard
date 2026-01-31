import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportDataService } from '../../core/services/transport-data.service';
import { TransportRecord } from '../../core/models/transport-record.model';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TransportTable } from './components/transport-table/transport-table';
import { PassangersLineChart } from './components/passangers-line-chart/passangers-line-chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, TransportTable,PassangersLineChart],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
  records = signal<TransportRecord[]>([]);
  isLoading = signal(true);

  selectedDate = signal<string | null>(null);

  constructor(private transportService: TransportDataService) {
    this.loadData();
  }

  loadData() {
    this.transportService.getRecords().subscribe({
      next: (res) => {
        this.records.set(res);
        this.isLoading.set(false);
        this.selectedDate.set(res[0]?.date ?? null);
      },
      error: (err) => {
        console.error('Error: ', err);
        this.isLoading.set(false);
      },
    });
  }


  availableDates = computed(() => [...new Set(this.records().map((d) => d.date))]);

  filteredData = computed(() =>
    this.selectedDate()
      ? this.tableData().filter((d) => d.date === this.selectedDate())
      : [],
  );

  tableData = computed<TransportRecord[]>(() => {
    const data = [...this.records()];
    data.sort((a, b) => {
      if (a.line !== b.line) {
        return a.line.localeCompare(b.line);
      }
      return a.date.localeCompare(b.date);
    });

    const result: TransportRecord[] = [];

    for (let i = 0; i < data.length; i++) {
      const current = data[i];
      const previous = data[i - 1];

      let deltaPassengers: number | null = null;
      let deltaPercent: number | null = null;

      if (previous && previous.line === current.line) {
        deltaPassengers = current.passengers - previous.passengers;
        deltaPercent =
          previous.passengers > 0 ? (deltaPassengers / previous.passengers) * 100 : null;
      }

      result.push({
        ...current,
        deltaPassengers,
        deltaPercent,
      });
    }

    console.log(result);

    return result;
  });

  dateTotalPassengers = computed(() =>
    this.filteredData().reduce((sum, line) => sum + line.passengers, 0),
  );

  dayType = computed(() => this.filteredData().at(0)?.dayType);

  lines = computed(() => Array.from(new Set(this.records().map((d) => d.line))));

  totalPassengers = computed(() => this.records().reduce((sum, line) => sum + line.passengers, 0));

  averageInterval = computed(() => {
    const data = this.filteredData();
    if (!data.length) return 0;

    const total = data.reduce((sum, d) => sum + d.avgIntervalMinutes, 0);

    return +(total / data.length).toFixed(2);
  });

  barChartData = computed<ChartData<'bar'>>(() => {
    const data = this.filteredData();

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
