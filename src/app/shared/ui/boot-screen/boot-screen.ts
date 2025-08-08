import { NgOptimizedImage } from '@angular/common';
import { Component, OnDestroy, output, signal } from '@angular/core';

interface BootLine {
  text: string;
  delay: number;
  typing?: boolean;
}

@Component({
  selector: 'app-boot-screen',
  imports: [NgOptimizedImage],
  template: `
    <div class="boot-screen" [class.boot-screen--hidden]="isHidden()">
      <div class="boot-content">
        <!-- BIOS Header with Logo -->
        <div class="bios-header">
          <div class="bios-header-left">
            <div class="bios-title">
              Award Modular BIOS v4.51PG, An Energy Star Ally
            </div>
            <div class="copyright">
              Copyright (C) 1984-98, Award Software, Inc.
            </div>
          </div>
          <div class="energy-star">
            <img
              ngSrc="/energy-star-logo.webp"
              alt="Energy Star"
              class="energy-star-logo"
              width="180"
              height="112"
              priority
            />
          </div>
        </div>

        <!-- Memory and CPU Info -->
        <div class="system-info">
          <div class="memory-line">
            <span class="address">061680MS</span>
            <span class="version">v1.3 111700</span>
          </div>

          <div class="cpu-info">
            <span>PENTIUM III-MMX CPU at 500 MHz</span>
            <span class="bus-info">, Host Bus 100MHz</span>
          </div>

          <div class="memory-test">
            Memory Test : <span class="test-result">393216K OK</span>
          </div>
        </div>

        <!-- Boot Progress Lines -->
        <div class="boot-lines">
          @for (line of displayedLines(); track $index) {
            <div class="boot-line" [class.typing]="line.typing">
              {{ line.text }}
              @if (line.typing) {
                <span class="cursor">_</span>
              }
            </div>
          }
        </div>

        <!-- Boot Instructions -->
        <div class="boot-instructions" [class.visible]="showInstructions()">
          <div class="instruction-line">
            Press <span class="key">F1</span> to continue,
            <span class="key">DEL</span> to enter SETUP
          </div>
          <div class="instruction-line">
            <span class="date">12/15/1997-i440ZX-W977-2A69KM4NC-00</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './boot-screen.scss',
})
export class BootScreenComponent implements OnDestroy {
  protected readonly bootComplete = output<void>();

  protected displayedLines = signal<BootLine[]>([]);
  protected showInstructions = signal(false);
  protected isHidden = signal(false);
  
  private isActive = true;

  private bootSequence: BootLine[] = [
    { text: 'Award Plug and Play BIOS Extension v1.0A', delay: 300 },
    { text: 'Copyright (C) 1998, Award Software, Inc.', delay: 200 },
    { text: '', delay: 150 },
    { text: 'Detecting IDE Primary Master   ... 8GB_CD00', delay: 400 },
    { text: 'Detecting IDE Primary Slave    ... None', delay: 250 },
    { text: 'Detecting IDE Secondary Master ... None', delay: 250 },
    { text: 'Detecting IDE Secondary Slave  ... None', delay: 250 },
    { text: '', delay: 200 },
    { text: 'Floppy disk(s) fail (40)', delay: 500 },
    { text: 'CMOS checksum error - Defaults loaded', delay: 400 },
    { text: '', delay: 600 },
  ];

  constructor() {
    this.startBootSequence();
  }
  
  ngOnDestroy() {
    this.isActive = false;
  }

  private async startBootSequence() {
    // Wait a bit before starting
    await this.delay(500);

    for (let i = 0; i < this.bootSequence.length; i++) {
      const line = this.bootSequence[i];

      // Add line with typing effect for important lines
      const shouldType =
        line.text.includes('Detecting') || line.text.includes('CMOS');

      if (shouldType) {
        await this.typeText(line.text, line.delay);
      } else {
        this.displayedLines.update((lines) => [
          ...lines,
          { ...line, typing: false },
        ]);
        await this.delay(line.delay);
      }
    }

    // Show instructions after boot sequence
    this.showInstructions.set(true);

    // Auto-complete after showing instructions
    await this.delay(1500);
    
    if (this.isActive) {
      this.completeBoot();
    }
  }

  private async typeText(text: string, baseDelay: number) {
    const typingLine: BootLine = { text: '', delay: 0, typing: true };
    this.displayedLines.update((lines) => [...lines, typingLine]);

    for (let i = 0; i <= text.length; i++) {
      const currentText = text.substring(0, i);
      this.displayedLines.update((lines) => {
        const updated = [...lines];
        updated[updated.length - 1] = {
          text: currentText,
          delay: 0,
          typing: true,
        };
        return updated;
      });

      await this.delay(15 + Math.random() * 15); // Faster typing speed
    }

    // Remove typing cursor
    this.displayedLines.update((lines) => {
      const updated = [...lines];
      updated[updated.length - 1] = { text, delay: 0, typing: false };
      return updated;
    });

    await this.delay(baseDelay);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private completeBoot() {
    // Emit immediately before animation
    this.bootComplete.emit();
    
    // Then start fade out effect
    this.isHidden.set(true);
  }

  // Allow manual skip by clicking anywhere
  onScreenClick() {
    this.completeBoot();
  }
}
