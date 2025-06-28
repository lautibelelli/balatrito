import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { startGame, playCard, GameState } from './src/utils/game';
import { Card as CardModel } from './src/models/Card';

export default function App() {
  const [g, setG] = useState<GameState | null>(null);

  return (
    <View style={s.container}>
      <Text style={s.title}>Juego de Cartas Oscuro</Text>
      <TouchableOpacity onPress={() => setG(startGame())} style={s.btn}>
        <Text style={s.btnText}>Iniciar Juego</Text>
      </TouchableOpacity>

      {g && (
        <>
          <Text style={s.text}>{g.message}</Text>
          <View style={s.table}>
            {g.table.map((c, i) => (
              <CardView key={i} card={c} />
            ))}
          </View>

          <Text style={s.text}>Tu mano:</Text>
          <FlatList
            data={g.playerHand}
            horizontal
            keyExtractor={(_,i) => i.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => setG(playCard(g, index))}>
                <CardView card={item} />
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
}

function CardView({ card }: { card: CardModel }) {
  return (
    <View style={s.card}>
      <Text style={s.cardText}>{card.value} de {card.suit}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex:1, backgroundColor:'#1a1a1a', alignItems:'center', paddingTop:50 },
  title: { fontSize:24, color:'#eee', marginBottom:20 },
  btn: { backgroundColor:'#333', padding:10, borderRadius:5, marginBottom:20 },
  btnText: { color:'#eee', fontSize:16 },
  text: { color:'#ccc', fontSize:18, margin:10 },
  table: { flexDirection:'row', marginVertical:10 },
  card: { width:60, height:90, borderWidth:1, borderColor:'#555', backgroundColor:'#2a2a2a',
          margin:4, justifyContent:'center', alignItems:'center', borderRadius:4 },
  cardText: { color:'#fff' },
});
