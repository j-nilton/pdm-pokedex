import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';

interface PokemonDetailProps {
  route: any;
}

export const PokemonDetail = ({ route }: PokemonDetailProps) => {
  const { url } = route.params;
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    async function fetchDetail() {
      const response = await axios.get(url);
      setPokemon(response.data);
    }
    fetchDetail();
  }, [url]);

  if (!pokemon) return <Text style={styles.loading}>Carregando...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
          style={styles.image}
        />
        <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.infoTitle}>Altura:</Text>
        <Text style={styles.infoText}>{pokemon.height}</Text>
        <Text style={styles.infoTitle}>Peso:</Text>
        <Text style={styles.infoText}>{pokemon.weight}</Text>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.subtitle}>Tipos</Text>
        <View style={styles.listContainer}>
          {pokemon.types.map((t: any, index: number) => (
            <Text key={index} style={styles.type}>
              {t.type.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.subtitle}>Habilidades</Text>
        <View style={styles.listContainer}>
          {pokemon.abilities.map((a: any, index: number) => (
            <Text key={index} style={styles.type}>
              {a.ability.name.replace('-', ' ')}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.subtitle}>Estatísticas</Text>
        <View style={styles.listContainer}>
          {pokemon.stats.map((s: any, index: number) => (
            <Text key={index} style={styles.type}>
              {s.stat.name.replace('-', ' ')}: {s.base_stat}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FF8575',
    alignItems: 'center',
    minHeight: '100%',
  },
  loading: {
    flex: 1,
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 300,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 220,
    height: 220,
  },
  name: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 10,
    fontFamily: 'monospace',
  },
  infoBlock: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
  },
  infoTitle: {
    fontSize: 20,
    color: '#FF8575',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  infoText: {
    fontSize: 18,
    color: '#FF8575',
    marginBottom: 6,
    fontFamily: 'monospace',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF8575',
    marginBottom: 6,
    fontFamily: 'monospace',
  },
  listContainer: {
    flexDirection: 'column',
  },
  type: {
    fontSize: 18,
    color: '#FF8575',
    textTransform: 'capitalize',
    marginRight: 12,
    marginBottom: 4,
    fontFamily: 'monospace',
  },
});
