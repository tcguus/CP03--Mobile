import { View, Text, StyleSheet } from 'react-native';

export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Bem-vindo ao sistema de estoque!</Text>
      <Text style={styles.sub}>Use as abas para cadastrar ou visualizar produtos.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  texto: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  sub: { fontSize: 16, textAlign: 'center', color: '#555' }
});
