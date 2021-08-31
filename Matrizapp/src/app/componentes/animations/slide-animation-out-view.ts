import { trigger, state, style, transition,
  animate, group, query, stagger, keyframes } from '@angular/animations';

export const slideAnimationOutView =
trigger('slideAnimationOutView', [
  transition(':enter', [
    style({transform: 'translateX(-100%)'}),
    animate('300ms ease-in', style({transform: 'translateX(0%)'}))
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({transform: 'translateX(-100%)'}))
  ])
]);
