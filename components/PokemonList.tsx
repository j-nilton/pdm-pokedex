import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetail {
  name: string;
  image: string;
  url: string;
}

interface PokemonAPIResponse {
  sprites: {
    front_default: string | null;
  };
  name: string;
}

export const PokemonList = () => {
  const navigation = useNavigation<any>();
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPokemons() {
    const response = await axios.get<{ results: Pokemon[] }>(
      'https://pokeapi.co/api/v2/pokemon/?limit=20'
    );
    const results = response.data.results;

    const detailed = await Promise.all(
    results.map(async (p) => {
    const res = await axios.get<PokemonAPIResponse>(p.url); 
    return {
      name: res.data.name,
      image: res.data.sprites.front_default || '', 
      url: p.url,
    };
    })
    ); 
    setPokemons(detailed);
    setLoading(false);
  }

  useEffect(() => {
    fetchPokemons();
  }, []);

  if (loading) return <Text style={styles.loading}>Carregando...</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detalhes', { url: item.url })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name.toUpperCase()}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 10, 
    backgroundColor: '#FF8575', 
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  image: { 
    width: 100, 
    height: 100, 
    marginRight: 12, 
  },
  name: { 
    fontSize: 22, 
    fontWeight: '600', 
    color: '#FF8575', 
    fontFamily: 'monospace',
  },
  loading: {
      flex: 1,
      color: '#000',
      fontSize: 18,
      textAlign: 'center',
      marginTop: 300,
  },
});
