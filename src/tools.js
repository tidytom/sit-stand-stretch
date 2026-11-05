// The list of tools shown on the home page.
// To add a tool, add one entry to this list (see "Add a new tool" in README.md).
//
//   id          short unique name, lowercase, no spaces (for example 'stretch-break')
//   name        the title shown on the card
//   description one short sentence about what the tool does
//   path        the tool's web address without ".html" (for example 'timer' opens timer.html)
//   tag         optional: one or two words shown as a small label (for example 'Focus')
//   icon        optional: 'breath', 'timer', or 'strength'. Leave it out to show the
//               first letter of the name instead.
//
// The cards appear in the same order as this list.

const tools = [
  {
    id: 'breathing',
    name: 'Free Easy Breath Tool',
    description: 'A soft bubble grows and shrinks to guide your breathing in, hold, and out.',
    path: 'breathing',
    tag: 'Breathing',
    icon: 'breath',
  },
  {
    id: 'timer',
    name: '50 Minute Timer',
    description: 'A plain focus countdown, 50 minutes unless you change it, for one task at a time.',
    path: 'timer',
    tag: 'Focus',
    icon: 'timer',
  },
  {
    id: 'pushup-coach',
    name: 'Pushup Coach',
    description: 'A weekly plan that takes you from countertop pushups to floor pushups.',
    path: 'pushup-coach',
    tag: 'Strength',
    icon: 'strength',
  },
];

export default tools;
