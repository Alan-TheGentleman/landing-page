import { Component } from '@angular/core';
import { Layout } from '../../core/layout/layout';
import {
  Card,
  Button,
  Win95GroupComponent,
  Win95HeaderComponent,
  Win95InfoBoxComponent,
  Win95BackButtonComponent,
} from '@shared/ui';

@Component({
  selector: 'app-private-mentoring',
  standalone: true,
  imports: [
    Layout,
    Card,
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
      title: 'Frontend Development',
      description:
        'Master modern frameworks like Angular, React, and Vue.js with hands-on guidance.',
      duration: '4-6 weeks',
      price: '$200/session',
    },
    {
      title: 'Backend Architecture',
      description:
        'Learn to build scalable APIs, microservices, and database design patterns.',
      duration: '6-8 weeks',
      price: '$250/session',
    },
    {
      title: 'Career Mentoring',
      description:
        'Navigate your tech career path, interview preparation, and professional growth.',
      duration: '2-3 weeks',
      price: '$150/session',
    },
  ];
}
