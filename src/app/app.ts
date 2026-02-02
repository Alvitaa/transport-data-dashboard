import { Component, signal } from '@angular/core';
import { Dashboard } from './features/dashboard/dashboard';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('transport-data-dashboard');
}
