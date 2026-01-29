import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportDataService } from '../../core/services/transport-data.service';
import { TransportRecord } from '../../core/models/transport-record.model';

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

  availableDates = computed(() =>
    [...new Set(this.records().map(d => d.date))]
  );

  filteredData = computed(() =>
    this.selectedDate()
      ? this.records().filter(d => d.date === this.selectedDate())
      : []
  );

  dateTotalPassengers = computed(() =>
    this.filteredData().reduce((sum,line) => sum + line.passengers, 0)
  )

  totalPassengers = computed(() =>
    this.records().reduce((sum, line) => sum + line.passengers, 0)
  );
}
