import { Component, inject, signal } from '@angular/core';
import {Header} from './shared/presentation/components/header/header';
import {Hero} from './value-proposition/presentation/components/hero/hero';
import { Card } from "./benefits/presentation/components/card/card";
import { Pricing } from "./pricing/presentation/components/pricing/pricing";
import { Team } from "./team/presentation/components/team/team";
import { Footer } from "./shared/presentation/components/footer/footer";

import { About } from './value-proposition/presentation/components/about/about';
import { TeamVideo } from './team/presentation/components/team-video/team-video';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
    imports: [
        Header,
        Hero,
        About,
        Card,
        Pricing,
        Team,
        TeamVideo,
        Footer
    ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('atelier-website-open-source');
  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|es/) ? browserLang : 'en');
  }
}
