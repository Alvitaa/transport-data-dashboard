import { Component, computed, input, signal } from '@angular/core';
import { TransportRecord } from '../../../../core/models/transport-record.model';
import { CommonModule } from '@angular/common';

type SortField = 'line' | 'passengers' | 'time' | 'delta' | 'deltaPercent';
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-transport-table',
  imports: [CommonModule],
  templateUrl: './transport-table.html',
})
export class TransportTable {
  data = input.required<TransportRecord[]>();

  sortField = signal<SortField>('line');
  sortDirection = signal<SortDirection>('asc');

  sortedData = computed(() => {
    const field = this.sortField();
    const direction = this.sortDirection();
    const data = this.data();

    return [...data].sort((a, b) => {
      if (field === 'line') {
        return direction === 'asc' ? a.line.localeCompare(b.line) : b.line.localeCompare(a.line);
      }
      
      if (field === 'passengers') {
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

  toggleSort(field: SortField) {
    if (this.sortField() === field) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
  }
}
