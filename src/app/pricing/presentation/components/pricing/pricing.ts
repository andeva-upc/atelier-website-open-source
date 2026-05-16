import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pricing',
  imports: [TranslateModule],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css',
})
export class Pricing {
  protected readonly isAnnual = signal(false);

  togglePricing() {
    this.isAnnual.update(val => !val);
  }
}
