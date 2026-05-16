import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, CommonModule, UpperCasePipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private translate = inject(TranslateService);
  currentLang = this.translate.currentLang || 'en';

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
  }
}
