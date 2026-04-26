import { Component, signal } from '@angular/core';
import {Header} from './shared/presentation/components/header/header';
import {Hero} from './value-proposition/presentation/components/hero/hero';
import { Card } from "./benefits/presentation/components/card/card";
import { Pricing } from "./pricing/presentation/components/pricing/pricing";
import { Team } from "./team/presentation/components/team/team";
import { Footer } from "./footer/presentation/components/footer/footer";

@Component({
  selector: 'app-root',
    imports: [
        Header,
        Hero,
        Card,
        Pricing,
        Team,
        Footer
    ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('atelier-website-open-source');
}
