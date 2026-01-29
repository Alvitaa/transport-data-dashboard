import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransportRecord } from '../models/transport-record.model';

@Injectable({
  providedIn: 'root'
})
export class TransportDataService {

  private readonly dataUrl = 'data/transport-data.json';

  constructor(private http: HttpClient) {}

  getRecords(): Observable<TransportRecord[]> {
    return this.http.get<TransportRecord[]>(this.dataUrl);
  }
}
