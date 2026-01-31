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
      }

      if (field === 'delta') {
        return this.compareNullableNumbers(a.deltaPassengers, b.deltaPassengers, direction);
      }

      if (field === 'deltaPercent') {
        return this.compareNullableNumbers(a.deltaPercent, b.deltaPercent, direction);
      }
      return direction === 'asc'
        ? a.avgIntervalMinutes - b.avgIntervalMinutes
        : b.avgIntervalMinutes - a.avgIntervalMinutes;
    });
  });

  compareNullableNumbers(
    a: number | null | undefined,
    b: number | null | undefined,
    direction: 'asc' | 'desc',
  ) {
    // ambos nulos → iguales
    if (a == null && b == null) return 0;

    // solo a es nulo → va al final
    if (a == null) return 1;

    // solo b es nulo → va al final
    if (b == null) return -1;

    // ambos números válidos
    return direction === 'asc' ? a - b : b - a;
  }

  toggleSort(field: SortField) {
    if (this.sortField() === field) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
  }
}
