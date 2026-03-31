import { Component } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar';
import { FooterComponent } from '../../layout/footer/footer';
import { HeroComponent } from '../../sections/hero/hero';
import { AboutComponent } from '../../sections/about/about';
import { ExperienceComponent } from '../../sections/experience/experience';
import { ProjectsComponent } from '../../sections/projects/projects';
import { StackComponent } from '../../sections/stack/stack';
import { ContactComponent } from '../../sections/contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    StackComponent,
    ContactComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {}