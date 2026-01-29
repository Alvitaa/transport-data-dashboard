import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportDataService } from '../../core/services/transport-data.service';
import { TransportRecord } from '../../core/models/transport-record.model';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

type SortField = 'line' | 'passengers' | 'time' | 'delta' | 'deltaPercent';
type SortDirection = 'asc' | 'desc';

type TransportRowWithDelta = TransportRecord & {
  deltaPassengers: number | null;
  deltaPercent: number | null;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
  records = signal<TransportRecord[]>([]);
  isLoading = signal(true);

  selectedDate = signal<string | null>(null);

  sortField = signal<SortField>('line');
  sortDirection = signal<SortDirection>('asc');

  selectedLine = signal<string>('Line A');

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

  sortedData = computed(() => {
    const field = this.sortField();
    const direction = this.sortDirection();

    return [...this.filteredData()].sort((a, b) => {
      if (field === 'line') {
        return direction === 'asc' ? a.line.localeCompare(b.line) : b.line.localeCompare(a.line);
      } else if (field === 'passengers') {
        return direction === 'asc' ? a.passengers - b.passengers : b.passengers - a.passengers;
        /*       } else if (field === 'delta') {
        return direction === 'asc' ? a.deltaPassengers - b.deltaPassengers : b.deltaPassengers - a.deltaPassengers;
      } else if (field === 'deltaPercent') {
        return direction === 'asc' ? a.deltaPercent - b.deltaPercent : b.deltaPercent - a.deltaPercent; */
      } else {
        return direction === 'asc'
          ? a.avgIntervalMinutes - b.avgIntervalMinutes
          : b.avgIntervalMinutes - a.avgIntervalMinutes;
      }
    });
  });

  availableDates = computed(() => [...new Set(this.records().map((d) => d.date))]);

  filteredData = computed(() =>
    this.selectedDate()
      ? this.tableDataWithDelta().filter((d) => d.date === this.selectedDate())
      : [],
  );

  tableDataWithDelta = computed<TransportRowWithDelta[]>(() => {
    const data = [...this.records()];
    data.sort((a, b) => {
      if (a.line !== b.line) {
        return a.line.localeCompare(b.line);
      }
      return a.date.localeCompare(b.date);
    });

    const result: TransportRowWithDelta[] = [];

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

  toggleSort(field: SortField) {
    if (this.sortField() === field) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
  }

  averageInterval = computed(() => {
    const data = this.filteredData();
    if (!data.length) return 0;

    const total = data.reduce((sum, d) => sum + d.avgIntervalMinutes, 0);

    return +(total / data.length).toFixed(2);
  });

  lineChartData = computed<ChartData<'line'>>(() => {
    const data = this.records();
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
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 5,
          callback: (value: any, index: number) => {
            const labels = this.lineChartData().labels as string[];
            const date = labels[index];
            return date.slice(5); // MM-DD
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
