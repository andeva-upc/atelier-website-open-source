import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-team-video',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="videos-section">
        <div class="videos-container">
            <div class="video-item">
                <h3 class="video-title">{{ 'team.videos.product.title' | translate }}</h3>
                <div class="video-placeholder product-bg">
                    <div class="play-button">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                    <span>{{ 'team.videos.product.demo' | translate }}</span>
                </div>
            </div>

            <div class="video-item">
                <h3 class="video-title">{{ 'team.videos.team.title' | translate }}</h3>
                <div class="video-placeholder team-bg">
                    <div class="play-button">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                    <span>{{ 'team.videos.team.behind' | translate }}</span>
                </div>
            </div>
        </div>
    </section>
  `,
  styles: [`
    .videos-section {
        padding: 80px 20px;
        background: #fff;
        display: flex;
        justify-content: center;
    }
    .videos-container {
        max-width: 1100px;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
    }
    .video-item {
        text-align: center;
    }
    .video-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #2d3748;
        margin-bottom: 24px;
        font-family: 'Mona Sans', 'Inter', Arial, sans-serif;
    }
    .video-placeholder {
        width: 100%;
        aspect-ratio: 16 / 9;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }
    .product-bg {
        background: linear-gradient(45deg, #1a202c, #2d3748);
    }
    .team-bg {
        background: linear-gradient(45deg, #3b82f6, #1d4ed8);
    }
    .video-placeholder:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    .play-button {
        width: 70px;
        height: 70px;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(5px);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;
        border: 2px solid rgba(255, 255, 255, 0.5);
        transition: background 0.3s ease;
    }
    .video-placeholder:hover .play-button {
        background: #3b82f6;
    }
    .play-button svg {
        width: 35px;
        height: 35px;
        margin-left: 5px;
    }
    @media (max-width: 768px) {
        .videos-container {
            grid-template-columns: 1fr;
        }
    }
  `]
})
export class TeamVideo {}
