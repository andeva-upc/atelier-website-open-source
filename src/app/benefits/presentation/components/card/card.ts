import { Component, AfterViewInit, OnDestroy, inject, signal } from "@angular/core";
import { CardAnimationService } from "./card-animation.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [TranslateModule],
  templateUrl: "./card.html",
  styleUrl: "./card.css",
})
export class Card implements AfterViewInit, OnDestroy {
  private cardAnimationService = inject(CardAnimationService);
  private translate = inject(TranslateService);
  private langChangeSub?: Subscription;
  
  displayText = signal('');
  isTyping = signal(false);
  private typingTimeout?: any;

  constructor() {
    // Re-run typewriter when language changes
    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      this.startTypewriter();
    });
  }

  ngAfterViewInit(): void {
    this.cardAnimationService.init();
    this.startTypewriter();
  }

  private startTypewriter() {
    // Clear any existing typing timeout
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }

    this.translate.get('services.description').subscribe(text => {
      this.displayText.set('');
      this.isTyping.set(true);
      
      let i = 0;
      const typingSpeed = 35;

      const type = () => {
        if (i < text.length) {
          this.displayText.update(val => val + text.charAt(i));
          i++;
          this.typingTimeout = setTimeout(type, typingSpeed);
        } else {
          this.isTyping.set(false);
        }
      };

      type();
    });
  }

  ngOnDestroy(): void {
    this.cardAnimationService.destroy();
    this.langChangeSub?.unsubscribe();
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }
}
