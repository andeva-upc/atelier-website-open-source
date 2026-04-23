import { Component, signal } from '@angular/core';
import {Header} from './shared/presentation/components/header/header';
import {Hero} from './value-proposition/presentation/components/hero/hero';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    Hero
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('atelier-website-open-source');
}
