import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LanguageCode, TranslationService } from '../../core/i18n/translation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
  menuOpen = false;
  readonly i18n = inject(TranslationService);

  readonly navItems = [
    { labelKey: 'navbar.about', href: '#about' },
    { labelKey: 'navbar.experience', href: '#experience' },
    { labelKey: 'navbar.projects', href: '#projects' },
    { labelKey: 'navbar.stack', href: '#stack' },
    { labelKey: 'navbar.contact', href: '#contact' },
  ];

  get selectedLanguage(): LanguageCode {
    return this.i18n.currentLanguage();
  }

  set selectedLanguage(language: LanguageCode) {
    this.i18n.useLanguage(language);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
