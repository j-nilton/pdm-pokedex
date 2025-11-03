import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { PokemonList } from './components/PokemonList';
import { PokemonDetail } from './components/PokemonDetail';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.icon-icons.com/2603/PNG/512/poke_ball_icon_155925.png' }}
        style={styles.logoImage}
      />
      <Text style={styles.logoText}>Pokédex</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Lista')}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.credits}>by j. nilton</Text>

      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#FF8575' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 24, fontFamily: 'monospace' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Lista"
          component={PokemonList}
          options={{ title: 'Pokédex' }}
        />
        <Stack.Screen
          name="Detalhes"
          component={PokemonDetail}
          options={{ title: 'Detalhes do Pokémon' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8575',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'monospace',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 70,
  },
  buttonText: {
    color: '#FF8575',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  credits: {
    color: '#FFF',
    justifyContent: 'flex-end'
  },
});
