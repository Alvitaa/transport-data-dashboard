import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportDataService } from '../../core/services/transport-data.service';
import { TransportRecord } from '../../core/models/transport-record.model';

type SortField = 'line' | 'passengers' | 'time';
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
  records = signal<TransportRecord[]>([]);
  isLoading = signal(true);

  selectedDate = signal<string | null>(null);

  sortField = signal<SortField>('line');
  sortDirection = signal<SortDirection>('asc');

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
      }

      return direction === 'asc' ? a.passengers - b.passengers : b.passengers - a.passengers;
    });
  });

  availableDates = computed(() => [...new Set(this.records().map((d) => d.date))]);

  filteredData = computed(() =>
    this.selectedDate() ? this.records().filter((d) => d.date === this.selectedDate()) : [],
  );

  dateTotalPassengers = computed(() =>
    this.filteredData().reduce((sum, line) => sum + line.passengers, 0),
  );

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
}
