import { Router, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Game Store';
}
