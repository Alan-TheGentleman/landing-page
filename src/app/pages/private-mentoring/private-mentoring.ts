import { Component } from '@angular/core';
import {
  Button,
  Win95BackButtonComponent,
  Win95GroupComponent,
  Win95HeaderComponent,
  Win95InfoBoxComponent,
} from '@shared/ui';
import { Layout } from '../../core/layout/layout';

@Component({
  selector: 'app-private-mentoring',
  standalone: true,
  imports: [
    Layout,
    Button,
    Win95GroupComponent,
    Win95HeaderComponent,
    Win95InfoBoxComponent,
    Win95BackButtonComponent,
  ],
  templateUrl: './private-mentoring.html',
  styleUrl: './private-mentoring.scss',
})
export class PrivateMentoring {
  protected mentoringSessions = [
    {
      title: 'Frontend Mastery',
      description:
        'Master Angular, React, and Vue.js with a Google Developer Expert. Learn patterns used by Fortune 500 companies and build production-ready applications. 40% faster learning guaranteed with proven methods.',
      approach: 'Expert-led, proven methods',
      format: 'Tailored 1-on-1 sessions',
    },
    {
      title: 'Backend & Architecture',
      description:
        'Design scalable systems that handle millions of users. Learn microservices, APIs, and database patterns from real enterprise projects worth $10M+. Get architecture insights from 15+ years of experience.',
      approach: 'Enterprise-proven patterns',
      format: 'Project-based mentoring',
    },
    {
      title: 'Career Acceleration',
      description:
        'Fast-track your tech career with strategies that helped 1000+ developers land senior roles. Interview prep, salary negotiation, and leadership skills from someone who built 200K+ community.',
      approach: 'Success-proven strategies',
      format: 'Goal-oriented coaching',
    },
    {
      title: 'Full-Stack Excellence',
      description:
        'Build complete applications using industry best practices. Work on real projects with guidance from a Microsoft MVP and Google GDE. Learn deployment, monitoring, and scaling strategies.',
      approach: 'Industry best practices',
      format: 'Hands-on project work',
    },
  ];

  openContact(): void {
    window.location.href = 'mailto:gentleman@ohmybitz.com';
  }
}
