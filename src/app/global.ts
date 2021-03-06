'use strict';

export const avatars = [
  { name: 'girl', value: '👧' },
  { name: 'boy', value: '👦' },
  { name: 'alien', value: '👽' },
  { name: 'ghost', value: '👻' },
];

export const games = [
  {
    name: 'Snake Snack',
    photo: '../../assets/images/snake.png',
    isNew: false,
    dbName: 'snake',

    emoji: '🐍',
  },
  {
    name: 'Tic-Tac-Toe',
    photo: '../../assets/images/tic-tac-toe.png',
    isNew: false,
    dbName: 'tictac',

    emoji: '⭕',
  },
  {
    name: 'Poké Memo',
    photo: '../../assets/images/memory.png',
    isNew: false,
    dbName: 'card',

    emoji: '🃏',
  },
  {
    name: 'SudoCool ',
    photo: '../../assets/images/sudoku.png',
    isNew: false,

    dbName: 'sudoku',
    emoji: '✏️',
  },
  {
    name: 'Real Piano',
    photo: '../../assets/images/piano.png',
    isNew: true,

    dbName: 'piano',
    emoji: '🎹',
  },
  {
    name: 'Fake Bird',
    photo: '../../assets/images/bird.png',
    isNew: true,

    dbName: 'bird',
    emoji: '🐤',
  },
  {
    name: 'See more',
    photo: '../../assets/images/more.png',
    isNew: true,
    dbName: 'more',
    emoji: '➕',
  },
];
