import { Card, Suit } from '../models/Card';

export function createDeck(): Card[] {
  const suits: Suit[] = ['oros','copas','espadas','bastos'];
  const deck: Card[] = [];
  for (const s of suits) {
    for (let v = 1; v <= 12; v++) {
      if (v === 8 || v === 9) continue;
      deck.push({ suit: s, value: v });
    }
  }
  return deck;
}

export function shuffle(deck: Card[]): Card[] {
  return deck
    .map(c => ({ c, r: Math.random() }))
    .sort((a,b) => a.r - b.r)
    .map(x => x.c);
}
