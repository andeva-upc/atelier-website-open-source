import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardAnimationService {
  private readonly SELECTOR = '.svc-card';
  private observer: IntersectionObserver | null = null;

  /**
   * Initialise the component:
   * – attach the Intersection Observer so cards
   *   fade/slide in when they enter the viewport.
   */
  init(): void {
    const cards = document.querySelectorAll<HTMLElement>(this.SELECTOR);
    if (!cards.length) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('svc-card--visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card, index) => {
      // Stagger delay: 100 ms per card
      (card as HTMLElement).style.transitionDelay = `${index * 100}ms`;
      this.observer!.observe(card);
    });
  }

  /** Clean up the observer (call on component destroy). */
  destroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}
