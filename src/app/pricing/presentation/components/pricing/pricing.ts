import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-pricing',
  imports: [],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css',
})
export class Pricing {
  protected readonly isAnnual = signal(false);

  togglePricing() {
    this.isAnnual.update(val => !val);
  }
}
