import { trigger, state, style, transition,
  animate, group, query, stagger, keyframes } from '@angular/animations';

export const slideAnimationInView =
trigger('slideAnimationInView', [
  transition(':enter', [
    style({transform: 'translateY(-100%)'}),
    animate('300ms ease-in', style({transform: 'translateY(0%)'}))
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({transform: 'translateY(-100%)'}))
  ])
]);

// trigger('slideAnimationView', [
//   transition(':enter', [
//     style({transform: 'translateY(-100%)'}),
//     animate('300ms ease-in', style({transform: 'translateY(0%)'}))
//   ]),
//   transition(':leave', [
//     animate('300ms ease-in', style({transform: 'translateY(-100%)'}))
//   ])
// ]);
