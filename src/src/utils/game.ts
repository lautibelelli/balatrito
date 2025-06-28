import { Card } from '../models/Card';
import { createDeck, shuffle } from './deck';

export interface GameState {
  deck: Card[];
  playerHand: Card[];
  cpuHand: Card[];
  table: Card[];
  message: string;
}

export function startGame(): GameState {
  const all = shuffle(createDeck());
  const playerHand = all.slice(0,3);
  const cpuHand = all.slice(3,6);
  const deck = all.slice(6);
  return { deck, playerHand, cpuHand, table: [], message: 'Tu turno' };
}

export function playCard(state: GameState, cardIndex: number): GameState {
  const card = state.playerHand[cardIndex];
  const newPlayerHand = state.playerHand.filter((_,i) => i !== cardIndex);
  const cpuCard = state.cpuHand[0];
  const newCpuHand = state.cpuHand.slice(1);
  const winner = card.value > cpuCard.value ? 'player' : 'cpu';
  const msg = winner === 'player' ? 'Ganaste la baza' : 'CPU gana';
  return {
    ...state,
    playerHand: newPlayerHand,
    cpuHand: newCpuHand,
    table: [card, cpuCard],
    message: msg,
  };
}
