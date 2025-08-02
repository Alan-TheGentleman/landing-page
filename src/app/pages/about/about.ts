import { Component } from '@angular/core';
import { Layout } from '../../core/layout/layout';
import {
  Card,
  Button,
  Win95GroupComponent,
  Win95InfoBoxComponent,
} from '@shared/ui';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [Layout, Card, Button, Win95GroupComponent, Win95InfoBoxComponent],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected skills = [
    { name: 'Angular', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Language' },
    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'React', level: 80, category: 'Frontend' },
    { name: 'Docker', level: 75, category: 'DevOps' },
    { name: 'AWS', level: 70, category: 'Cloud' },
  ];

  protected experience = [
    {
      role: 'Senior Software Engineer',
      company: 'Tech Corp',
      period: '2020 - Present',
      description:
        'Led development of enterprise applications using Angular and microservices architecture.',
    },
    {
      role: 'Full-Stack Developer',
      company: 'Startup Inc',
      period: '2018 - 2020',
      description:
        'Built scalable web applications from scratch using modern JavaScript frameworks.',
    },
    {
      role: 'Frontend Developer',
      company: 'Digital Agency',
      period: '2016 - 2018',
      description:
        'Created responsive and interactive user interfaces for various client projects.',
    },
  ];

  protected achievements = [
    '500+ developers trained through workshops and mentoring',
    'Speaker at 15+ tech conferences and meetups',
    'Open source contributor with 50k+ GitHub stars',
    'Published 100+ technical articles and tutorials',
    'Certified in Angular, AWS, and Docker technologies',
  ];
}
