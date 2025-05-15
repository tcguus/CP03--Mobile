import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

interface Produto {
  id: string;
  nome: string;
  fabricacao: string;
  validade: string;
  quantidade: string;
  lote: string;
  estado: string;
  codigoBarras: string;
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      carregarProdutos();
    }
  }, [isFocused]);

  const carregarProdutos = async () => {
    const dados = await AsyncStorage.getItem('produtos');
    if (dados) setProdutos(JSON.parse(dados));
  };

  const excluirProduto = async (id: string) => {
    const novaLista = produtos.filter((p) => p.id !== id);
    await AsyncStorage.setItem('produtos', JSON.stringify(novaLista));
    setProdutos(novaLista);
  };

  const confirmarExclusao = (id: string) => {
    Alert.alert('Excluir', 'Deseja excluir este produto?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', onPress: () => excluirProduto(id), style: 'destructive' },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Produtos Cadastrados</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>Lote: {item.lote}</Text>
            <Text>Qtd: {item.quantidade} | UF: {item.estado}</Text>
            <Text>Cód. Barras: {item.codigoBarras}</Text>

            <TouchableOpacity onPress={() => confirmarExclusao(item.id)} style={styles.botao}>
              <Text style={styles.botaoTexto}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum produto cadastrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 15, borderWidth: 1, borderColor: '#CCC', borderRadius: 8, marginBottom: 10 },
  nome: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  botao: { backgroundColor: '#B10000', marginTop: 10, padding: 8, borderRadius: 5, alignItems: 'center' },
  botaoTexto: { color: '#FFF', fontWeight: 'bold' },
});
