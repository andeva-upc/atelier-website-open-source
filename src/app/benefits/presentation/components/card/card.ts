import { Component, AfterViewInit, OnDestroy } from "@angular/core";
import { CardAnimationService } from "./card-animation.service";

@Component({
  selector: "app-card",
  imports: [],
  templateUrl: "./card.html",
  styleUrl: "./card.css",
})
export class Card implements AfterViewInit, OnDestroy {
  constructor(private cardAnimationService: CardAnimationService) {}

  ngAfterViewInit(): void {
    this.cardAnimationService.init();
  }

  ngOnDestroy(): void {
    this.cardAnimationService.destroy();
  }
}
